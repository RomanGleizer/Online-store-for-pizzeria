using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations;

public class RegisterViewModel
{
    [Required(ErrorMessage = "First name is required")]
    [MaxLength(255)]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last name is required")]
    [MaxLength(255)]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Phone number is required")]
    [MaxLength(255)]
    public string Phone { get; set; }

    [Required(ErrorMessage = "Email address is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    [MaxLength(256)]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    [MaxLength(255)]
    public string Password { get; set; }

    [Required(ErrorMessage = "User name is required")]
    [RegularExpression("^[a-zA-Z0-9_-]{3,16}$", ErrorMessage = "Invalid user name")]
    [MaxLength(256)]
    public string UserName { get; set; }
}

