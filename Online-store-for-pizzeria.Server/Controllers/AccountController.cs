using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.Models;
using Online_store_for_pizzeria.Server.ViewModels;
using System.Numerics;
using System.Security.Claims;

namespace Online_store_for_pizzeria.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : Controller
{
    private readonly ApplicationContext? _applicationContext;
    private readonly UserManager<User> _userManager;

    public AccountController(ApplicationContext? context, UserManager<User> userManager)
    {
        _applicationContext = context;
        _userManager = userManager;
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginModel model)
    {
        if (ModelState.IsValid)
        {
            var user = _applicationContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
            if (user is not null)
            {
                await Authenticate(model.Email);
                return Ok(user);
            }
            else 
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
        }

        return BadRequest();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user is null)
            {
                _applicationContext.Users.Add(new User { Email = model.Email, Password = model.Password });
                await _applicationContext.SaveChangesAsync();
                await Authenticate(model.Email);
                return Ok(user);
            }
            else
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
        }

        return BadRequest();
    }

    [HttpPost]
    public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Email);
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);

        if (result.Succeeded)
        {
            await _userManager.UpdateAsync(user);
            return Ok(user);
        }

        return BadRequest();
    }

    //public async Task<IActionResult> ChangePassword(int id)
    //{
    //    var user = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Id == id);

    //    if (user is null) return NotFound();
    //    var model = new ChangePasswordViewModel { Id = user.Id, Email = user.Email };
    //    return Ok(user);
    //}

    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login", "Account");
    }

    private async Task Authenticate(string login)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimsIdentity.DefaultNameClaimType, login)
        };

        var id = new ClaimsIdentity(
            claims, 
            "ApplicationCookie", 
            ClaimsIdentity.DefaultNameClaimType, 
            ClaimsIdentity.DefaultRoleClaimType
            );

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
    }
}
