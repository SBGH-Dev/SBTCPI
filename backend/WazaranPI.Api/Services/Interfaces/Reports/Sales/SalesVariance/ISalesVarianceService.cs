// using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

// namespace WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance
// {
//     public interface ISalesVarianceService
//     {
//         Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync();

//         Task<byte[]> GenerateSalesVariancePdfAsync();

//         // Task<MemoryStream> GenerateSalesVariancePdfAsync();

//         // Task<byte[]> GenerateSalesVarianceExcelAsync();
       
//         Task<MemoryStream> GenerateSalesVarianceExcelAsync();
//     }
// }

using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance
{
    public interface ISalesVarianceService
    {
        Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync(
            string branches,
            string salesmen,
            string customers,
            string channels
        );

        Task<SalesVarianceFiltersDto> GetSalesVarianceFiltersAsync(
            string salespointcd
        );

        Task<byte[]> GenerateSalesVariancePdfAsync(
            string branches,
            string salesmen,
            string customers,
            string channels
        );

        Task<MemoryStream> GenerateSalesVarianceExcelAsync(
            string branches,
            string salesmen,
            string customers,
            string channels
        );
    }
}