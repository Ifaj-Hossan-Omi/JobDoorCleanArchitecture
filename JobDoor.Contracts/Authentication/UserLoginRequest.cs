namespace JobDoor.Contracts.Authentication;

public record UserLoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}