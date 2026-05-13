using WazaranPI.Api.Models;

namespace WazaranPI.Api.Repositories.Interfaces
{
    public interface IReportRepository
    {
        // Existing methods stay here

        // Dummy Sales report data from SQL stored procedure
        Task<IEnumerable<DummySalesDto>> GetDummySalesAsync(DateTime startDate, DateTime endDate);
        
    }
}
 
