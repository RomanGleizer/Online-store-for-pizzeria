using Online_store_for_pizzeria.Server.Models;

public class Customer
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public List<Order> Orders { get; set; }
}
