using JobDoor.Application.Common.Interface.Authentication;
using JobDoor.Infrastructure.Repository.Authentication;
using Microsoft.Extensions.DependencyInjection;
namespace JobDoor.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IAuthRepository, AuthRepository>();

        return services;
    }
}