namespace JobDoor.Contracts.Authentication;

public record UserRegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}