// using Microsoft.AspNetCore.Mvc;
// using WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance;

// namespace WazaranPI.Api.Controllers.Reports.Sales
// {
//     [ApiController]
//     [Route("api/reports/sales/sales-variance")]
//     public class SalesVarianceController : ControllerBase
//     {
//         private readonly ISalesVarianceService _service;

//         public SalesVarianceController(ISalesVarianceService service)
//         {
//             _service = service;
//         }

//         [HttpGet]
//         public async Task<IActionResult> GetSalesVariance()
//         {
//             var data = await _service.GetSalesVarianceAsync();
//             return Ok(data);
//         }

//         [HttpGet("pdf")]
//         public async Task<IActionResult> PrintPdf()
//         {
//             var fileBytes = await _service.GenerateSalesVariancePdfAsync();

//             return File(
//                 fileBytes,
//                 "application/pdf",
//                 "SalesVariance.pdf"
//             );

          
//         }

//         [HttpGet("excel")]
//         public async Task<IActionResult> ExportExcel()
//         {
     

//                var stream = await _service.GenerateSalesVarianceExcelAsync();

//                 return File(
//                     stream,
//                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                     "SalesVariance.xlsx"
//                 );
//         }
//     }
// }



using Microsoft.AspNetCore.Mvc;
using WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Controllers.Reports.Sales.SalesVariance
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
        public async Task<IActionResult> GetSalesVariance(
            [FromQuery] string branches = "",
            [FromQuery] string salesmen = "",
            [FromQuery] string customers = "",
            [FromQuery] string channels = ""
        )
        {
            var data = await _service.GetSalesVarianceAsync(
                branches,
                salesmen,
                customers,
                channels
            );

            return Ok(data);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters(
            [FromQuery] string salespointcd = ""
        )
        {
            var filters = await _service.GetSalesVarianceFiltersAsync(salespointcd);

            return Ok(filters);
        }

        [HttpGet("pdf")]
        public async Task<IActionResult> ExportPdf(
            [FromQuery] string branches = "",
            [FromQuery] string salesmen = "",
            [FromQuery] string customers = "",
            [FromQuery] string channels = ""
        )
        {
            var pdf = await _service.GenerateSalesVariancePdfAsync(
                branches,
                salesmen,
                customers,
                channels
            );

            return File(pdf, "application/pdf", "SalesVariance.pdf");
        }

        [HttpGet("excel")]
        public async Task<IActionResult> ExportExcel(
            [FromQuery] string branches = "",
            [FromQuery] string salesmen = "",
            [FromQuery] string customers = "",
            [FromQuery] string channels = ""
        )
        {
            var stream = await _service.GenerateSalesVarianceExcelAsync(
                branches,
                salesmen,
                customers,
                channels
            );

            return File(
                stream,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "SalesVariance.xlsx"
            );
        }
    }
}
