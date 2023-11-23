using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.AppContext;

namespace Online_store_for_pizzeria.Server.Controllers;

public class CustomerController : Controller
{
    private ApplicationContext? _applicationContext;

    public CustomerController(ApplicationContext? context)
    {
        _applicationContext = context;
    }

    public async Task<IActionResult> Index()
    {
        return View(await _applicationContext.Customers.ToListAsync());
    }
}
