using System.Data;
using Microsoft.Data.SqlClient;

namespace WazaranPI.Api.Data
{
    // This class creates SQL Server connection using appsettings.json
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly IConfiguration _config;

        public DbConnectionFactory(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        }
    }
}