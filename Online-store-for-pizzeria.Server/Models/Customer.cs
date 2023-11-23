namespace Online_store_for_pizzeria.Server.Models;

public class Customer
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public List<Order>? Orders { get; set; }
}
