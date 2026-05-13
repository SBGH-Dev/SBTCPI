using System.Data;
using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models.Reports.Sales.SalesVariance;
using WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Repositories.Reports.Sales.SalesVariance
{
    public class SalesVarianceRepository : ISalesVarianceRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public SalesVarianceRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync()
        {
            using var db = _connectionFactory.CreateConnection();

            return await db.QueryAsync<SalesVarianceDto>(
                "dbo.sp_bi_t_sales_variance_get",
                commandType: CommandType.StoredProcedure
            );
        }
    }
}