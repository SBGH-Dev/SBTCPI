using System.Data;
using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;

namespace WazaranPI.Api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public AuthRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            using var db = _connectionFactory.CreateConnection();

            var user = await db.QueryFirstOrDefaultAsync<User>(
                "dbo.sp_bi_tmst_bi_users_get",  //sp_Users_Get
                new { Username = username },
                commandType: CommandType.StoredProcedure
            );

            return user;
        }
    }
    
}