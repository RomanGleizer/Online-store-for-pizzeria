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

        var userViewModel = _mapper.Map<UserViewModel>(user);
        var customerViewModel = _mapper.Map<CustomerViewModel>(user.Customer);

        return Ok(new { User = userViewModel, Customer = customerViewModel });
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterViewModel registerViewModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var user = _mapper.Map<User>(registerViewModel);

        var customer = new Customer { User = user };

        var createdUser = await _userService.CreateUserAsync(user);
        var createdCustomer = await _customerService.CreateCustomerAsync(customer);

        var userViewModel = _mapper.Map<UserViewModel>(createdUser);
        var customerViewModel = _mapper.Map<CustomerViewModel>(createdCustomer);

        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, new { User = userViewModel, Customer = customerViewModel });
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
