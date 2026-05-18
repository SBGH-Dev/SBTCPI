using ClosedXML.Excel;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WazaranPI.Api.Models.Reports.Sales.SalesVariance;
using WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance;
using WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance;

namespace WazaranPI.Api.Services.Reports.Sales.SalesVariance
{
    public class SalesVarianceService : ISalesVarianceService
    {
        private readonly ISalesVarianceRepository _repository;

        public SalesVarianceService(ISalesVarianceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalesVarianceDto>> GetSalesVarianceAsync()
        {
            return await _repository.GetSalesVarianceAsync();
        }


// please resuce to 500 rows only to see if the problem is the size 
        public async Task<byte[]> GenerateSalesVariancePdfAsync()
        {
            var data = (await _repository.GetSalesVarianceAsync()).ToList();
            var totalCurrentYear = data.Sum(x => x.CurrentYear);
            var totalLastYear = data.Sum(x => x.LastYear);
            var totalVariance = data.Sum(x => x.Variance);

            var companyLogo = File.ReadAllBytes("Assets/sbtclogo.png");
            var websiteLogo = File.ReadAllBytes("Assets/wazaranPILogo.png");

            var pdf = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4.Landscape());
                    page.Margin(25);
                    page.DefaultTextStyle(x => x.FontSize(8).FontFamily("Arial"));

                    page.Header().Column(header =>
                    {
                        header.Item()
                            .Height(65)
                            .AlignCenter()
                            .Image(companyLogo)
                            .FitHeight();

                        header.Item().Height(10);

                        header.Item()
                            .Background("#0EA5A4")
                            .Padding(12)
                            .Column(col =>
                            {
                                col.Item().Text("SALES VARIANCE REPORT")
                                    .FontSize(18)
                                    .Bold()
                                    .FontColor(Colors.White);

                                col.Item().PaddingTop(3)
                                    .Text($"Total Current Year: {totalCurrentYear:N2}   |   Total Last Year: {totalLastYear:N2}   |   Total Variance: {totalVariance:N2}")
                                    .FontSize(9)
                                    .FontColor("#CCFBF1");

                                col.Item().PaddingTop(3)
                                    .Text($"Generated: {DateTime.Now:dd/MM/yyyy hh:mm tt}")
                                    .FontSize(9)
                                    .FontColor("#CCFBF1");
                            });

                        header.Item().Height(12);
                    });

                    page.Content().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(1.4f);
                            columns.RelativeColumn(1.4f);
                            columns.RelativeColumn(1.2f);
                            columns.RelativeColumn(2f);
                            columns.RelativeColumn(1.5f);
                            columns.RelativeColumn(2f);
                            columns.RelativeColumn(1.5f);
                            columns.RelativeColumn(1.5f);
                            columns.RelativeColumn(1.5f);
                            columns.RelativeColumn(1.5f);
                        });

                        table.Header(header =>
                        {
                            header.Cell().Element(HeaderCellStyle).Text("Customer No");
                            header.Cell().Element(HeaderCellStyle).Text("Group");
                            header.Cell().Element(HeaderCellStyle).Text("Branch");
                            header.Cell().Element(HeaderCellStyle).Text("Branch Name");
                            header.Cell().Element(HeaderCellStyle).Text("Salesman No");
                            header.Cell().Element(HeaderCellStyle).Text("Salesman");
                            header.Cell().Element(HeaderCellStyle).Text("Phone");
                            header.Cell().Element(HeaderCellStyle).AlignRight().Text("Current Year");
                            header.Cell().Element(HeaderCellStyle).AlignRight().Text("Last Year");
                            header.Cell().Element(HeaderCellStyle).AlignRight().Text("Variance");
                        });

