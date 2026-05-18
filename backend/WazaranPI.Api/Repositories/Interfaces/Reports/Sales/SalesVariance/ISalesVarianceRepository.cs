using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance
{
    public interface ISalesVarianceRepository
    {
        Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync();
    }
}
