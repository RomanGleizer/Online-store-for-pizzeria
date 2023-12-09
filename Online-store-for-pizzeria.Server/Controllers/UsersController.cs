using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ICustomerService _customerService;
    private readonly IMapper _mapper;

    public UsersController(IUserService userService, ICustomerService customerService, IMapper mapper)
    {
        _userService = userService;
        _customerService = customerService;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user is null) return NotFound();

        var customer = _mapper.Map<Customer>(user.Customer);

        return Ok(new { User = user, Customer = customer });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = _mapper.Map<User>(registerViewModel);
        var customer = new Customer { User = user };
        var createdUser = await _userService.CreateUserAsync(user, registerViewModel.Password);
        var createdCustomer = await _customerService.CreateCustomerAsync(customer);

        var responseData = new
        {
            User = new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Phone,
                user.Email,
                user.Password
            },
            Customer = new
            {
                createdCustomer.Id,
                createdCustomer.UserId,
                User = new
                {
                    user.Id,
                    user.FirstName,
                    user.Phone,
                }
            }
        };

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, responseData);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userService.LoginAsync(loginViewModel.Email, loginViewModel.Password);
        if (user is null) return Unauthorized();

        var token = _userService.GenerateJwtToken(user);
        return Ok(new { Token = token });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserViewModel userViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userService.GetUserByIdAsync(id);
        if (user is null) return NotFound();

        _mapper.Map(userViewModel, user);
        await _userService.UpdateUserAsync(user);
        return NoContent();
    }
}
