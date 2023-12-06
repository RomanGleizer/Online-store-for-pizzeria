public class OrderViewModel
{
    public string Date { get; set; }
    public decimal TotalPrice { get; set; }
    public string PaymentType { get; set; }
    public string DeliveryType { get; set; }
    public string Address { get; set; }
    public string Comments { get; set; }

    public int CustomerId { get; set; }
    public List<PizzaViewModel> Pizzas { get; set; }
}
