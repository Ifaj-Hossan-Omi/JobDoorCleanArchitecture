﻿using JobDoor.Application.Common.Interface.Authentication;
using JobDoor.Contracts.Common.ServiceResponse;
using JobDoor.Domain.Entity;
using JobDoor.Domain.Token;
using JobDoor.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace JobDoor.Infrastructure.Repository.Authentication;

public class AuthRepository : IAuthRepository
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthRepository(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    public async Task<ServiceResponse<Guid>> Register(User user, string password)
    {
        var serviceResponse = new ServiceResponse<Guid>();
        if (await UserExists(user.Username))
        {
            serviceResponse.Success = false;
            serviceResponse.Message = "User already exists.";
            return serviceResponse;
        }

        CreatePassword(password, out var passwordHash, out var passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        serviceResponse.Data = user.Id;
        return serviceResponse;
    }

    public async Task<ServiceResponse<string>> Login(string username, string password, HttpResponse httpResponse)
    {
        var response = new ServiceResponse<string>();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower().Equals(username.ToLower()));

        if (user is null)
        {
            response.Success = false;
            response.Message = "User not found.";
        }
        else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        {
            response.Success = false;
            response.Message = "Wrong password.";
        }
        else
        {
            response.Data = CreateToken(user);
        }

        var refreshToken = GenerateRefreshToken(user);
        SetRefreshToken(refreshToken.Result, httpResponse);

        return response;
    }

    private async Task<RefreshToken> GenerateRefreshToken(User user)
    {

        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = DateTime.UtcNow.AddDays(7)
        };

        user.RefreshToken = refreshToken.Token;
        user.TokenCreated = refreshToken.Created;
        user.TokenExpires = refreshToken.Expires;
        await _context.SaveChangesAsync();



        // IResponseCookies response;
        // var cookieOptions = new CookieOptions
        // {
        //     HttpOnly = true,
        //     Expires = refreshToken.Expires
        // };
        // response.Append("df", "dff", cookieOptions);
        // response.Append("refreshToken", refreshToken.Token, cookieOptions);

        return refreshToken;




    }

    private void SetRefreshToken(RefreshToken refreshToken, HttpResponse response)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        };
        response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);

    }

    public async Task<bool> UserExists(string username)
    {
        if (await _context.Users.AnyAsync(u => u.Username.ToLower().Equals(username.ToLower())))
            return true;

        return false;
    }
    private void CreatePassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }

    private string CreateToken(User user)
    {

        var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Type.ToString())
            };

        var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
        if (appSettingsToken is null)
            throw new Exception("AppSettings is null");

        SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
            .GetBytes(appSettingsToken));

        SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescription = new SecurityTokenDescriptor
        {
            Issuer = "JobDoor",
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddHours(1),
            SigningCredentials = credentials
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken token = tokenHandler.CreateToken(tokenDescription);

        return tokenHandler.WriteToken(token);
    }
}