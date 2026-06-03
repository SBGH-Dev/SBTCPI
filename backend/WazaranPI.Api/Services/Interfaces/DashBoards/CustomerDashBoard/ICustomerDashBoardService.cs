using WazaranPI.Api.Models.DashBoards.CustomerDashBoard;

namespace WazaranPI.Api.Services.Interfaces.DashBoards.CustomerDashBoard
{
    public interface ICustomerDashBoardService
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

        Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersByProductAsync(
            string salespointcd,
            string prodCd
        );
    }
}