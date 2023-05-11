// using JobDoor.Application.Abstraction.Service;
// using JobDoor.Contracts.Common.ServiceResponse;
// using Microsoft.AspNetCore.Http;
// using System.Security.Claims;
// using JobDoor.Application.Common.Interface.Repository;
// using JobDoor.Application.DTO.JobProvider;
// using Mapster;
//
// namespace JobDoor.Application.Service;
//
// public class JobProviderService : IJobProviderService
// {
//     private readonly IJobProviderRepository _jobProviderRepository;
//     private readonly IHttpContextAccessor _httpContextAccessor;
//
//
//     public JobProviderService(IJobProviderRepository jobProviderRepository, IHttpContextAccessor httpContextAccessor)
//     {
//         _jobProviderRepository = jobProviderRepository;
//         _httpContextAccessor = httpContextAccessor;
//     }
//
//     private Guid GetUserId() =>
//         Guid.Parse(_httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier)!);
//
//
//     public async Task<ServiceResponse<List<GetJobProviderResponseDto>>> GetAllCharacters()
//     {
//         var serviceResponse = new ServiceResponse<List<GetJobProviderResponseDto>>();
//         var jobProviders = await _jobProviderRepository.GetAllJobProvider();
//         // var charactersforuser = characters.Where(c => c.User.Id == GetUserId()).ToList();
//         // serviceResponse.Data = characters.Select(c => _mapper.Map<GetCharacterResponseDto>(c)).ToList();
//         serviceResponse.Data = jobProviders.Where(c => c.User.Id == GetUserId()).ToList()
//             .Adapt<List<GetJobProviderResponseDto>>();
//         return serviceResponse;
//     }
//
//     public async Task<ServiceResponse<GetCharacterResponseDto>> GetById(int id)
//     {
//         // var characters = await _characterRepository.GetAllCharacters();
//         // serviceResponse.Data = characters.Find(c => c.Id == id).Adapt<GetCharacterResponseDto>();
//         var serviceResponse = new ServiceResponse<GetCharacterResponseDto>();
//         var character = await _characterRepository.GetById(id);
//         serviceResponse.Data = character.Adapt<GetCharacterResponseDto>();
//         return serviceResponse;
//     }
//
//     public async Task<ServiceResponse<List<GetCharacterResponseDto>>> AddCharacter(AddCharacterRequestDto newCharacter)
//     {
//         var serviceResponse = new ServiceResponse<List<GetCharacterResponseDto>>();
//         var characters = await _characterRepository.AddCharacter(newCharacter.Adapt<Character>());
//         // var characterDtos = characters.Select(c => c.Adapt<GetCharacterResponseDto>()).ToList();
//         serviceResponse.Data = characters.Adapt<List<GetCharacterResponseDto>>();
//         return serviceResponse;
//
//     }
//
//     public async Task<ServiceResponse<GetCharacterResponseDto>> UpdateCharacter(
//         UpdateCharacterRequestDto updatedCharacter)
//     {
//         var serviceResponse = new ServiceResponse<GetCharacterResponseDto>();
//         var character = await _characterRepository.UpdateCharacter(updatedCharacter.Adapt<Character>());
//         serviceResponse.Data = character.Adapt<GetCharacterResponseDto>();
//         return serviceResponse;
//     }
//
//     public async Task<ServiceResponse<List<GetCharacterResponseDto>>> DeleteCharacter(int id)
//     {
//         var serviceResponse = new ServiceResponse<List<GetCharacterResponseDto>>();
//         var characters = await _characterRepository.DeleteCharacter(id, 1);
//         serviceResponse.Data = characters.Adapt<List<GetCharacterResponseDto>>();
//         return serviceResponse;
//     }
//
//     public Task<ServiceResponse<GetCharacterResponseDto>> AddCharacterSkill(
//         AddCharacterSkillRequestDto newCharacterSkill)
//     {
//         throw new NotImplementedException();
//     }
//
//     // public Task<ServiceResponse<GetCharacterResponseDto>> GetById(int id)
//     // {
//     //     var serviceResponse = new ServiceResponse<GetCharacterResponseDto>();
//     //     var character = _characterRepository.GetById(id);
//     //     serviceResponse.Data = _mapper.Map<GetCharacterResponseDto>(character);
//     //     return Task.FromResult(serviceResponse);
//     // }
//
//
// }