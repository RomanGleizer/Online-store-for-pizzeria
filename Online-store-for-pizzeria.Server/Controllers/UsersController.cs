﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Online_store_for_pizzeria.Server.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly PizzaShopContext _pizzaShopContext;

    public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, PizzaShopContext pizzaShopContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _pizzaShopContext = pizzaShopContext;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new User 
            {
                FirstName = model.FirstName,
                Phone = model.Phone,
                Email = model.Email,
                UserName = model.UserName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new { user });
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(model);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        if (ModelState.IsValid)
        {
            var signedUser = _pizzaShopContext.Users.FirstOrDefault(u => u.Email == model.Email);
            var result = await _signInManager.PasswordSignInAsync(signedUser.UserName, model.Password, model.RememberMe, false);
            if (result.Succeeded) return Ok(result);
            ModelState.AddModelError(string.Empty, "Неверные учетные данные");
        }

        return BadRequest(model);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }
}