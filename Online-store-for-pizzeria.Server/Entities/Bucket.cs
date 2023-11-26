using Online_store_for_pizzeria.Server.Models.Database;

namespace Online_store_for_pizzeria.Server.Entities;

public class Bucket
{
    public List<Pizza>? Pizzas { get; }

    public Bucket()
    {
        Pizzas = new List<Pizza>();
    }

    public void AddPizza(Pizza pizza)
        => Pizzas?.Add(pizza);

    public void RemovePizza(Pizza pizza)
        => Pizzas?.Remove(pizza);
}
