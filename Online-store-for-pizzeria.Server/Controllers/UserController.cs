using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.AppContext;
using Online_store_for_pizzeria.Server.Models.Database;
using Online_store_for_pizzeria.Server.Services;

namespace Online_store_for_pizzeria.Server.Controllers;

public class UserController : Controller
{
    private ApplicationContext? _applicationContext;
    private UserService _userService;

    public UserController(ApplicationContext? context, UserService service)
    {
        _applicationContext = context;
        _userService = service;
    }

    public IActionResult Index()
    {
        return Content("Hello");
    }

    public async Task<IActionResult> Customers()
    {
        return View(await _applicationContext.Users.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create(User? user)
    {
        if (user is not null)
        {
            var newUser = _userService.Register(user);
            _applicationContext?.Users?.Add(newUser);
            await _applicationContext.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return BadRequest("There was an error during registration");
    }
}
