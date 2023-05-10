using Microsoft.Extensions.DependencyInjection;
namespace JobDoor.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // services.AddScoped<IUserService, UserService>();
        // services.AddScoped<ICharacterService, CharacterService>();
        // services.AddScoped<IFightService, FightService>();

        return services;
    }
}