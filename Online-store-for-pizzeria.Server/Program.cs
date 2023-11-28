using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Online_store_for_pizzeria.Server.AppContext;

var builder = WebApplication.CreateBuilder(args);
var dbConnection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllersWithViews();
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => options.LoginPath = "/login");

builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(dbConnection));

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
