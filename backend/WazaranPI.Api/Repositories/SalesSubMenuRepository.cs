using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models;
using System.Data;

namespace WazaranPI.Api.Repositories
{
    public class SalesSubMenuRepository : ISalesSubMenuRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public SalesSubMenuRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<List<SalesSubMenuDto>> GetSalesSubMenusAsync(string empCd)
        {
            using var connection = _connectionFactory.CreateConnection();

            var result = await connection.QueryAsync<SalesSubMenuDto>(
                "sp_bi_t_bi_sales_submenu_get", //sp_UserSalesSubMenuAccess
                new { EmpCd = empCd },
                commandType: CommandType.StoredProcedure
            );

            return result.ToList();
        }
    }
}