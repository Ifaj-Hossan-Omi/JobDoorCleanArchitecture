using JobDoor.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace JobDoor.Infrastructure.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }
    public DbSet<User> Users => Set<User>();
    public DbSet<JobProvider> JobProviders => Set<JobProvider>();
    public DbSet<JobSeeker> JobSeekers => Set<JobSeeker>();
}

public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    // private IDesignTimeDbContextFactory<DataContext> _designTimeDbContextFactoryImplementation;
    public DataContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            // .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        var optionBuilder = new DbContextOptionsBuilder<DataContext>();
        optionBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        return new DataContext(optionBuilder.Options);
        // return _designTimeDbContextFactoryImplementation.CreateDbContext(args);
    }
}