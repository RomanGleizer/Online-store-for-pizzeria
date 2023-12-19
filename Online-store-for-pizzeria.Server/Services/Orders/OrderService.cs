using Microsoft.EntityFrameworkCore;

public class OrderService : IOrderService
{
    private readonly PizzaShopContext _context;

    public OrderService(PizzaShopContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetOrderByIdAsync(int orderId)
    {
        return await _context.Orders
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }

    public async Task<Order> CreateOrderAsync(Order order)
    {
        var customer = await _context.Users.FindAsync(order.User);

        if (customer is null) throw new Exception("Customer was not found");

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }


    public async Task<Order> DeleteOrderByIdAsync(int orderId)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order is null) throw new Exception("Order was not found");

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order> UpdateOrderAsync(Order order)
    {
        var targetOrder = await _context.Orders
            .FirstOrDefaultAsync(o => o.Id == order.Id);

        if (targetOrder is null) throw new Exception("Order was not found");

        targetOrder.TotalPrice = order.TotalPrice;
        targetOrder.PaymentType = order.PaymentType;
        targetOrder.DeliveryType = order.DeliveryType;
        targetOrder.Address = order.Address;
        targetOrder.UserId = order.UserId;

        await _context.SaveChangesAsync();
        return targetOrder;
    }
}
