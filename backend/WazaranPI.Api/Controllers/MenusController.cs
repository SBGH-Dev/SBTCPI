
// // Menus API
// using Microsoft.AspNetCore.Mvc;
// using System.Data;
// using Dapper;
// using Microsoft.Data.SqlClient;

// using Microsoft.AspNetCore.Authorization;
// namespace WazaranPI.Api.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class MenusController : ControllerBase
//     {
//         private readonly IConfiguration _config;

//         public MenusController(IConfiguration config)
//         {
//             _config = config;
//         }

//         // [Authorize]
//         [HttpGet("my-menus")]

// public async Task<IActionResult> GetMyMenus([FromQuery] string empCd, [FromQuery] string roleName)
// {
//     using IDbConnection db = new SqlConnection(
//         _config.GetConnectionString("DefaultConnection"));

//     roleName = roleName?.Trim();
//     empCd = empCd?.Trim();


//  if (string.Equals(roleName, "Admin", StringComparison.OrdinalIgnoreCase))
// {
//     var adminMenus = await db.QueryAsync(@"
//         SELECT MenuId, MenuName, MenuUrl, Icon
//         FROM Menus
//         WHERE IsActive = 1
//         ORDER BY 
//             CASE WHEN MenuName = 'Admin Panel' THEN 1 ELSE 0 END,
//             MenuId");

//     return Ok(adminMenus);
// }

//     var menus = await db.QueryAsync(@"
//         SELECT m.MenuId, m.MenuName, m.MenuUrl, m.Icon
//         FROM UserMenuAccess a
//         INNER JOIN Menus m ON a.MenuId = m.MenuId
//         WHERE LTRIM(RTRIM(a.EmpCd)) = @EmpCd
//           AND a.CanView = 1
//           AND m.IsActive = 1
//         ORDER BY m.MenuId",
//         new { EmpCd = empCd });

//     return Ok(menus);
// }
//     }
// }

using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Services.Interfaces;

namespace WazaranPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenusController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenusController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        
        [HttpGet("my-menus")]
        public async Task<IActionResult> GetMyMenus(
            [FromQuery] string empCd,
            [FromQuery] string roleName)
        {
            var menus = await _menuService.GetMyMenusAsync(empCd, roleName);
            return Ok(menus);
        }
    }
}

