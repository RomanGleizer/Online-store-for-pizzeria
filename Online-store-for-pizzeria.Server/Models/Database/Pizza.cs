namespace Online_store_for_pizzeria.Server.Models.Database;

public class Pizza
{
    public int Id { get; set; }

    public int Price { get; set; }

    public int Amount { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Ingredients { get; set; }

    public Order Order { get; set; }
}
