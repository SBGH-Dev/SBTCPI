


// have no relation with the app, just testing if api is working 

using Microsoft.AspNetCore.Mvc;

namespace WazaranPI.Api.Controllers;

[ApiController]
[Route("api/status")]

public class SystemController : ControllerBase
{
    [HttpGet]
    
    public IActionResult GetStatus()
    {
        return Ok (new
        {
            status = "Ok",
            message = "Working"
        });
    }


    //    [HttpGet("test-hash")]
    //     public IActionResult TestHash()
    //     {
    //         var hash = BCrypt.Net.BCrypt.HashPassword("1");
    //         return Ok(hash);
    //     }
}

    

