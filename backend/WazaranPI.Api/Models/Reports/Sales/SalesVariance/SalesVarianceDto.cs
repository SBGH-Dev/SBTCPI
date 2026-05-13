namespace WazaranPI.Api.Models.Reports.Sales.SalesVariance
{
    public class SalesVarianceDto
    {
        public string CustomerNumber { get; set; } = "";
        public string CustomerGroup { get; set; } = "";
        public string BranchCode { get; set; } = "";
        public string BranchName { get; set; } = "";
        public string SalesmanNumber { get; set; } = "";
        public string SalesManName { get; set; } = "";
        public string SalesmanPhone { get; set; } = "";

        public decimal CurrentYear { get; set; } = 0;
        public decimal LastYear { get; set; } = 0;
        public decimal Variance { get; set; } = 0;
    }
}