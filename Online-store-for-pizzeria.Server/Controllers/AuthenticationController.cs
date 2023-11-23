using Microsoft.AspNetCore.Mvc;

namespace Online_store_for_pizzeria.Server.Controllers;

public class AuthenticationController : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Index()
    {
        return View();
    }
}
