using System.ComponentModel.DataAnnotations;

namespace Online_store_for_pizzeria.Server.Models.Registration;

public class RegisterModel
{
    [Required]
    public string Name { get; set; }

    [Required]  
    public string Phone { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}
