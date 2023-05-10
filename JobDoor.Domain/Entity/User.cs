using JobDoor.Domain.Enum;

namespace JobDoor.Domain.Entity;

public class User
{
    public Guid Id { get; set; } = new Guid();
    public string Username { get; set; } = string.Empty;
    public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
    public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
    public UserType Type { get; set; } = UserType.JobSeeker;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime TokenCreated { get; set; }
    public DateTime TokenExpires { get; set; }
}