using Microsoft.EntityFrameworkCore;

public class OrderService : IOrderService
{
    private readonly ApplicationContext _context;

    public OrderService(ApplicationContext context)
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
        var existingCustomer = await _context.Customers.FindAsync(order.CustomerId);

        if (existingCustomer is null) throw new Exception("Customer was not found");
        order.Customer = existingCustomer;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }


    public async Task<Order> DeleteOrderByIdAsync(int orderId)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order is not null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
        return order;
    }

    public async Task<Order> UpdateOrderAsync(Order order)
    {
        var existingOrder = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.PizzaOrders)
            .ThenInclude(pO => pO.Pizza)
            .FirstOrDefaultAsync(o => o.Id == order.Id);

        if (existingOrder is not null)
        {
            existingOrder.Date = order.Date;
            existingOrder.TotalPrice = order.TotalPrice;
            existingOrder.PaymentType = order.PaymentType;
            existingOrder.DeliveryType = order.DeliveryType;
            existingOrder.Address = order.Address;
            existingOrder.Comments = order.Comments;
            existingOrder.CustomerId = order.CustomerId;
            existingOrder.Customer = await _context.Customers.FindAsync(order.CustomerId);

            existingOrder.PizzaOrders.Clear();
            foreach (var pizzaOrder in order.PizzaOrders)
            {
                existingOrder.PizzaOrders.Add(new PizzaOrder
                {
                    Pizza = await _context.Pizzas.FindAsync(pizzaOrder.PizzaId),
                    Quantity = pizzaOrder.Quantity
                });
            }

            await _context.SaveChangesAsync();
        }
        return existingOrder;
    }
}
