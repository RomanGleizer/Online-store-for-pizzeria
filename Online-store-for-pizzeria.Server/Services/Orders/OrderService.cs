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
            .Include(o => o.Customer)
            .Include(o => o.PizzaOrders)
            .ThenInclude(po => po.Pizza)
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }

    public async Task<Order> CreateOrderAsync(Order order)
    {
        var customer = await _context.Customers.FindAsync(order.CustomerId);

        if (customer is null) throw new Exception("Customer was not found");
        order.Customer = customer;

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
            .Include(o => o.PizzaOrders)
            .FirstOrDefaultAsync(o => o.Id == order.Id);

        if (targetOrder is null) throw new Exception("Order was not found");

        targetOrder.Date = order.Date;
        targetOrder.TotalPrice = order.TotalPrice;
        targetOrder.PaymentType = order.PaymentType;
        targetOrder.DeliveryType = order.DeliveryType;
        targetOrder.Address = order.Address;
        targetOrder.Comments = order.Comments;
        targetOrder.CustomerId = order.CustomerId;
        targetOrder.Customer = await _context.Customers.FindAsync(order.CustomerId);

        targetOrder.PizzaOrders.Clear();
        foreach (var pizzaOrder in order.PizzaOrders)
            targetOrder.PizzaOrders.Add(new PizzaOrder
            {
                Quantity = pizzaOrder.Quantity,
                PizzaId = pizzaOrder.PizzaId,
                OrderId = pizzaOrder.OrderId,
                Pizza = await _context.Pizzas.FindAsync(pizzaOrder.PizzaId),
            });

        await _context.SaveChangesAsync();
        return targetOrder;
    }
}
