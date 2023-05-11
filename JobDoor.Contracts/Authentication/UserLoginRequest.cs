namespace JobDoor.Contracts.Authentication;

public record UserLoginRequest(
    string username,
    string name
);
