using ClosedXML.Excel;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;
using WazaranPI.Api.Services.Interfaces;

namespace WazaranPI.Api.Services
{
    // This class implements IReportService
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

    
        public async Task<IEnumerable<DummySalesDto>> GetDummySalesAsync(DateTime startDate, DateTime endDate)
        {
            // You can later add validation here
            return await _reportRepository.GetDummySalesAsync(startDate, endDate);
        }

       
        public async Task<byte[]> GenerateDummySalesPdfAsync(DateTime startDate, DateTime endDate)
        {
            var data = (await _reportRepository.GetDummySalesAsync(startDate, endDate)).ToList();

            var pdf = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(30);
                    page.Size(PageSizes.A4);

                    // HEADER
                    page.Header()
                        .Text("Dummy Sales Report")
                        .FontSize(20)
                        .Bold();

                    // TABLE
                    page.Content().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        // TABLE HEADER
                        table.Header(header =>
                        {
                            header.Cell().Text("Salesman").Bold();
                            header.Cell().Text("Date").Bold();
                            header.Cell().Text("Amount").Bold();
                        });

                        // TABLE DATA
                        foreach (var item in data)
                        {
                            table.Cell().Text(item.Salesman);
                            table.Cell().Text(item.SalesDate.ToString("yyyy-MM-dd"));
                            table.Cell().Text(item.TotalAmount.ToString("N2"));
                        }
                    });

                    // FOOTER
                    page.Footer()
                        .AlignCenter()
                        .Text($"From {startDate:yyyy-MM-dd} To {endDate:yyyy-MM-dd}");
                });
            }).GeneratePdf();

            return pdf;
        }

      
        public async Task<byte[]> GenerateDummySalesExcelAsync(DateTime startDate, DateTime endDate)
        {
            var data = (await _reportRepository.GetDummySalesAsync(startDate, endDate)).ToList();

            using var workbook = new XLWorkbook();
            var ws = workbook.Worksheets.Add("Dummy Sales");

            // HEADER
            ws.Cell(1, 1).Value = "Salesman";
            ws.Cell(1, 2).Value = "Date";
            ws.Cell(1, 3).Value = "Amount";

            int row = 2;

            // DATA
            foreach (var item in data)
            {
                ws.Cell(row, 1).Value = item.Salesman;
                ws.Cell(row, 2).Value = item.SalesDate;
                ws.Cell(row, 3).Value = item.TotalAmount;
                row++;
            }

            // FORMATTING
            ws.Column(2).Style.DateFormat.Format = "yyyy-mm-dd";
            ws.Column(3).Style.NumberFormat.Format = "#,##0.00";
            ws.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);

            return stream.ToArray();
        }

    
    }
}