using System.Text;

public class Order
{
    public int Id { get; set; }

    public decimal TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public List<Pizza> Pizzas { get; set; }

    public int UserId { get; set; }

    public override string ToString()
    {
        var stringBuilder = new StringBuilder();
        foreach (var pizza in Pizzas)
            stringBuilder.Append($"Пицца : {pizza.Title}, количество: {pizza.CartQuantity}\n");

        return $"Был сделан заказ на сумму {TotalPrice}, тип оплаты: {PaymentType}, тип доставки: {DeliveryType}, адрес: {Address}\n{stringBuilder.ToString()}";
    }
}
