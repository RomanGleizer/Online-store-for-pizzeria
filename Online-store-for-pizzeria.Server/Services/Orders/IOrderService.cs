public interface IOrderService
{
    Task<Order> GetOrderByIdAsync(int orderId);
    Task<Order> CreateOrderAsync(Order order);
    Task<Order> DeleteOrderByIdAsync(int orderId);
    Task<Order> UpdateOrderAsync(Order order);
}