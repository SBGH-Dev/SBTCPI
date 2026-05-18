using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Controllers.Reports.Sales
{
    [ApiController]
    [Route("api/reports/sales/sales-variance")]
    public class SalesVarianceController : ControllerBase
    {
        private readonly ISalesVarianceService _service;

        public SalesVarianceController(ISalesVarianceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetSalesVariance()
        {
            var data = await _service.GetSalesVarianceAsync();
            return Ok(data);
        }

        [HttpGet("pdf")]
        public async Task<IActionResult> PrintPdf()
        {
            var fileBytes = await _service.GenerateSalesVariancePdfAsync();

            return File(
                fileBytes,
                "application/pdf",
                "SalesVariance.pdf"
            );

            // var stream = await _service.GenerateSalesVariancePdfAsync();

            // return File(
            //     stream,
            //     "application/pdf",
            //     "SalesVariance.pdf"
            // );
        }

        [HttpGet("excel")]
        public async Task<IActionResult> ExportExcel()
        {
            // var fileBytes = await _service.GenerateSalesVarianceExcelAsync();

            // return File(
            //     fileBytes,
            //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            //     "SalesVariance.xlsx"
            // );

               var stream = await _service.GenerateSalesVarianceExcelAsync();

                return File(
                    stream,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "SalesVariance.xlsx"
                );
        }
    }
}

