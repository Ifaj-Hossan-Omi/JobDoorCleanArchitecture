namespace JobDoor.Contracts.Common.ServiceResponse;

public record ServiceResponse<T>
{
    public T? Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
}