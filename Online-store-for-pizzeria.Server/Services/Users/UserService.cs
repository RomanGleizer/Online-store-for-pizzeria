using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly PizzaShopContext _context;

    public UserService(PizzaShopContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByIdAsync(int userId)
    {
        return await _context.Users.FindAsync(userId);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        var targetUser = await _context.Users
            .Include(u => u.Customer)
            .FirstOrDefaultAsync(u => u.Id == user.Id);

        if (targetUser is null) throw new Exception("Order was not found");

        targetUser.FirstName = user.FirstName;
        targetUser.LastName = user.LastName;
        targetUser.Email = user.Email;
        targetUser.Phone = user.Phone;
        targetUser.Password = user.Password;
        targetUser.Customer = user.Customer;
        await _context.SaveChangesAsync();
        return targetUser;
    }
}