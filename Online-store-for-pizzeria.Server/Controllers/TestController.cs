using Microsoft.AspNetCore.Mvc;

namespace Online_store_for_pizzeria.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : Controller
{
    [HttpGet]
    public IActionResult ProcessString(string inputString)
    {
        return Ok("Вы отправили: " + inputString);
    }
}
