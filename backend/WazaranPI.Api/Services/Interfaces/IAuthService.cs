using WazaranPI.Api.Models;

namespace WazaranPI.Api.Services.Interfaces
{
    // Service contains business logic
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
    }
}