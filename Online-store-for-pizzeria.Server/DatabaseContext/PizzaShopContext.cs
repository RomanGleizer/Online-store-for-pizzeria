using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class PizzaShopContext : IdentityDbContext<User>
{
    public override DbSet<User> Users { get; set; }

    public DbSet<Order> Orders { get; set; }

    public PizzaShopContext(DbContextOptions<PizzaShopContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
