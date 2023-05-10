using JobDoor.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobDoor.Application.Common.Interface
{
    public interface IJobProviderRepository
    {
        JobProvider NewProvider();
    }
}