                        foreach (var item in data)
                        {
                            table.Cell().Element(BodyCellStyle).Text(item.CustomerNumber);
                            table.Cell().Element(BodyCellStyle).Text(item.CustomerGroup);
                            table.Cell().Element(BodyCellStyle).Text(item.BranchCode);
                            table.Cell().Element(BodyCellStyle).Text(item.BranchName);
                            table.Cell().Element(BodyCellStyle).Text(item.SalesmanNumber);
                            table.Cell().Element(BodyCellStyle).Text(item.SalesManName);
                            table.Cell().Element(BodyCellStyle).Text(item.SalesmanPhone);
                            table.Cell().Element(BodyCellStyle).AlignRight().Text(item.CurrentYear.ToString("N2"));
                            table.Cell().Element(BodyCellStyle).AlignRight().Text(item.LastYear.ToString("N2"));
                            table.Cell().Element(BodyCellStyle).AlignRight().Text(item.Variance.ToString("N2"));
                        }
                    });

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
                    .PaddingVertical(7)
                    .PaddingHorizontal(5)
                    .DefaultTextStyle(x => x.Bold().FontColor(Colors.White).FontSize(8));
            }

            static IContainer BodyCellStyle(IContainer container)
            {
                return container
                    .BorderBottom(1)
                    .BorderColor("#E2E8F0")
                    .PaddingVertical(5)
                    .PaddingHorizontal(5)
                    .DefaultTextStyle(x => x.FontSize(7).FontColor("#334155"));
            }
        }


       
        // public async Task<MemoryStream> GenerateSalesVariancePdfAsync()
        // {
        //     var data = (await _repository.GetSalesVarianceAsync()).ToList();
            
        //     var totalCurrentYear = data.Sum(x => x.CurrentYear);
        //     var totalLastYear = data.Sum(x => x.LastYear);
        //     var totalVariance = data.Sum(x => x.Variance);

        //     var companyLogo = File.ReadAllBytes("Assets/sbtclogo.png");
        //     var websiteLogo = File.ReadAllBytes("Assets/wazaranPILogo.png");

        //     var pdf = Document.Create(container =>
        //     {
        //         container.Page(page =>
        //         {
        //             page.Size(PageSizes.A4.Landscape());
        //             page.Margin(25);
        //             page.DefaultTextStyle(x => x.FontSize(8).FontFamily("Arial"));

        //             page.Header().Column(header =>
        //             {
        //                 header.Item()
        //                     .Height(65)
        //                     .AlignCenter()
        //                     .Image(companyLogo)
        //                     .FitHeight();

        //                 header.Item().Height(10);

        //                 header.Item()
        //                     .Background("#0EA5A4")
        //                     .Padding(12)
        //                     .Column(col =>
        //                     {
        //                         col.Item().Text("SALES VARIANCE REPORT")
        //                             .FontSize(18)
        //                             .Bold()
        //                             .FontColor(Colors.White);

        //                         col.Item().PaddingTop(3)
        //                             .Text($"Total Current Year: {totalCurrentYear:N2}   |   Total Last Year: {totalLastYear:N2}   |   Total Variance: {totalVariance:N2}")
        //                             .FontSize(9)
        //                             .FontColor("#CCFBF1");

        //                         col.Item().PaddingTop(3)
        //                             .Text($"Generated: {DateTime.Now:dd/MM/yyyy hh:mm tt}")
        //                             .FontSize(9)
        //                             .FontColor("#CCFBF1");
        //                     });

        //                 header.Item().Height(12);
        //             });

        //             page.Content().Table(table =>
        //             {
        //                 table.ColumnsDefinition(columns =>
        //                 {
        //                     columns.RelativeColumn(1.4f);
        //                     columns.RelativeColumn(1.4f);
        //                     columns.RelativeColumn(1.2f);
        //                     columns.RelativeColumn(2f);
        //                     columns.RelativeColumn(1.5f);
        //                     columns.RelativeColumn(2f);
        //                     columns.RelativeColumn(1.5f);
        //                     columns.RelativeColumn(1.5f);
        //                     columns.RelativeColumn(1.5f);
        //                     columns.RelativeColumn(1.5f);
        //                 });

        //                 table.Header(header =>
        //                 {
        //                     header.Cell().Element(HeaderCellStyle).Text("Customer No");
        //                     header.Cell().Element(HeaderCellStyle).Text("Group");
        //                     header.Cell().Element(HeaderCellStyle).Text("Branch");
        //                     header.Cell().Element(HeaderCellStyle).Text("Branch Name");
        //                     header.Cell().Element(HeaderCellStyle).Text("Salesman No");
        //                     header.Cell().Element(HeaderCellStyle).Text("Salesman");
        //                     header.Cell().Element(HeaderCellStyle).Text("Phone");
        //                     header.Cell().Element(HeaderCellStyle).AlignRight().Text("Current Year");
        //                     header.Cell().Element(HeaderCellStyle).AlignRight().Text("Last Year");
        //                     header.Cell().Element(HeaderCellStyle).AlignRight().Text("Variance");
        //                 });

        //                 foreach (var item in data)
        //                 {
        //                     table.Cell().Element(BodyCellStyle).Text(item.CustomerNumber);
        //                     table.Cell().Element(BodyCellStyle).Text(item.CustomerGroup);
        //                     table.Cell().Element(BodyCellStyle).Text(item.BranchCode);
        //                     table.Cell().Element(BodyCellStyle).Text(item.BranchName);
        //                     table.Cell().Element(BodyCellStyle).Text(item.SalesmanNumber);
        //                     table.Cell().Element(BodyCellStyle).Text(item.SalesManName);
        //                     table.Cell().Element(BodyCellStyle).Text(item.SalesmanPhone);
        //                     table.Cell().Element(BodyCellStyle).AlignRight().Text(item.CurrentYear.ToString("N2"));
        //                     table.Cell().Element(BodyCellStyle).AlignRight().Text(item.LastYear.ToString("N2"));
        //                     table.Cell().Element(BodyCellStyle).AlignRight().Text(item.Variance.ToString("N2"));
        //                 }
        //             });

        //             page.Footer()
        //                 .BorderTop(1)
        //                 .BorderColor("#CBD5E1")
        //                 .PaddingTop(8)
        //                 .Row(row =>
        //                 {
        //                     row.RelativeItem().Row(left =>
        //                     {
        //                         left.ConstantItem(22)
        //                             .Image(websiteLogo)
        //                             .FitWidth();

        //                         left.RelativeItem()
        //                             .PaddingLeft(6)
        //                             .AlignMiddle()
        //                             .Text("WazaranPI")
        //                             .FontSize(10)
        //                             .Bold()
        //                             .FontColor("#0F766E");
        //                     });

        //                     row.ConstantItem(120)
        //                         .AlignRight()
        //                         .Text(text =>
        //                         {
        //                             text.Span("Page ").FontSize(8).FontColor("#64748B");
        //                             text.CurrentPageNumber().FontSize(8).FontColor("#64748B");
        //                             text.Span(" of ").FontSize(8).FontColor("#64748B");
        //                             text.TotalPages().FontSize(8).FontColor("#64748B");
        //                         });
        //                 });
        //         });
        //     }).GeneratePdf();

        //     return new MemoryStream(pdf);

        //     static IContainer HeaderCellStyle(IContainer container)
        //     {
        //         return container
        //             .Background("#0EA5A4")
        //             .BorderBottom(1)
        //             .BorderColor("#0D9488")
        //             .PaddingVertical(7)
        //             .PaddingHorizontal(5)
        //             .DefaultTextStyle(x => x.Bold().FontColor(Colors.White).FontSize(8));
        //     }

        //     static IContainer BodyCellStyle(IContainer container)
        //     {
        //         return container
        //             .BorderBottom(1)
        //             .BorderColor("#E2E8F0")
        //             .PaddingVertical(5)
        //             .PaddingHorizontal(5)
        //             .DefaultTextStyle(x => x.FontSize(7).FontColor("#334155"));
        //     }
        // }






        //  public async Task<byte[]> GenerateSalesVarianceExcelAsync()
        // {
        //     var data = (await _repository.GetSalesVarianceAsync()).ToList();

        //     using var workbook = new XLWorkbook();
        //     var ws = workbook.Worksheets.Add("Sales Variance");

        //     ws.Cell(1, 1).Value = "Customer Number";
        //     ws.Cell(1, 2).Value = "Customer Group";
        //     ws.Cell(1, 3).Value = "Branch Code";
        //     ws.Cell(1, 4).Value = "Branch Name";
        //     ws.Cell(1, 5).Value = "Salesman Number";
        //     ws.Cell(1, 6).Value = "Salesman Name";
        //     ws.Cell(1, 7).Value = "Salesman Phone";
        //     ws.Cell(1, 8).Value = "Current Year";
        //     ws.Cell(1, 9).Value = "Last Year";
        //     ws.Cell(1, 10).Value = "Variance";

        //     int row = 2;

        //     foreach (var item in data)
        //     {
        //         ws.Cell(row, 1).Value = item.CustomerNumber;
        //         ws.Cell(row, 2).Value = item.CustomerGroup;
        //         ws.Cell(row, 3).Value = item.BranchCode;
        //         ws.Cell(row, 4).Value = item.BranchName;
        //         ws.Cell(row, 5).Value = item.SalesmanNumber;
        //         ws.Cell(row, 6).Value = item.SalesManName;
        //         ws.Cell(row, 7).Value = item.SalesmanPhone;
        //         ws.Cell(row, 8).Value = item.CurrentYear;
        //         ws.Cell(row, 9).Value = item.LastYear;
        //         ws.Cell(row, 10).Value = item.Variance;
        //         row++;
        //     }

        //     ws.Range(1, 1, 1, 10).Style.Font.Bold = true;
        //    // ws.Range(1, 1, 1, 10).Style.Fill.BackgroundColor = XLColor.Teal;
        //    ws.Range(1, 1, 1, 10).Style.Fill.BackgroundColor = XLColor.FromHtml("#0D9488");
        //     ws.Range(1, 1, 1, 10).Style.Font.FontColor = XLColor.White;

        //     ws.Columns(8, 10).Style.NumberFormat.Format = "#,##0.00";
        //     ws.Columns().AdjustToContents();

        //      using var stream = new MemoryStream();
        //      workbook.SaveAs(stream);

        //      return stream.ToArray();

              
        // }



        public async Task<MemoryStream> GenerateSalesVarianceExcelAsync()
                {
                    var data = (await _repository.GetSalesVarianceAsync()).ToList();

                    var workbook = new XLWorkbook();
                    var ws = workbook.Worksheets.Add("Sales Variance");

                    ws.Cell(1, 1).Value = "Customer Number";
                    ws.Cell(1, 2).Value = "Customer Group";
                    ws.Cell(1, 3).Value = "Branch Code";
                    ws.Cell(1, 4).Value = "Branch Name";
                    ws.Cell(1, 5).Value = "Salesman Number";
                    ws.Cell(1, 6).Value = "Salesman Name";
                    ws.Cell(1, 7).Value = "Salesman Phone";
                    ws.Cell(1, 8).Value = "Current Year";
                    ws.Cell(1, 9).Value = "Last Year";
                    ws.Cell(1, 10).Value = "Variance";

                    ws.Cell(2, 1).InsertData(
                        data.Select(x => new object[]
                        {
                            x.CustomerNumber,
                            x.CustomerGroup,
                            x.BranchCode,
                            x.BranchName,
                            x.SalesmanNumber,
                            x.SalesManName,
                            x.SalesmanPhone,
                            x.CurrentYear,
                            x.LastYear,
                            x.Variance
                        })
                    );

                    ws.Range(1, 1, 1, 10).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, 10).Style.Fill.BackgroundColor =
                        XLColor.FromHtml("#0D9488");

                    ws.Range(1, 1, 1, 10).Style.Font.FontColor = XLColor.White;

                    ws.Columns(8, 10).Style.NumberFormat.Format = "#,##0.00";

                    //ws.Columns().AdjustToContents(); -- for auto width 

                    // fixed widths 
                    ws.Column(1).Width = 18;
                    ws.Column(2).Width = 22;
                    ws.Column(3).Width = 15;
                    ws.Column(4).Width = 30;
                    ws.Column(5).Width = 18;
                    ws.Column(6).Width = 36;
                    ws.Column(7).Width = 18;
                    ws.Column(8).Width = 18;
                    ws.Column(9).Width = 18;
                    ws.Column(10).Width = 18;

                    var stream = new MemoryStream();

                    workbook.SaveAs(stream);

                    stream.Position = 0;

                    return stream;
                }

    }
}

