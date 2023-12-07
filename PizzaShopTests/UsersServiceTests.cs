using Microsoft.EntityFrameworkCore;

public class UsersServiceTests
{
    private readonly DbContextOptions<PizzaShopContext> _options;

    public UsersServiceTests()
    {
        _options = new DbContextOptionsBuilder<PizzaShopContext>()
            .UseInMemoryDatabase(databaseName: "PizzaShop")
            .Options;
    }

    [Fact]
    public async Task GetExistingUserTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var orderService = new UserService(context);
            var result = await orderService.GetUserByIdAsync(1);
            Assert.NotNull(result);
        }
    }

    [Fact]
    public async Task TryGetNonExistentUserTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var userService = new UserService(context);
            var result = await userService.GetUserByIdAsync(10);
            Assert.Null(result);
        }
    }

    [Fact]
    public async Task AddNewUserTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var userService = new UserService(context);
            var testUser = new User
            {
                Id = 4,
                FirstName = "John",
                LastName = "Doe",
                Phone = "1234567890",
                Email = "john.doe@example.com",
                Password = "password123",
                Customer = new Customer { Id = 4, UserId = 4 },
            };

            var newUser = await userService.CreateUserAsync(testUser);
            var fetchedUser = await context.Users.FindAsync(newUser.Id);
            Assert.NotNull(fetchedUser);
        }
    }

    [Fact]
    public async Task UpdateUserTest()
    {
        using (var context = new PizzaShopContext(_options))
        {
            var userService = new UserService(context);
            var updatedUser = new User
            {
                Id = 1,
                FirstName = "UpdatedFirstName",
                LastName = "UpdatedLastName",
                Phone = "9876543210",
                Email = "updated.email@example.com",
                Password = "updatedpassword"
            };

            await userService.UpdateUserAsync(updatedUser);
            var fetchedUser = await context.Users.FindAsync(updatedUser.Id);
            Assert.True(updatedUser.FirstName == fetchedUser.FirstName);
        }
    }

    public void Dispose()
    {
        using var context = new PizzaShopContext(_options);
        context.Database.EnsureDeleted();
    }
}
