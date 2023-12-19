using System.ComponentModel.DataAnnotations;

public class LoginModel
{
    [EmailAddress(ErrorMessage = "Не указан Email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Не указан пароль")]
    [DataType(DataType.Password)]
    public string? Password { get; set; }

    public bool RememberMe { get; set; }
}
