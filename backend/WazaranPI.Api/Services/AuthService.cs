using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;
using WazaranPI.Api.Services.Interfaces;

namespace WazaranPI.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {

        
            // Basic validation
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return null;
            }

            // Get user from database
            var user = await _authRepository.GetUserByUsernameAsync(request.Username.Trim());

            // Check if user exists and password is valid
            if (user == null ||
                string.IsNullOrWhiteSpace(user.PasswordHash) ||
                !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return null;
            }
            
            // was for plain pass
            // if (user == null || user.PasswordHash != request.Password)
            //     return Unauthorized("Invalid username or password");


            // Return safe data only. Do NOT return password hash.
            return new LoginResponse
            {
                EmpCd = user.EmpCd,
                Username = user.Username,
                FullName = user.FullName,
                RoleName = user.RoleName
            };
        }

        
    }
}