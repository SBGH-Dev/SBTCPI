using System.Data;
using Dapper;
using WazaranPI.Api.Data;
using WazaranPI.Api.Models;
using WazaranPI.Api.Repositories.Interfaces;

namespace WazaranPI.Api.Repositories
{
    // This repository handles ALL report-related database calls
    public class ReportRepository : IReportRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public ReportRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<DummySalesDto>> GetDummySalesAsync(DateTime startDate, DateTime endDate)
        {
            // Create DB connection
            using var db = _connectionFactory.CreateConnection();

            // Call stored procedure and map result to DummySalesDto
            return await db.QueryAsync<DummySalesDto>(
                "dbo.sp_tDummySales_get",
                new
                {
                    start_dt = startDate,
                    end_dt = endDate
                },
                commandType: CommandType.StoredProcedure
            );
        }

    }
}

