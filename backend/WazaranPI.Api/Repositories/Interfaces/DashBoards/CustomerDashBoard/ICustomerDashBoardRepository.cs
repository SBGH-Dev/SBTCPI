using WazaranPI.Api.Models.DashBoards.CustomerDashBoard;

namespace WazaranPI.Api.Repositories.Interfaces.DashBoards.CustomerDashBoard
{
    public interface ICustomerDashBoardRepository
    {
        Task<CustomerDashBoardFiltersDto> GetInitialFiltersAsync();

        Task<IEnumerable<FilterOptionDto>> GetChannelsAsync();

        Task<IEnumerable<FilterOptionDto>> GetCustomersAsync(
            string salespointcd,
            string otldcd
        );

        Task<CustomerDashBoardDto?> GetCustomerDetailsAsync(
            string custCd,
            string prodCd,
            string salespointcd
        );

        Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersAsync(
            string salespointcd
        );
    }
}