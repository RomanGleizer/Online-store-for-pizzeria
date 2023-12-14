using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_store_for_pizzeria.Server.Models;

namespace Online_store_for_pizzeria.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController(IUserService userService, ICustomerService customerService, IMapper mapper) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        private readonly ICustomerService _customerService = customerService;
        private readonly IMapper _mapper = mapper;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user is null) return NotFound();

            var customer = _mapper.Map<Customer>(user.Customer);

            return new JsonResult(new { User = user, Customer = customer });
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

            return new JsonResult(responseData);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginViewModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userService.LoginAsync(loginViewModel.Email, loginViewModel.Password);
            if (user is null) return Unauthorized();

            var token = _userService.GenerateJwtToken(user);
            return Ok(new { Token = token, User = user });
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
}