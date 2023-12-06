using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order is null) return NotFound();

        var orderViewModel = _mapper.Map<OrderViewModel>(order);
        return Ok(orderViewModel);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderViewModel orderViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var order = _mapper.Map<Order>(orderViewModel);
        var createdOrder = await _orderService.CreateOrderAsync(order);
        var createdOrderViewModel = _mapper.Map<OrderViewModel>(createdOrder);

        return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrderViewModel);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderViewModel orderViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var existingOrder = await _orderService.GetOrderByIdAsync(id);
        if (existingOrder is null) return NotFound();

        _mapper.Map(orderViewModel, existingOrder);
        await _orderService.UpdateOrderAsync(existingOrder);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var existingOrder = await _orderService.GetOrderByIdAsync(id);
        if (existingOrder is null) return NotFound();
        await _orderService.DeleteOrderByIdAsync(id);
        return NoContent();
    }
}
