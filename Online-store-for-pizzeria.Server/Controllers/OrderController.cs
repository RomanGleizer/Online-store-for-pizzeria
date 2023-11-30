using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.Models;

namespace Online_store_for_pizzeria.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : Controller
{
    private readonly ApplicationContext? _applicationContext;

    public OrderController(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _applicationContext.Orders.Include(o => o.Customer).Include(o => o.Pizzas).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _applicationContext.Orders.Include(o => o.Customer).Include(o => o.Pizzas).FirstOrDefaultAsync(o => o.Id == id);

        if (order is null) return NotFound();
        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        _applicationContext.Orders.Add(order);
        await _applicationContext.SaveChangesAsync();
        return Ok(order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Order order)
    {
        if (id != order.Id) return BadRequest();
        _applicationContext.Entry(order).State = EntityState.Modified;

        try
        {
            await _applicationContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_applicationContext.Orders.Any(o => o.Id == id))
                return NotFound();
        }

        return Ok(order);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _applicationContext.Orders.FindAsync(id);

        if (order == null)
            return NotFound();

        _applicationContext.Orders.Remove(order);
        await _applicationContext.SaveChangesAsync();
        return Ok(order);
    }
}
