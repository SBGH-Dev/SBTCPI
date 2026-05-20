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
            //validation here
            
            return await _reportRepository.GetDummySalesAsync(startDate, endDate);
        }

       
 
//         public async Task<byte[]> GenerateDummySalesPdfAsync(DateTime startDate, DateTime endDate)
// {
//                 var data = (await _reportRepository.GetDummySalesAsync(startDate, endDate)).ToList();

//                 var totalAmount = data.Sum(x => x.TotalAmount);
//                 var totalRows = data.Count;
//                 var companyLogo = File.ReadAllBytes("Assets/sbtclogo.png");
//                 var websiteLogo = File.ReadAllBytes("Assets/wazaranPILogo.png");

//                 var pdf = Document.Create(container =>
//                 {
//                     container.Page(page =>
//                     {
//                         page.Size(PageSizes.A4);
//                         page.Margin(25);
//                         page.DefaultTextStyle(x => x.FontSize(9).FontFamily("Arial"));

//                         // HEADER
//                         page.Header().Column(header =>
//                         {
//                             header.Item()
//                                 .Background("#0F766E")
//                                 .Padding(15)
//                                 .Row(row =>
//                                 {
//                                     row.RelativeItem().Column(col =>
//                                     {
//                                         col.Item().Text("SALES SUMMARY REPORT")
//                                             .FontSize(22)
//                                             .Bold()
//                                             .FontColor(Colors.White);

//                                         col.Item().PaddingTop(4).Text("Dummy Sales Performance Report")
//                                             .FontSize(10)
//                                             .FontColor("#CCFBF1");
//                                     });

//                                     row.ConstantItem(140).AlignRight().Column(col =>
//                                     {
//                                         col.Item().Text($"Generated")
//                                             .FontSize(8)
//                                             .FontColor("#CCFBF1");

//                                         col.Item().Text(DateTime.Now.ToString("dd/MM/yyyy hh:mm tt"))
//                                             .FontSize(9)
//                                             .Bold()
//                                             .FontColor(Colors.White);
//                                     });
//                                 });

//                             header.Item().Height(8);

//                             // FILTER / SUMMARY CARDS
//                             header.Item().Row(row =>
//                             {
//                                 row.RelativeItem().Background("#ECFDF5").Border(1).BorderColor("#99F6E4").Padding(10).Column(col =>
//                                 {
//                                     col.Item().Text("FROM DATE").FontSize(7).FontColor("#64748B").Bold();
//                                     col.Item().Text(startDate.ToString("dd/MM/yyyy")).FontSize(12).Bold().FontColor("#0F766E");
//                                 });

//                                 row.Spacing(8);

//                                 row.RelativeItem().Background("#ECFEFF").Border(1).BorderColor("#A5F3FC").Padding(10).Column(col =>
//                                 {
//                                     col.Item().Text("TO DATE").FontSize(7).FontColor("#64748B").Bold();
//                                     col.Item().Text(endDate.ToString("dd/MM/yyyy")).FontSize(12).Bold().FontColor("#0891B2");
//                                 });

//                                 row.Spacing(8);

//                                 row.RelativeItem().Background("#F8FAFC").Border(1).BorderColor("#CBD5E1").Padding(10).Column(col =>
//                                 {
//                                     col.Item().Text("TOTAL RECORDS").FontSize(7).FontColor("#64748B").Bold();
//                                     col.Item().Text(totalRows.ToString("N0")).FontSize(12).Bold().FontColor("#334155");
//                                 });

//                                 row.Spacing(8);

//                                 row.RelativeItem().Background("#FFF7ED").Border(1).BorderColor("#FDBA74").Padding(10).Column(col =>
//                                 {
//                                     col.Item().Text("TOTAL AMOUNT").FontSize(7).FontColor("#64748B").Bold();
//                                     col.Item().Text(totalAmount.ToString("N2")).FontSize(12).Bold().FontColor("#C2410C");
//                                 });
//                             });

//                             header.Item().Height(12);
//                         });

//                         // CONTENT
//                         page.Content().Table(table =>
//                         {
//                             table.ColumnsDefinition(columns =>
//                             {
//                                 columns.RelativeColumn(2);
//                                 columns.RelativeColumn(2);
//                                 columns.RelativeColumn(2);
//                             });

//                             table.Header(header =>
//                             {
//                                 header.Cell().Element(HeaderCellStyle).Text("Salesman");
//                                 header.Cell().Element(HeaderCellStyle).Text("Sales Date");
//                                 header.Cell().Element(HeaderCellStyle).AlignRight().Text("Total Amount");
//                             });

//                             foreach (var item in data)
//                             {
//                                 table.Cell().Element(BodyCellStyle).Text(item.Salesman);
//                                 table.Cell().Element(BodyCellStyle).Text(item.SalesDate.ToString("dd/MM/yyyy"));
//                                 table.Cell().Element(BodyCellStyle).AlignRight().Text(item.TotalAmount.ToString("N2"));
//                             }
//                         });

//                         // FOOTER
//                         page.Footer()
//                             .BorderTop(1)
//                             .BorderColor("#CBD5E1")
//                             .PaddingTop(8)
//                             .Row(row =>
//                             {
//                                 row.RelativeItem()
//                                     .Text($"Report period: {startDate:dd/MM/yyyy} - {endDate:dd/MM/yyyy}")
//                                     .FontSize(8)
//                                     .FontColor("#64748B");

