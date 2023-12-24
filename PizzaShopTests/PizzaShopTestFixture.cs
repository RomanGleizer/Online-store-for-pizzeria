using Microsoft.Data.SqlClient;

public class PizzaShopTestFixture : IDisposable
{
    public SqlConnection Connection { get; private set; }

    public PizzaShopTestFixture()
    {
        var connectionString = "Server=DESKTOP-1DF7650;Database=PizzaShop;Trusted_Connection=True;TrustServerCertificate=True;";
        Connection = new SqlConnection(connectionString);
        Connection.Open();
    }

    public void Dispose()
    {
        Connection.Close();
    }
}
