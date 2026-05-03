

using WazaranPI.Api.Models;

namespace WazaranPI.Api.Services.Interfaces
{
    // This interface defines what report actions the service must provide
    public interface IReportService
    {
    
        Task<IEnumerable<DummySalesDto>> GetDummySalesAsync(
            DateTime startDate,
            DateTime endDate
        );

        // Generate PDF file bytes
        Task<byte[]> GenerateDummySalesPdfAsync(
            DateTime startDate,
            DateTime endDate
        );

        // Generate Excel file bytes
        Task<byte[]> GenerateDummySalesExcelAsync(
            DateTime startDate,
            DateTime endDate
        );

        
    }
}

