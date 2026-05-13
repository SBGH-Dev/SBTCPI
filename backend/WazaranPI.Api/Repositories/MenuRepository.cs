using System.Data;
using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;

namespace WazaranPI.Api.Repositories
{
    public class MenuRepository : IMenuRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public MenuRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<MenuDto>> GetMyMenusAsync(string empCd, string roleName)
        {
            using var db = _connectionFactory.CreateConnection();

            
            var menus = await db.QueryAsync<MenuDto>(
                "sp_bi_tmst_bi_menus_get",  //sp_Menus_Get 
                new
                {
                    EmpCd = empCd,
                    RoleName = roleName
                },
                commandType: CommandType.StoredProcedure
            );

            return menus;
        }
    }
}