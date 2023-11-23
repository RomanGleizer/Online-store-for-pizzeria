﻿namespace Online_store_for_pizzeria.Server.Models;

public class Pizza
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int Price { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }

    public int Amount { get; set; }

    public string? Ingredients { get; set; }

    public List<Order>? Orders { get; set; }
}