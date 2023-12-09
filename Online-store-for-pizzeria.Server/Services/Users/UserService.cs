using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Online_store_for_pizzeria.Server.Services.Users
{
    public class UserService(
        PizzaShopContext context, 
        UserManager<User> userManager,
        SignInManager<User> signInManager, 
        IConfiguration configuration) : IUserService
    {
        private readonly PizzaShopContext _context = context;
        private readonly UserManager<User> _userManager = userManager;
        private readonly SignInManager<User> _signInManager = signInManager;
        private readonly IConfiguration _configuration = configuration;

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<User> CreateUserAsync(User user, string password)
        {
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password);
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded) return user;
            else
            {
                var errors = result.Errors.Select(e => e.Description);
                throw new ApplicationException($"User creation failed: {string.Join(", ", errors)}");
            }
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var targetUser = await _context.Users
                .Include(u => u.Customer)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (targetUser is not null)
            {
                targetUser.FirstName = user.FirstName;
                targetUser.LastName = user.LastName;
                targetUser.Email = user.Email;
                targetUser.Phone = user.Phone;
                targetUser.Password = user.Password;
                targetUser.Customer = user.Customer;
                await _context.SaveChangesAsync();
                return targetUser;
            }

            throw new Exception("Order was not found");
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            return user is not null ? user : null;
        }

        public string GenerateJwtToken(User user)
        {
            if (user is null) throw new ArgumentNullException(nameof(user), "User cannot be null");

            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.MobilePhone, user.Phone),
                    new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["JwtSettings:ExpirationHours"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}