using Microsoft.AspNetCore.Mvc;
using Online_store_for_pizzeria.Server.Models.Database;
using Online_store_for_pizzeria.Server.Services;

namespace Online_store_for_pizzeria.Server.Controllers;

public class OrderController : Controller
{
    private OrderService _orderService;

    public OrderController(OrderService service)
    {
        _orderService = service;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id is not null)
        {
            var order = _orderService.FindOrderById(id);
            if (order is not null) return View(order);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Create(int? userId)
    {
        if (userId is not null)
        {
            var order = _orderService.CreateOrder(userId);
            _orderService.Context.Add(order);
            await _orderService.Context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Edit(Order order)
    {
        _orderService?.Context?.Orders?.Update(order);
        await _orderService.Context.SaveChangesAsync();
        return RedirectToAction("Index");
    }
}
