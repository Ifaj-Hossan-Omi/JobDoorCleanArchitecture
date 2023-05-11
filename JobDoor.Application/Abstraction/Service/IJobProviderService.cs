using JobDoor.Application.DTO.JobProvider;
using JobDoor.Contracts.Common.ServiceResponse;

namespace JobDoor.Application.Abstraction.Service;

public interface IJobProviderService
{
    Task<ServiceResponse<List<GetJobProviderResponseDto>>> GetAllCharacters();
    Task<ServiceResponse<GetJobProviderResponseDto>> GetById(Guid id);
    Task<ServiceResponse<List<GetJobProviderResponseDto>>> AddCharacter(AddJobProviderRequestDto newJobProvider);
    Task<ServiceResponse<GetJobProviderResponseDto>> UpdateCharacter(UpdateJobProviderRequestDto updateJobProvider);
    Task<ServiceResponse<List<GetJobProviderResponseDto>>> DeleteCharacter(int id);
}