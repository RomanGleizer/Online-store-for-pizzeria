public class CustomerService : ICustomerService
{
    private readonly PizzaShopContext _context;

    public CustomerService(PizzaShopContext context)
    {
        _context = context;
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }

    public async Task<Customer> GetCustomerByIdAsync(int customerId)
    {
        return await _context.Customers.FindAsync(customerId);
    }
}