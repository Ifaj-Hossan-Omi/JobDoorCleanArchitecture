using JobDoor.Application.Service;
using JobDoor.Domain.Entity;

namespace JobDoor.Application.Common.Interface.Repository;

public interface IJobProviderRepository
{
    Task<List<JobProvider>?> GetAllJobProvider();
    Task<JobProvider?> GetById(Guid id);
    Task<List<JobProvider>> AddJobProvider(JobProvider newCharacter);
    // Task<JobProvider> UpdateJobProvider(JobProvider updatedCharacter);
    // Task<List<JobProvider>> DeleteJobProvider(Guid id, Guid userId);
}