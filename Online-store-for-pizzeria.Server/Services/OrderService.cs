using Online_store_for_pizzeria.Server.AppContext;
using Online_store_for_pizzeria.Server.Entities;
using Online_store_for_pizzeria.Server.Models.Database;

namespace Online_store_for_pizzeria.Server.Services;

public class OrderService
{
    public ApplicationContext Context { get; }
    public readonly Bucket _bucket;

    public OrderService(ApplicationContext context, Bucket bucket)
    {
        Context = context;
        _bucket = bucket;
    }

    public Order CreateOrder(int? userId)
    {
        var customer = Context?.Users?.SingleOrDefault(c => c.Id == userId);
        if (customer is null)
            throw new NotImplementedException();

        return new Order
        {
            Date = DateTime.Now.ToLongDateString(),
            TotalPrice = CountTotalPrice(_bucket?.Pizzas),
            PaymentType = "Данные из формы",
            DeliveryType = "Данные из формы",
            Address = "Данные из формы",
            Comments = "Данные из формы",
            Customer = customer,
            Pizzas = _bucket?.Pizzas
        };
    }

    public Order? FindOrderById(int? id)
    {
        return Context?.Orders?.FirstOrDefault(o => o.Id == id);
    }

    private int CountTotalPrice(List<Pizza>? pizzas)
    {
        var sum = 0;
        foreach (var pizza in pizzas)
            sum += pizza.Price * pizza.Amount;
        return sum;
    }

    private void AddPizza(Pizza pizza, Bucket bucket)
        => bucket?.AddPizza(pizza);

    private void RemovePizza(Pizza pizza, Bucket bucket)
        => bucket?.RemovePizza(pizza);
}
