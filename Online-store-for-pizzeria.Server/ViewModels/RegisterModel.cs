using System.ComponentModel.DataAnnotations;

public class RegisterModel
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string Phone { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required]
    public string UserName { get; set; }
}