using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.Models;

namespace Online_store_for_pizzeria.Server.AppContext;

public class ApplicationContext : DbContext
{
    public DbSet<Customer>? Customers { get; set; } = null;

    public DbSet<Order>? Orders { get; set; } = null;

    public DbSet<Pizza>? Pizzas { get; set; } = null;

    public ApplicationContext(DbContextOptions<ApplicationContext> options) 
        : base(options)
    {
        Database.EnsureCreated();
    }
}