//                                 row.ConstantItem(120)
//                                     .AlignRight()
//                                     .Text(text =>
//                                     {
//                                         text.Span("Page ").FontSize(8).FontColor("#64748B");
//                                         text.CurrentPageNumber().FontSize(8).FontColor("#64748B");
//                                         text.Span(" of ").FontSize(8).FontColor("#64748B");
//                                         text.TotalPages().FontSize(8).FontColor("#64748B");
//                                     });
//                             });
//                     });
//                 }).GeneratePdf();

//                 return pdf;

//                 static IContainer HeaderCellStyle(IContainer container)
//                 {
//                     return container
//                         .Background("#0F766E")
//                         .BorderBottom(1)
//                         .BorderColor("#0D9488")
//                         .PaddingVertical(8)
//                         .PaddingHorizontal(6)
//                         .DefaultTextStyle(x => x.Bold().FontColor(Colors.White).FontSize(9));
//                 }

//                 static IContainer BodyCellStyle(IContainer container)
//                 {
//                     return container
//                         .BorderBottom(1)
//                         .BorderColor("#E2E8F0")
//                         .PaddingVertical(6)
//                         .PaddingHorizontal(6)
//                         .DefaultTextStyle(x => x.FontSize(8).FontColor("#334155"));
//                 }
//             }
      
public async Task<byte[]> GenerateDummySalesPdfAsync(DateTime startDate, DateTime endDate)
{
    var data = (await _reportRepository.GetDummySalesAsync(startDate, endDate)).ToList();

    var totalAmount = data.Sum(x => x.TotalAmount);
    var totalRows = data.Count;

    var companyLogo = File.ReadAllBytes("Assets/sbtclogo.png");
    var websiteLogo = File.ReadAllBytes("Assets/wazaranPILogo.png");

    var pdf = Document.Create(container =>
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.Margin(25);
            page.DefaultTextStyle(x => x.FontSize(9).FontFamily("Arial"));

            // HEADER
            page.Header().Column(header =>
            {
                // SBTC LOGO 
               header.Item()
                .Height(70) // 
                .AlignCenter()
                .Image(companyLogo)
                .FitHeight();

                header.Item().Height(10);

                //TITLE SECTION
                header.Item()
                    .Background("#0EA5A4")
                    .Padding(12)
                    .Column(col =>
                    {
                        col.Item().Text("SALES SUMMARY REPORT")
                            .FontSize(18)
                            .Bold()
                            .FontColor(Colors.White);

                        col.Item().PaddingTop(3).Text($"Period: {startDate:dd/MM/yyyy} - {endDate:dd/MM/yyyy}")
                            .FontSize(9)
                            .FontColor("#CCFBF1");

                        col.Item().PaddingTop(3).Text($"Total Records: {totalRows:N0}   |   Total Amount: {totalAmount:N2}")
                            .FontSize(9)
                            .FontColor("#CCFBF1");
                    });

                header.Item().Height(12);
            });

            // CONTENT
            page.Content().Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.RelativeColumn(2);
                    columns.RelativeColumn(2);
                    columns.RelativeColumn(2);
                });

                table.Header(header =>
                {
                    header.Cell().Element(HeaderCellStyle).Text("Salesman");
                    header.Cell().Element(HeaderCellStyle).Text("Sales Date");
                    header.Cell().Element(HeaderCellStyle).AlignRight().Text("Total Amount");
                });

                foreach (var item in data)
                {
                    table.Cell().Element(BodyCellStyle).Text(item.Salesman);
                    table.Cell().Element(BodyCellStyle).Text(item.SalesDate.ToString("dd/MM/yyyy"));
                    table.Cell().Element(BodyCellStyle).AlignRight().Text(item.TotalAmount.ToString("N2"));
                }
            });

            // FOOTER
            page.Footer()
                .BorderTop(1)
                .BorderColor("#CBD5E1")
                .PaddingTop(8)
                .Row(row =>
                {
                    row.RelativeItem().Row(left =>
                    {
                        left.ConstantItem(22)
                            .Image(websiteLogo)
                            .FitWidth();

                        left.RelativeItem()
                            .PaddingLeft(6)
                            .AlignMiddle()
                            .Text("WazaranPI")
                            .FontSize(10)
                            .Bold()
                            .FontColor("#0F766E");
                    });

                    row.ConstantItem(120)
                        .AlignRight()
                        .Text(text =>
                        {
                            text.Span("Page ").FontSize(8).FontColor("#64748B");
                            text.CurrentPageNumber().FontSize(8).FontColor("#64748B");
                            text.Span(" of ").FontSize(8).FontColor("#64748B");
                            text.TotalPages().FontSize(8).FontColor("#64748B");
                        });
                });
        });
    }).GeneratePdf();

    return pdf;

    static IContainer HeaderCellStyle(IContainer container)
    {
        return container
           .Background("#0EA5A4")
            .BorderBottom(1)
            .BorderColor("#0D9488")
            .PaddingVertical(8)
            .PaddingHorizontal(6)
            .DefaultTextStyle(x => x.Bold().FontColor(Colors.White).FontSize(9));
    }

    static IContainer BodyCellStyle(IContainer container)
    {
        return container
            .BorderBottom(1)
            .BorderColor("#E2E8F0")
            .PaddingVertical(6)
            .PaddingHorizontal(6)
            .DefaultTextStyle(x => x.FontSize(8).FontColor("#334155"));
    }
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

            // Data starts at raw 2, header 
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



