using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var responseData = new { message = "Hello from the server!" };
        return Ok(responseData);
    }
}
