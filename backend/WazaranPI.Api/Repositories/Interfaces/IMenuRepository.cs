using WazaranPI.Api.Models;

namespace WazaranPI.Api.Repositories.Interfaces
{
    public interface IMenuRepository
    {
        Task<IEnumerable<MenuDto>> GetMyMenusAsync(string empCd, string roleName);
    }
}