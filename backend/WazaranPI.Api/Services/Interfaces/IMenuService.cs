using WazaranPI.Api.Models;

namespace WazaranPI.Api.Services.Interfaces
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuDto>> GetMyMenusAsync(string empCd, string roleName);
    }
}