namespace JobDoor.Domain.Entity;

public class JobProvider
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public static JobProvider NewJobProvider()
    {
        return new JobProvider
        {
            Id = Guid.NewGuid()
        };
    }

}