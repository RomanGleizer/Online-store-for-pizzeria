using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;

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

        return Ok(order);
    }

    public async Task<IActionResult> CreateOrder(CreateOrderModel createOrderModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var jsonSerializerOptions = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,

        };
        var jsonString = JsonSerializer.Serialize(createOrderModel, jsonSerializerOptions);

        var deserializedOrder = JsonSerializer.Deserialize<CreateOrderModel>(jsonString, jsonSerializerOptions);

        var order = _mapper.Map<Order>(createOrderModel);
        var createdOrder = await _orderService.CreateOrderAsync(order);

        return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrder);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderViewModel orderViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var order = await _orderService.GetOrderByIdAsync(id);
        if (order is null) return NotFound();

        _mapper.Map(orderViewModel, order);
        await _orderService.UpdateOrderAsync(order);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order is null) return NotFound();

        await _orderService.DeleteOrderByIdAsync(id);
        return NoContent();
    }
}
