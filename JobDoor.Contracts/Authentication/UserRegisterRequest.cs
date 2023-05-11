using JobDoor.Domain.Enum;

namespace JobDoor.Contracts.Authentication;

public record UserRegisterRequest(
    string Username, 
    string Password, 
    UserType Type
);
