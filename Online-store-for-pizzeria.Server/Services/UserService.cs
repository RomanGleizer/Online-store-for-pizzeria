using Online_store_for_pizzeria.Server.AppContext;
using Online_store_for_pizzeria.Server.Models.Database;

namespace Online_store_for_pizzeria.Server.Services;

public class UserService
{
    private readonly ApplicationContext _context;

    public UserService(ApplicationContext context)
    {
        _context = context;
    }

    public User LogIn(User? user)
    {
        if (_context.Users.Any(c => c.Email == user.Email))
            throw new Exception("User with same email was registered");

        return new User
        {
            Name = user.Name,
            Phone = user.Phone,
            Email = user.Email,
            Password = user.Password
        };
    }
}
