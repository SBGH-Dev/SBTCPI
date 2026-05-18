using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance
{
    public interface ISalesVarianceService
    {
        Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync();

        // Task<byte[]> GenerateSalesVariancePdfAsync();

        Task<MemoryStream> GenerateSalesVariancePdfAsync();

        // Task<byte[]> GenerateSalesVarianceExcelAsync();
       
        Task<MemoryStream> GenerateSalesVarianceExcelAsync();
    }
}