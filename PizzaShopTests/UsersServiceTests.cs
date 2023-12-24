using Microsoft.Data.SqlClient;

namespace PizzaShopTests;

public class UsersServiceTests : IClassFixture<PizzaShopTestFixture>
{
    private readonly PizzaShopTestFixture _fixture;

    public UsersServiceTests(PizzaShopTestFixture fixture)
    {
        _fixture = fixture;
    }

    private async Task UpdateUserAsync(string firstName, string updatedFirstName)
    {
        using (var updateCommand = new SqlCommand("UPDATE AspNetUsers SET FirstName = @UpdatedFirstName WHERE FirstName = @FirstName", _fixture.Connection))
        {
            updateCommand.Parameters.AddWithValue("@UpdatedFirstName", updatedFirstName);
            updateCommand.Parameters.AddWithValue("@FirstName", firstName);

            await updateCommand.ExecuteNonQueryAsync();
        }
    }

    private async Task<User?> GetUserByFirstNameAsync(string firstName)
    {
        using (var command = new SqlCommand("SELECT * FROM AspNetUsers WHERE FirstName = @FirstName", _fixture.Connection))
        {
            command.Parameters.AddWithValue("@FirstName", firstName);

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (await reader.ReadAsync())
                {
                    return new User
                    {
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        Phone = reader.GetString(reader.GetOrdinal("Phone")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                    };
                }
            }
        }

        return null;
    }


    [Fact]
    public async Task UpdateUserTest()
    {
        var user = await GetUserByFirstNameAsync("Eva");
        await UpdateUserAsync(user.FirstName, "Roman");
        var updatedUser = await GetUserByFirstNameAsync("Roman");
        Assert.Equal("Roman", updatedUser.FirstName);
    }
}