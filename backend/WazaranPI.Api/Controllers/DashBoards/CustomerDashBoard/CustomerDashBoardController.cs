using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Services.Interfaces.DashBoards.CustomerDashBoard;

namespace WazaranPI.Api.Controllers.DashBoards.CustomerDashBoard
{
    [ApiController]
    [Route("api/dashboards/customer-dashboard")]
    public class CustomerDashBoardController : ControllerBase
    {
        private readonly ICustomerDashBoardService _service;

        public CustomerDashBoardController(ICustomerDashBoardService service)
        {
            _service = service;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetInitialFilters()
        {
            var filters = await _service.GetInitialFiltersAsync();

            return Ok(filters);
        }

        [HttpGet("channels")]
        public async Task<IActionResult> GetChannels()
        {
            var channels = await _service.GetChannelsAsync();

            return Ok(channels);
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers(
            [FromQuery] string salespointcd = "",
            [FromQuery] string otldcd = ""
        )
        {
            var customers = await _service.GetCustomersAsync(
                salespointcd,
                otldcd
            );

            return Ok(customers);
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetCustomerDetails(
            [FromQuery] string cust_cd = "",
            [FromQuery] string prod_cd = "",
            [FromQuery] string salespointcd = ""
        )
        {
            var data = await _service.GetCustomerDetailsAsync(
                cust_cd,
                prod_cd,
                salespointcd
            );

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpGet("top-paying")]
        public async Task<IActionResult> GetTopPayingCustomers(
            [FromQuery] string salespointcd = ""
        )
        {
            var data = await _service.GetTopPayingCustomersAsync(salespointcd);

            return Ok(data);
        }
    }
}