public class Order
{
    public int Id { get; set; }

    public string Date { get; set; }

    public decimal TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public string Comments { get; set; }

    public int CustomerId { get; set; }

    public Customer Customer { get; set; }

    public List<PizzaOrder> PizzaOrders { get; set; }
}
