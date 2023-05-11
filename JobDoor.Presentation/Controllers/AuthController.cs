using JobDoor.Application.Common.Interface.Authentication;
using JobDoor.Contracts.Authentication;
using JobDoor.Contracts.Common.ServiceResponse;
using JobDoor.Domain.Entity;
using JobDoor.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;

namespace JobDoor.Presentation.Controllers;

[Route("auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _authRepository;

    public AuthController(IAuthRepository authRepository)
    {
        _authRepository = authRepository;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterRequest request)
    {
        var response = await _authRepository.Register(
            new User { Username = request.Username },
            request.Password
        );

        if (!response.Success)
            return BadRequest(response);

        return Ok(response);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<ServiceResponse<string>>> Login(UserLoginRequest request)
    {
        var response = await _authRepository.Login(request.Username, request.Password, Response);

        if (!response.Success)
            return BadRequest(response);

        return Ok(response);
    }
}