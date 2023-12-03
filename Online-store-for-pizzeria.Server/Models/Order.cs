﻿namespace Online_store_for_pizzeria.Server.Models;

public class Order
{
    public int Id { get; set; }

    public string Date { get; set; }

    public int TotalPrice { get; set; }

    public string PaymentType { get; set; }

    public string DeliveryType { get; set; }

    public string Address { get; set; }

    public string Comments { get; set; }

    public User Customer { get; set; }

    public List<Pizza>? Pizzas { get; set; }
}