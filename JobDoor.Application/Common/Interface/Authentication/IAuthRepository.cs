using JobDoor.Contracts.Common.ServiceResponse;
using JobDoor.Domain.Entity;
using Microsoft.AspNetCore.Http;

namespace JobDoor.Application.Common.Interface.Authentication;

public interface IAuthRepository
{
    Task<ServiceResponse<Guid>> Register(User user, string password);
    Task<ServiceResponse<string>> Login(string username, string password, HttpResponse response);
    Task<bool> UserExists(string username);
}