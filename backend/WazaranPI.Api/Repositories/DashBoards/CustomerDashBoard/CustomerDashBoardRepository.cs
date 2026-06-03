using System.Data;
using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models.DashBoards.CustomerDashBoard;
using WazaranPI.Api.Repositories.Interfaces.DashBoards.CustomerDashBoard;

namespace WazaranPI.Api.Repositories.DashBoards.CustomerDashBoard
{
    public class CustomerDashBoardRepository : ICustomerDashBoardRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public CustomerDashBoardRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<CustomerDashBoardFiltersDto> GetInitialFiltersAsync()
        {
            using var db = _connectionFactory.CreateConnection();

            var branches = await db.QueryAsync<FilterOptionDto>(
                "dbo.sp_bi_tmst_salespoint_get",
                commandType: CommandType.StoredProcedure
            );

            var products = await db.QueryAsync<FilterOptionDto>(
                "dbo.sp_bi_products_get",
                commandType: CommandType.StoredProcedure
            );

            return new CustomerDashBoardFiltersDto
            {
                Branches = branches.ToList(),
                Products = products.ToList(),
                Channels = new List<FilterOptionDto>(),
                Customers = new List<FilterOptionDto>()
            };
        }

        public async Task<IEnumerable<FilterOptionDto>> GetChannelsAsync()
        {
            using var db = _connectionFactory.CreateConnection();

            return await db.QueryAsync<FilterOptionDto>(
                "dbo.sp_bi_customers_channel_get",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<FilterOptionDto>> GetCustomersAsync(
            string salespointcd,
            string otldcd
        )
        {
            using var db = _connectionFactory.CreateConnection();

            return await db.QueryAsync<FilterOptionDto>(
                "dbo.sp_bi_customers_get",
                new
                {
                    salespointcd = salespointcd ?? "",
                    otldcd = otldcd ?? ""
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<CustomerDashBoardDto?> GetCustomerDetailsAsync(
            string custCd,
            string prodCd,
            string salespointcd
        )
        {
            using var db = _connectionFactory.CreateConnection();

            return await db.QueryFirstOrDefaultAsync<CustomerDashBoardDto>(
                "dbo.sp_bi_customer_dtl_get",
                new
                {
                    cust_cd = custCd ?? "",
                    prod_cd = prodCd ?? "",
                    salespointcd = salespointcd ?? ""
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersAsync(
            string salespointcd
        )
        {
            using var db = _connectionFactory.CreateConnection();

            var thisYear = await db.QueryFirstOrDefaultAsync<TopPayingCustomerThisYearDto>(
                "dbo.sp_bi_top_paying_customer_this_year_get",
                new
                {
                    salespointcd = salespointcd ?? ""
                },
                commandType: CommandType.StoredProcedure
            );

            var thisMonth = await db.QueryFirstOrDefaultAsync<TopPayingCustomerThisMonthDto>(
                "dbo.sp_bi_top_paying_customer_this_month_get",
                new
                {
                    salespointcd = salespointcd ?? ""
                },
                commandType: CommandType.StoredProcedure
            );

            return new CustomerDashBoardTopPayingDto
            {
                ThisYear = thisYear,
                ThisMonth = thisMonth
            };
        }

        public async Task<CustomerDashBoardTopPayingDto> GetTopPayingCustomersByProductAsync(
    string salespointcd,
    string prodCd
)
{
    using var db = _connectionFactory.CreateConnection();

    var thisYearByProduct =
        await db.QueryFirstOrDefaultAsync<TopPayingCustomerThisYearByProductDto>(
            "dbo.sp_bi_top_paying_customer_this_year_by_product__get",
            new
            {
                salespointcd = salespointcd ?? "",
                prod_cd = prodCd ?? ""
            },
            commandType: CommandType.StoredProcedure
        );

    var thisMonthByProduct =
        await db.QueryFirstOrDefaultAsync<TopPayingCustomerThisMonthByProductDto>(
            "dbo.sp_bi_top_paying_customer_this_month_by_product_get",
            new
            {
                salespointcd = salespointcd ?? "",
                prod_cd = prodCd ?? ""
            },
            commandType: CommandType.StoredProcedure
        );

    return new CustomerDashBoardTopPayingDto
    {
        ThisYearByProduct = thisYearByProduct,
        ThisMonthByProduct = thisMonthByProduct
    };
}

    }
}