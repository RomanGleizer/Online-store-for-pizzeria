using System.ComponentModel.DataAnnotations;

public class RegisterModel
{
    [Required]
    [Display(Name = "Имя")]
    public string FirstName { get; set; }

    [Required]
    [Display(Name = "Телефон")]
    public string Phone { get; set; }

    [Required]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Пароль")]
    [StringLength(100, ErrorMessage = "Поле {0} должно иметь минимум {2} и максимум {1} символов.", MinimumLength = 5)]
    public string Password { get; set; }


    [Required]
    [Display(Name = "Никнейм")]
    public string UserName { get; set; }
}