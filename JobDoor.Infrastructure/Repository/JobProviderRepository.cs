using JobDoor.Application.Common.Interface.Repository;
using JobDoor.Application.Service;
using JobDoor.Domain.Entity;
using JobDoor.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JobDoor.Infrastructure.Repository;

public class JobProviderRepository : IJobProviderRepository
{
    private readonly DataContext _context;

    public JobProviderRepository(DataContext context)
    {
        _context = context;
    }
    public async Task<List<JobProvider>?> GetAllJobProvider()
    {
        return await _context.JobProviders
            .Include(c => c.User)
            .ToListAsync();
    }
    public async Task<JobProvider?> GetById(Guid id)
    {
        return await _context.JobProviders.FindAsync(id);
        // return await _context.Characters.FirstOrDefaultAsync(c => c.Id == id);
    }
    
    public async Task<List<JobProvider>> AddJobProvider(JobProvider newJobProvider)
    {
        await _context.JobProviders.AddAsync(newJobProvider);
        await _context.SaveChangesAsync();
        return await _context.JobProviders.ToListAsync();
    }
    
    public async Task<JobProvider> UpdateJobProvider(JobProvider updatedJobProvider)
    {
        var character =
            await _context.JobProviders
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == updatedJobProvider.Id);
    
        character = updatedJobProvider;
        await _context.SaveChangesAsync();
        return character;
    
    }
    
    public async Task<List<JobProvider>> DeleteJobProvider(Guid id, Guid userId)
    {
        var jobProvider = await _context.JobProviders.FirstOrDefaultAsync(c => c.Id == id && c.User!.Id == userId);
        _context.JobProviders.Remove(jobProvider);
        await _context.SaveChangesAsync();
        return await _context.JobProviders.ToListAsync();
    }
    
}