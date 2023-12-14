using Online_store_for_pizzeria.Server.Models;

public interface IUserService
{
    Task<User> GetUserByIdAsync(int userId);
    Task<User> CreateUserAsync(User user,string password);
    Task<User> LoginAsync(string email, string password);
    Task<User> UpdateUserAsync(User user);
    string GenerateJwtToken(User user);
}