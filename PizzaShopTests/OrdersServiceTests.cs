//using Microsoft.Data.SqlClient;
//using Newtonsoft.Json;

//public class OrderServiceTests : IClassFixture<PizzaShopTestFixture>
//{
//    private readonly PizzaShopTestFixture _fixture;

//    public OrderServiceTests(PizzaShopTestFixture fixture)
//    {
//        _fixture = fixture;
//    }

//    private int GetCurrentOrdersLength()
//    {
//        using (var command = new SqlCommand("SELECT COUNT(*) FROM Orders", _fixture.Connection))
//            return Convert.ToInt32(command.ExecuteScalar());
//    }

//    private int AddNewOrder()
//    {
//        using (var insertCommand = new SqlCommand(
//            "INSERT INTO Orders (TotalPrice, PaymentType, DeliveryType, Address, UserId) " +
//            "VALUES (@TotalPrice, @PaymentType, @DeliveryType, @Address, @UserId); " +
//            "SELECT SCOPE_IDENTITY();", _fixture.Connection))
//        {
//            insertCommand.Parameters.AddWithValue("@TotalPrice", 25.99);
//            insertCommand.Parameters.AddWithValue("@PaymentType", "Credit Card");
//            insertCommand.Parameters.AddWithValue("@DeliveryType", "Express");
//            insertCommand.Parameters.AddWithValue("@Address", "789 Oak St, City");
//            insertCommand.Parameters.AddWithValue("@UserId", 1);

//            var pizzas = new List<Pizza>
//            {
//                new Pizza { Title = "Margherita", CartQuantity = 2, Price = 9.99M },
//                new Pizza { Title = "Pepperoni", CartQuantity = 1, Price = 10.5M }
//            };

//            var pizzasJson = JsonConvert.SerializeObject(pizzas);
//            insertCommand.Parameters.AddWithValue("@Pizzas", pizzasJson);

//            return Convert.ToInt32(insertCommand.ExecuteScalar());
//        }
//    }

//    private async Task UpdateOrderAsync(int orderId, double updatedTotalPrice)
//    {
//        using (var updateCommand = new SqlCommand("UPDATE Orders SET TotalPrice = @UpdatedTotalPrice WHERE Id = @OrderId", _fixture.Connection))
//        {
//            updateCommand.Parameters.AddWithValue("@UpdatedTotalPrice", updatedTotalPrice);
//            updateCommand.Parameters.AddWithValue("@OrderId", orderId);

//            await updateCommand.ExecuteNonQueryAsync();
//        }
//    }

//    private async Task<Order?> GetOrderByIdAsync(int orderId)
//    {
//        using (var command = new SqlCommand("SELECT * FROM Orders WHERE Id = @OrderId", _fixture.Connection))
//        {
//            command.Parameters.AddWithValue("@OrderId", orderId);

//            using (var reader = await command.ExecuteReaderAsync())
//            {
//                if (await reader.ReadAsync())
//                {
//                    return new Order
//                    {
//                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
//                        TotalPrice = reader.GetDecimal(reader.GetOrdinal("TotalPrice")),
//                        PaymentType = reader.GetString(reader.GetOrdinal("PaymentType")),
//                        DeliveryType = reader.GetString(reader.GetOrdinal("DeliveryType")),
//                        Address = reader.GetString(reader.GetOrdinal("Address")),
//                        UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
//                    };
//                }
//            }
//        }

//        return null;
//    }

//    private async Task DeleteOrderAsync(int orderId)
//    {
//        using (var deleteCommand = new SqlCommand("DELETE FROM Orders WHERE Id = @OrderId", _fixture.Connection))
//        {
//            deleteCommand.Parameters.AddWithValue("@OrderId", orderId);
//            await deleteCommand.ExecuteNonQueryAsync();
//        }
//    }

//    [Fact]
//    public void CheckOrdersAmountTest()
//    {
//        Assert.Equal(4, GetCurrentOrdersLength());
//        var newOrderId = AddNewOrder();
//        Assert.Equal(5, GetCurrentOrdersLength());
//    }

//    [Fact]
//    public async Task UpdateOrderTest()
//    {
//        var order = await GetOrderByIdAsync(1);
//        await UpdateOrderAsync(order.Id, 25);
//        var updatedOrder = await GetOrderByIdAsync(1);
//        Assert.Equal(25, updatedOrder.TotalPrice);
//    }

//    [Fact]
//    public async Task DeleteOrderTest()
//    {
//        Assert.Equal(5, GetCurrentOrdersLength());
//        var order = await GetOrderByIdAsync(6);
//        await DeleteOrderAsync(order.Id);
//        Assert.Equal(4, GetCurrentOrdersLength());
//    }
//}