using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;
using WazaranPI.Api.Services.Interfaces;

namespace WazaranPI.Api.Services
{
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _menuRepository;

        public MenuService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public async Task<IEnumerable<MenuDto>> GetMyMenusAsync(string empCd, string roleName)
        {
           
            empCd = empCd?.Trim();
            roleName = roleName?.Trim();

            return await _menuRepository.GetMyMenusAsync(empCd, roleName);
        }
    }
}