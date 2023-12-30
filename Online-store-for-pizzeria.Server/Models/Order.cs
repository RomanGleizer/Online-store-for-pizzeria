using HtmlAgilityPack;
using System.Text;

public class Order
{
    public int Id { get; set; }

    public decimal TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public List<Pizza> Pizzas { get; set; }

    public string UserName { get; set; }

    public override string ToString()
    {
        var fullPizzaOrderInfo = new PizzaOrder[]
        {
            new PizzaOrder { Name = "Карбонара", CreatingTime = 10 },
            new PizzaOrder { Name = "Сырная", CreatingTime = 8 },
            new PizzaOrder { Name = "Четыре сезона", CreatingTime = 11 },
            new PizzaOrder { Name = "Пепперони Фреш", CreatingTime = 8 },
            new PizzaOrder { Name = "Ветчина и сыр", CreatingTime = 10 }
        };

        var stringBuilder = new StringBuilder();
        var time = 0;
        foreach (var pizza in Pizzas)
        {
            foreach (var pizzaInfo in fullPizzaOrderInfo)
                if (string.Equals(pizza.Title, pizzaInfo.Name, StringComparison.OrdinalIgnoreCase))
                    time += pizzaInfo.CreatingTime;

            stringBuilder.Append($"Пицца : {pizza.Title}, количество: {pizza.CartQuantity}\n");
        }
        
        return $"Был сделан заказ на сумму {TotalPrice}, тип оплаты: {PaymentType}, тип доставки: {DeliveryType}, адрес: {Address}\n{stringBuilder.ToString()}\nОбщее время изготовления и выпекания всех пицц: {time} мин. Если вы заказали доставку, то курьер вам позвонит вам перед выездом.";
    }

    private HtmlNodeCollection? GetTrafficData()
    {
        var url = "https://xn--80acgfbsl1azdqr.xn----8sbb2ahcjpdbegn.xn--p1ai/";
        var web = new HtmlWeb();
        var document = web.Load(url);
        var node = document.DocumentNode.SelectNodes("//ymaps[@class='ymaps-b-traffic-panel__level']");

        if (node != null)
            return node;
        else
            throw new NotImplementedException("Элемент не найден");
    }
}
