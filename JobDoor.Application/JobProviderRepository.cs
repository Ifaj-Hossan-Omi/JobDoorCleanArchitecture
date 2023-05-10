using JobDoor.Application.Common.Interface;
using JobDoor.Domain.Entity;

namespace JobDoor.Application;
public class JobProviderRepository : IJobProviderRepository
{
    public JobProvider NewProvider()
    {
        var provider = JobProvider.NewJobProvider();
        return provider;
    }
}
