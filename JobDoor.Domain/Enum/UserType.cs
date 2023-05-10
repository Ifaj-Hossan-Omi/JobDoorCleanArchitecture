using System.Text.Json.Serialization;

namespace JobDoor.Domain.Enum;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UserType
{
    Admin,
    Company,
    JobProvider,
    Interviewer,
    JobSeeker
}