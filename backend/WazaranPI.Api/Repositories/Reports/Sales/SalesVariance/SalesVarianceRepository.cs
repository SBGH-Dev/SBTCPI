// using System.Data;
// using Dapper;
// using WazaranPI.Api.Data;
// using WazaranPI.Api.Models.Reports.Sales.SalesVariance;
// using WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance;

// namespace WazaranPI.Api.Repositories.Reports.Sales.SalesVariance
// {
//     public class SalesVarianceRepository : ISalesVarianceRepository
//     {
//         private readonly IDbConnectionFactory _connectionFactory;

//         public SalesVarianceRepository(IDbConnectionFactory connectionFactory)
//         {
//             _connectionFactory = connectionFactory;
//         }

//         public async Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync()
//         {
//             using var db = _connectionFactory.CreateConnection();

//             return await db.QueryAsync<SalesVarianceDto>(
//                 "dbo.sp_bi_t_sales_variance_get",
//                 commandType: CommandType.StoredProcedure
//             );
//         }
//     }
// }

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

        public async Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync(
            string branches,
            string salesmen,
            string customers,
            string channels
        )
        {
            using var db = _connectionFactory.CreateConnection();

            return await db.QueryAsync<SalesVarianceDto>(
                "dbo.sp_bi_t_sales_variance_byfilter_get",
                new
                {
                    branches = branches ?? "",
                    salesmen = salesmen ?? "",
                    customers = customers ?? "",
                    channels = channels ?? ""
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<SalesVarianceFiltersDto> GetSalesVarianceFiltersAsync(
            string salespointcd
        )
        {
            using var db = _connectionFactory.CreateConnection();

            using var multi = await db.QueryMultipleAsync(
                "dbo.sp_bi_t_sales_variance_filters_get",
                new
                {
                    salespointcd = salespointcd ?? ""
                },
                commandType: CommandType.StoredProcedure
            );

            return new SalesVarianceFiltersDto
            {
                Branches = (await multi.ReadAsync<FilterOptionDto>()).ToList(),
                Salesmen = (await multi.ReadAsync<FilterOptionDto>()).ToList(),
                Customers = (await multi.ReadAsync<FilterOptionDto>()).ToList(),
                Channels = (await multi.ReadAsync<FilterOptionDto>()).ToList()
            };
        }
    }
}