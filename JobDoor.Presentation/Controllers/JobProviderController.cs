using JobDoor.Application;
using JobDoor.Application.Common.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobDoor.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobProviderController : ControllerBase
    {
        private readonly IJobProviderRepository _jobProvider;

        public JobProviderController(IJobProviderRepository jobProvider)
        {
            _jobProvider = jobProvider;
        }


        [HttpGet("Provider")]
        public ActionResult Get()
        {
            return Ok(_jobProvider.NewProvider());
        }
    }
}
