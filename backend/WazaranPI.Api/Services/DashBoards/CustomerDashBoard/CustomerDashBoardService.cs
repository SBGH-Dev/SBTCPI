using WazaranPI.Api.Models.DashBoards.CustomerDashBoard;
using WazaranPI.Api.Repositories.Interfaces.DashBoards.CustomerDashBoard;
using WazaranPI.Api.Services.Interfaces.DashBoards.CustomerDashBoard;

namespace WazaranPI.Api.Services.DashBoards.CustomerDashBoard
{
    public class CustomerDashBoardService : ICustomerDashBoardService
    {
        private readonly ICustomerDashBoardRepository _repository;

        public CustomerDashBoardService(ICustomerDashBoardRepository repository)
        {
            _repository = repository;
        }

        public async Task<CustomerDashBoardFiltersDto> GetInitialFiltersAsync()
        {
            return await _repository.GetInitialFiltersAsync();
        }

        public async Task<IEnumerable<FilterOptionDto>> GetChannelsAsync()
        {
            return await _repository.GetChannelsAsync();
        }

        public async Task<IEnumerable<FilterOptionDto>> GetCustomersAsync(
            string salespointcd,
            string otldcd
        )
        {
            return await _repository.GetCustomersAsync(salespointcd, otldcd);
        }

        public async Task<CustomerDashBoardDto?> GetCustomerDetailsAsync(
            string custCd,
            string prodCd,
            string salespointcd
        )
        {
            return await _repository.GetCustomerDetailsAsync(
                custCd,
                prodCd,
                salespointcd
            );
        }

        public async Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersAsync(
            string salespointcd
        )
        {
            return await _repository.GetTopPayingCustomersAsync(salespointcd);
        }

        public async Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersByProductAsync(
            string salespointcd,
            string prodCd
        )
        {
            return await _repository.GetTopPayingCustomersByProductAsync(
                salespointcd,
                prodCd
            );
        }

    }
}