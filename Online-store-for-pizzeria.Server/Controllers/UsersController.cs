using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var user = new User { FirstName = model.FirstName, Phone = model.Phone, UserName = model.UserName, Email = $"{model.UserName}@gmail.com" };
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
            var signedUser = _pizzaShopContext.Users.FirstOrDefault(u => u.UserName == model.UserName);

            if (signedUser is not null)
            {
                var result = await _signInManager.PasswordSignInAsync(signedUser.UserName, model.Password, false, false);
                if (result.Succeeded)
                {
                    var user = new User
                    {
                        FirstName = signedUser.FirstName,
                        Phone = signedUser.Phone,
                        UserName = signedUser.UserName,
                        Email = $"{signedUser.UserName}@gmail.com"
                    };

                    var lastOrderId = signedUser.LastOrderId;
                    if (lastOrderId.HasValue)
                    {
                        user.LastOrderId = lastOrderId;
                        user.LastOrder = await _pizzaShopContext.Orders
                            .Where(o => o.Id == lastOrderId.Value)
                            .OrderBy(o => o.Id)
                            .LastOrDefaultAsync();
                    }

                    return Ok(new { user, user.LastOrder });
                }
            }
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