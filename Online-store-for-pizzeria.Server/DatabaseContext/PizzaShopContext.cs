using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.Models;

public class PizzaShopContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public DbSet<Customer> Customers { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<Pizza> Pizzas { get; set; }

    public DbSet<PizzaOrder> PizzaOrders { get; set; }

    public DbSet<User> Users { get; set; }

    public PizzaShopContext(DbContextOptions<PizzaShopContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //modelBuilder.Entity<User>().HasData(
        //    new User
        //    {
        //        Id = 1,
        //        FirstName = "John",
        //        LastName = "Doe",
        //        Email = "john.doe@example.com",
        //        Phone = "1234567890",
        //        Password = "password"
        //    },
        //    new User
        //    {
        //        Id = 2,
        //        FirstName = "Alice",
        //        LastName = "Smith",
        //        Email = "alice.smith@example.com",
        //        Phone = "9876543210",
        //        Password = "password"
        //    },
        //    new User
        //    {
        //        Id = 3,
        //        FirstName = "Bob",
        //        LastName = "Johnson",
        //        Email = "bob.johnson@example.com",
        //        Phone = "5555555555",
        //        Password = "password"
        //    }
        //);

        //modelBuilder.Entity<Customer>().HasData(
        //    new Customer
        //    {
        //        Id = 1,
        //        UserId = 1
        //    },
        //    new Customer
        //    {
        //        Id = 2,
        //        UserId = 2
        //    },
        //    new Customer
        //    {
        //        Id = 3,
        //        UserId = 3
        //    }
        //);

        //modelBuilder.Entity<Order>().HasData(
        //    new Order
        //    {
        //        Id = 1,
        //        Date = "2023-01-01",
        //        TotalPrice = 21.98m,
        //        PaymentType = "Credit Card",
        //        DeliveryType = "Home Delivery",
        //        Address = "123 Main St, Cityville",
        //        Comments = "Leave at the doorstep",
        //        CustomerId = 1
        //    },
        //    new Order
        //    {
        //        Id = 2,
        //        Date = "2023-02-01",
        //        TotalPrice = 23.99m,
        //        PaymentType = "PayPal",
        //        DeliveryType = "Pickup",
        //        Address = "456 Oak St, Townsville",
        //        Comments = "Ready in 20 minutes",
        //        CustomerId = 2
        //    },
        //    new Order
        //    {
        //        Id = 3,
        //        Date = "2023-03-01",
        //        TotalPrice = 32.97m,
        //        PaymentType = "Cash on Delivery",
        //        DeliveryType = "Home Delivery",
        //        Address = "789 Pine St, Villageton",
        //        Comments = "Call before delivery",
        //        CustomerId = 3
        //    }
        //);

        //modelBuilder.Entity<Pizza>().HasData(
        //    new Pizza
        //    {
        //        Id = 1,
        //        Name = "Margherita",
        //        Description = "Classic Margherita Pizza",
        //        Ingredients = "Tomato, Mozzarella, Basil",
        //        Price = 9.99m
        //    },
        //    new Pizza
        //    {
        //        Id = 2,
        //        Name = "Pepperoni",
        //        Description = "Pepperoni Pizza",
        //        Ingredients = "Tomato, Mozzarella, Pepperoni",
        //        Price = 11.99m
        //    },
        //    new Pizza
        //    {
        //        Id = 3,
        //        Name = "Vegetarian",
        //        Description = "Vegetarian Pizza",
        //        Ingredients = "Tomato, Mozzarella, Bell Peppers, Mushrooms, Olives",
        //        Price = 10.99m
        //    }
        //);

        //modelBuilder.Entity<PizzaOrder>().HasData(
        //    new { PizzaId = 1, OrderId = 1, Quantity = 2 },
        //    new { PizzaId = 2, OrderId = 1, Quantity = 1 },
        //    new { PizzaId = 3, OrderId = 2, Quantity = 3 },
        //    new { PizzaId = 2, OrderId = 3, Quantity = 2 }
        //);

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PizzaOrder>().HasKey(po => new { po.PizzaId, po.OrderId });
    }
}