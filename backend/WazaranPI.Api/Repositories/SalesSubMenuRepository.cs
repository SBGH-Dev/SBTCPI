using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models;

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

            string sql = @"
                SELECT
                    s.SalesSubMenuId AS Id,
                    s.Title,
                    s.Description AS [Desc],
                    s.Url AS Href,
                    s.Icon
                FROM SalesSubMenu s
                WHERE
                    s.IsActive = 1
                    AND (
                        EXISTS (
                            SELECT 1
                            FROM Users u
                            WHERE u.EmpCd = @EmpCd
                              AND u.RoleName = 'Admin'
                              AND u.IsActive = 1
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM UserSalesSubMenuAccess a
                            WHERE a.EmpCd = @EmpCd
                              AND a.SalesSubMenuId = s.SalesSubMenuId
                              AND a.CanView = 1
                        )
                    )
                ORDER BY s.SortOrder;
            ";

            var result = await connection.QueryAsync<SalesSubMenuDto>(
                sql,
                new { EmpCd = empCd }
            );

            return result.ToList();
        }
    }
}