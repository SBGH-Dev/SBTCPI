using WazaranPI.Api.Models;

namespace WazaranPI.Api.Repositories
{
    public interface ISalesSubMenuRepository
    {
        
        Task<List<SalesSubMenuDto>> GetSalesSubMenusAsync(string empCd);
    }
}