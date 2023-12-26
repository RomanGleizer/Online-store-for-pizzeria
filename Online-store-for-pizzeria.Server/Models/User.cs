using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

public class User : IdentityUser
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    [NotMapped]
    public Order LastOrder { get; set; }
}