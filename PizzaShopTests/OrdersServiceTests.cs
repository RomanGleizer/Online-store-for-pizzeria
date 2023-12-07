using Microsoft.EntityFrameworkCore;

public class OrderServiceTests
{
    private readonly DbContextOptions<PizzaShopContext> _options;

    public OrderServiceTests()
    {
        _options = new DbContextOptionsBuilder<PizzaShopContext>()
            .UseInMemoryDatabase(databaseName: "PizzaShop")
            .Options;
    }

    [Fact]
    public async Task GetExistingOrderByIdAsync()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new OrderService(context);
            var result = await orderService.GetOrderByIdAsync(1);
            Assert.NotNull(result);
        }
    }


    [Fact]
    public async Task GetNonExistentOrderByIdAsync()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new OrderService(context);
            var result = await orderService.GetOrderByIdAsync(10);
            Assert.Null(result);
        }
    }

    [Fact]
    public async Task CreateOrderTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new OrderService(context);

            var newOrder = new Order
            {
                Date = "2023-01-01",
                TotalPrice = 20.00m,
                PaymentType = "CreditCard",
                DeliveryType = "Delivery",
                Address = "123 Main St",
                Comments = "Extra cheese",
                CustomerId = 1,
                Customer = new Customer(),
                PizzaOrders = new List<PizzaOrder>
                {
                    new PizzaOrder { PizzaId = 1, Quantity = 2 },
                    new PizzaOrder { PizzaId = 2, Quantity = 1 }
                }
            };

            var createdOrder = await orderService.CreateOrderAsync(newOrder);

            Assert.NotNull(createdOrder);
        }
    }

    [Fact]
    public async Task UpdateOrderTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new OrderService(context);
            var updatedOrder = new Order
            {
                Id = 1,
                Date = "2023-01-01",
                TotalPrice = 20.00m,
                PaymentType = "CreditCard",
                DeliveryType = "Delivery",
                Address = "123 Main St",
                Comments = "Extra cheese",
                CustomerId = 1,
                PizzaOrders = new List<PizzaOrder>
                {
                    new PizzaOrder { PizzaId = 1, Quantity = 2 },
                    new PizzaOrder { PizzaId = 2, Quantity = 1 }
                }
            };

            await orderService.UpdateOrderAsync(updatedOrder);
            var fetchedOrder = await context.Orders.FindAsync(updatedOrder.Id);
            Assert.True(updatedOrder.Date == fetchedOrder.Date);
        }
    }

    [Fact]
    public async Task DeleteOrderTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new OrderService(context);
            await orderService.DeleteOrderByIdAsync(3);
            var deletedOrder = await context.Orders.FindAsync(3);
            Assert.Null(deletedOrder);
        }
    }

    public void Dispose()
    {
        using var context = new PizzaShopContext(_options);
        context.Database.EnsureDeleted();
    }
}