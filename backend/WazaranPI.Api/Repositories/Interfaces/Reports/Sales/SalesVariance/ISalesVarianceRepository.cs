// using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

// namespace WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance
// {
//     public interface ISalesVarianceRepository
//     {
//         Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync();
//     }
// }

using WazaranPI.Api.Models.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance
{
    public interface ISalesVarianceRepository
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
    }
}