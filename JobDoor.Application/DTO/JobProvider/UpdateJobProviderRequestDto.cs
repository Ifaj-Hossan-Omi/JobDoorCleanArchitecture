namespace JobDoor.Application.DTO.JobProvider;

public record UpdateJobProviderRequestDto(
    string Name,
    string Email,
    string CompanyName,
    string PhoneNumber,
    string Address,
    string Description
);