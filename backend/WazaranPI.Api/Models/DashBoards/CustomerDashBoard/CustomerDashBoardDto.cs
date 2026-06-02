namespace WazaranPI.Api.Models.DashBoards.CustomerDashBoard
{
    public class FilterOptionDto
    {
        public string Value { get; set; } = "";
        public string Label { get; set; } = "";
    }

    public class CustomerDashBoardFiltersDto
    {
        public List<FilterOptionDto> Branches { get; set; } = new();
        public List<FilterOptionDto> Channels { get; set; } = new();
        public List<FilterOptionDto> Customers { get; set; } = new();
        public List<FilterOptionDto> Products { get; set; } = new();
    }

    public class CustomerDashBoardDto
    {
        public string CustomerNumber { get; set; } = "";
        public string CustomerName { get; set; } = "";
        public string CustomerChannel { get; set; } = "";
        public string CustomerGroup { get; set; } = "";
        public string CustomerAddress { get; set; } = "";
        public string CustomerPhone { get; set; } = "";
        public string CustomerMobile { get; set; } = "";
        public decimal CustomerLatitude { get; set; }
        public decimal CustomerLongitude { get; set; }

        public string SalesmanNumber { get; set; } = "";
        public string SalesmanName { get; set; } = "";
        public string SalesmanPhone { get; set; } = "";

        public string CustomerVatNumber { get; set; } = "";

        public decimal PendingPayment { get; set; }
        public DateTime? LatestPaymentDt { get; set; }

        public decimal TotalSales { get; set; }
        public decimal TotalSalesThisYear { get; set; }
        public decimal TotalSalesThisMonth { get; set; }
        public decimal TotalSalesToday { get; set; }

        public int CurrentYear { get; set; }
        public string CurrentMonth { get; set; } = "";
    }

    public class TopPayingCustomerThisYearDto
    {
        public string TopPayingCustomerThisYear { get; set; } = "";
        public decimal TopPayingCustomerThisYearAmount { get; set; }
        public string CurrentYear { get; set; } = "";
    }

    public class TopPayingCustomerThisMonthDto
    {
        public string TopPayingCustomerThisMonth { get; set; } = "";
        public decimal TopPayingCustomerThisMonthAmount { get; set; }
        public string CurrentMonth { get; set; } = "";
    }

    public class CustomerDashBoardTopPayingDto
    {
        public TopPayingCustomerThisYearDto? ThisYear { get; set; }
        public TopPayingCustomerThisMonthDto? ThisMonth { get; set; }
    }
}