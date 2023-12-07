using Microsoft.EntityFrameworkCore;

public class PizzaShopContextTests : IDisposable
{
    private readonly DbContextOptions<PizzaShopContext> _db;

    public PizzaShopContextTests()
    {
        _db = new DbContextOptionsBuilder<PizzaShopContext>()
            .UseInMemoryDatabase(databaseName: "PizzaShop")
            .Options;

        using (var context = new PizzaShopContext(_db))
            context.Database.EnsureCreated();
    }

    /// <summary>
    /// Тест на добавление покупателя в Бд.
    /// </summary>
    [Fact]
    public void CanAddCustomerTest()
    {
        using (var context = new PizzaShopContext(_db))
        {
            var customer = new Customer { UserId = 4 };
            context.Customers.Add(customer);
            context.SaveChanges();
        }

        using (var context = new PizzaShopContext(_db))
            Assert.Equal(4, context.Customers.Count());
    }

    /// <summary>
    /// Удаление всех внесенных изменений в БД после завершения тестов.
    /// </summary>
    public void Dispose()
    {
        using var context = new PizzaShopContext(_db);
        context.Database.EnsureDeleted();
    }
}
