using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var dbConnection = builder.Configuration.GetConnectionString("DefaultConnection");
var mapperConfig = new MapperConfiguration((v) =>
{
    v.AddProfile(new MappingProfile());
});
var mapper = mapperConfig.CreateMapper();
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(dbConnection));

builder.Services.AddSingleton(mapper);
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => options.LoginPath = "/login");


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("ReactPolicy");
app.MapFallbackToFile("/index.html");

app.Run();
