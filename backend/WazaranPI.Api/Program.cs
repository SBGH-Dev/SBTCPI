

using QuestPDF.Infrastructure;
using WazaranPI.Api.Data;
using WazaranPI.Api.Repositories;
using WazaranPI.Api.Repositories.Interfaces;
using WazaranPI.Api.Services;
using WazaranPI.Api.Services.Interfaces;
using WazaranPI.Api.Repositories.Interfaces.Reports.Sales.SalesVariance;
using WazaranPI.Api.Repositories.Reports.Sales.SalesVariance;
using WazaranPI.Api.Services.Interfaces.Reports.Sales.SalesVariance;
using WazaranPI.Api.Services.Reports.Sales.SalesVariance;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("WazaranPIFrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();


builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();


builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IMenuService, MenuService>();

builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<IReportService, ReportService>();

builder.Services.AddScoped<ISalesSubMenuRepository, SalesSubMenuRepository>();

builder.Services.AddScoped<ISalesVarianceRepository, SalesVarianceRepository>();
builder.Services.AddScoped<ISalesVarianceService, SalesVarianceService>();

QuestPDF.Settings.License = LicenseType.Community;


var app = builder.Build();

app.UseCors("WazaranPIFrontendPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

