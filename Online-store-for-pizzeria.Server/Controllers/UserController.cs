using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Online_store_for_pizzeria.Server.AppContext;
using Online_store_for_pizzeria.Server.Models.Database;
using Online_store_for_pizzeria.Server.Models.Registration;
using Online_store_for_pizzeria.Server.Services;

namespace Online_store_for_pizzeria.Server.Controllers;

[Route("User")]
public class UserController : Controller
{
    private readonly ApplicationContext? _applicationContext;
    private readonly UserService _userService;
    private readonly UserManager<IdentityUser> _userManager;

    public UserController(ApplicationContext? context, UserService service, UserManager<IdentityUser> userManager)
    {
        _applicationContext = context;
        _userService = service;
        _userManager = userManager;
    }

    public IActionResult Index()
    {
        return Content("Hello");
    }

    public IActionResult LogIn()
    {
        return View();
    }

    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> LogIn(User? user)
    {
        if (user is not null)
        {
            var newUser = _userService.LogIn(user);
            _applicationContext?.Users?.Add(newUser);
            await _applicationContext.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return BadRequest("There was an error during registration");
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email, PhoneNumber = model.Phone };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
                RedirectToAction("LogIn");
            else
                throw new NotImplementedException("Ошибка при регистрации");
        }

        return View(model);
    }
}
