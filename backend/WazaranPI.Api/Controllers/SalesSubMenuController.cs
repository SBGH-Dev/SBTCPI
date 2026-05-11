using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Repositories;

namespace WazaranPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesSubMenuController : ControllerBase
    {
        private readonly ISalesSubMenuRepository _salesSubMenuRepository;

        public SalesSubMenuController(ISalesSubMenuRepository salesSubMenuRepository)
        {
            _salesSubMenuRepository = salesSubMenuRepository;
        }

      
        [HttpGet("{empCd}")]
        public async Task<IActionResult> GetSalesSubMenus(string empCd)
        {
            var result = await _salesSubMenuRepository.GetSalesSubMenusAsync(empCd);
            return Ok(result);
        }
    }
}