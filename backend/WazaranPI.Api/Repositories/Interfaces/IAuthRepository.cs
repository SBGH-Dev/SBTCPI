using WazaranPI.Api.Models;

namespace WazaranPI.Api.Repositories.Interfaces
{
    // Repository talks directly to database
    public interface IAuthRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
    }
}