using WazaranPI.Api.Models;

namespace WazaranPI.Api.Repositories.Interfaces
{
    public interface IReportRepository
    {
        // Existing methods stay here

        // Dummy Sales report data from SQL stored procedure
        Task<IEnumerable<DummySalesDto>> GetDummySalesAsync(DateTime startDate, DateTime endDate);
        
    }
}
 
//okay so now i have this new repoer, go ahead and do the following
    //create the full backend flow :
    // controler / sales / salesvariance / controller.cs
    // repo / interface / sales /salesvariance / .cs
    // repo / sales / salesvariance / .cs
    // and so on 
// front end page : load data in table, if possible barchar to show the diff for each sales man
// the diff column showd be sortable, when i click i sort DESC / ASEC front end only for performance
// export excel 
// print pdf
// follow thw design used in the page i sent you
// use pagination or what evev that is performane killer 
// tell what files to crete / where, page.tsx i send you should be replaced (keep the things that dont need to be changed like the title bar)
// design well
// explain each part when you finish 
