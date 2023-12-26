using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Bot;
using TelegramBot;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly PizzaShopContext _pizzaShopContext;
    private readonly IMapper _mapper;

    public OrdersController(IMapper mapper, PizzaShopContext pizzaShopContext)
    {
        _mapper = mapper;
        _pizzaShopContext = pizzaShopContext;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _pizzaShopContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
        if (order is null) return NotFound();
        return Ok(order);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder(CreateOrderModel createOrderModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var order = _mapper.Map<Order>(createOrderModel);
        _pizzaShopContext.Orders.Add(order);
        var user = await _pizzaShopContext.Users.FirstOrDefaultAsync(u => u.UserName == createOrderModel.UserName);

        if (createOrderModel.UserName is "default" | user is not null)
        {
            try
            {
                await _pizzaShopContext.SaveChangesAsync();
                if (user is not null)
                {
                    var userOrders = _pizzaShopContext.Orders.Where(o => o.UserName == createOrderModel.UserName);
                    user.LastOrderId = userOrders.Count();
                    _pizzaShopContext.Entry(user).State = EntityState.Modified;
                    await _pizzaShopContext.SaveChangesAsync();
                }
            }
            catch (Exception ex) { return BadRequest(ex); }

            var chatId = ChatIdManager.GetChatId();
            await SendOrderInfoToBot(order, chatId);

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }
        else return BadRequest(ModelState);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _pizzaShopContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
        if (order is null) return NotFound();

        _pizzaShopContext.Orders.Remove(order);
        await _pizzaShopContext.SaveChangesAsync();

        return NoContent();
    }

    private async Task SendOrderInfoToBot(Order order, long chatId)
    {
        try
        {
            await Bot.BotClient.SendTextMessageAsync(chatId, order.ToString());
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ошибка при отправке информации о заказе в бота: {ex}");
        }
    }
}
