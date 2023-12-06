public interface IUserService
{
    Task<User> GetUserByIdAsync(int userId);
    Task<User> CreateUserAsync(User user);
}