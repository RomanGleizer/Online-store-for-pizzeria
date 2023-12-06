public interface ICustomerService
{
    Task<Customer> CreateCustomerAsync(Customer customer);
    Task<Customer> GetCustomerByIdAsync(int customerId);
}