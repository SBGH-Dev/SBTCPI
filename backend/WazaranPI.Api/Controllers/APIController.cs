


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
}