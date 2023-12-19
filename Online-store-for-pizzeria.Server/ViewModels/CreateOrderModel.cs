public class CreateOrderModel
{
    public int Id { get; set; }

    public decimal TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public int UserId { get; set; }

    public List<Pizza> Pizzas { get; set; }
}
