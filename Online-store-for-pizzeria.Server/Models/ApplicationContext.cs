using Microsoft.EntityFrameworkCore;

namespace Online_store_for_pizzeria.Server.Models;

public class ApplicationContext : DbContext
{
    public DbSet<User>? Users { get; set; } = null;

    public DbSet<Order>? Orders { get; set; } = null;

    public DbSet<Pizza>? Pizzas { get; set; } = null;

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}
