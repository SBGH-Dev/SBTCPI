using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Services.Interfaces;


namespace WazaranPI.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        
        [HttpGet("dummy-sales")]
        public async Task<IActionResult> GetDummySales(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var data = await _reportService.GetDummySalesAsync(startDate, endDate);

            return Ok(data);
        }

        [HttpGet("dummy-sales/pdf")]
        public async Task<IActionResult> DummySalesPdf(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var fileBytes = await _reportService.GenerateDummySalesPdfAsync(
                startDate,
                endDate
            );

            return File(
                fileBytes,
                "application/pdf",
                "DummySales.pdf"
            );
        }

        [HttpGet("dummy-sales/excel")]
        public async Task<IActionResult> DummySalesExcel(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var fileBytes = await _reportService.GenerateDummySalesExcelAsync(
                startDate,
                endDate
            );

            return File(
                fileBytes,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "DummySales.xlsx"
            );
        }

        
    }
}