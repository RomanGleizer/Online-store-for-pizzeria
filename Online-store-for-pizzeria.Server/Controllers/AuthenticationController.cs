using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Online_store_for_pizzeria.Server.AppContext;
using System.Security.Claims;

namespace Online_store_for_pizzeria.Server.Controllers;

[Route("Authentication")]
public class AuthenticationController : Controller
{
    private ApplicationContext? _applicationContext;

    public AuthenticationController(ApplicationContext? context)
    {
        _applicationContext = context;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index(string email, string password)
    {
        var form = Request.Form;
        if (!form.ContainsKey("email") || !form.ContainsKey("password"))
            return BadRequest("Email и/или пароль не установлены");

        var person = _applicationContext?.Customers?.FirstOrDefault(p => p.Email == email && p.Password == password);
        if (person is null) return Unauthorized();

        var claims = new List<Claim> { new Claim(ClaimTypes.Name, person.Email) };
        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
        return RedirectToAction("Index", "Customer");
    }
}
