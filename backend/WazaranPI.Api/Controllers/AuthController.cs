

// login API

using Microsoft.AspNetCore.Mvc;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

using Microsoft.AspNetCore.Authorization;

namespace WazaranPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        // [Authorize]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            using IDbConnection db = new SqlConnection(
                _config.GetConnectionString("DefaultConnection"));

            var user = await db.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Username = @Username",
                new { request.Username });

            // was for plain pass
            // if (user == null || user.PasswordHash != request.Password)
            //     return Unauthorized("Invalid username or password");

           if (user == null || string.IsNullOrWhiteSpace(user.PasswordHash) ||
                !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok(new
            {
                user.EmpCd,
                user.Username,
                user.FullName,
                user.RoleName
            });

      
        }


    // api/Auth/test-hash
    //    [HttpGet("test-hash")]
    //     public IActionResult TestHash()
    //     {
    //         var hash = BCrypt.Net.BCrypt.HashPassword("123456");
    //         return Ok(hash);
    //     }

     
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class User
    {
        public int UserId { get; set; }
        public string EmpCd { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string RoleName { get; set; }
    }

}

