namespace WazaranPI.Api.Models
{
    // This model represents ONE row returned from sp_tDummySales_get
    public class DummySalesDto
    {
        public string Salesman { get; set; }
        public DateTime SalesDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}