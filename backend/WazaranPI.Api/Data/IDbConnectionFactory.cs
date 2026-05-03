using System.Data;

namespace WazaranPI.Api.Data
{
    // This interface is responsible for creating DB connections
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}