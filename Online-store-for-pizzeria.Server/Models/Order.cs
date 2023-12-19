public class Order
{
    public int Id { get; set; }

    public decimal TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public int UserId { get; set; }

    public User User { get; set; }

    public List<Pizza> Pizzas { get; set; }
}
