using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
using backend.Data;
using backend.Services;


// INITIALIZE API
var builder = WebApplication.CreateBuilder(args);

// GET BUILDER CONFIG
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
          options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// REGISTER SERVICES
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserTaskService>();


// CONFIGURE CORS
// 1) define a unique string
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 2) define allowed domains, in this case "http://example.com" and "*" = all
//    domains, for testing purposes only.
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
    builder =>
    {
      builder.WithOrigins("http://localhost:3000")
             .AllowAnyMethod()
             .AllowAnyHeader();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
// 3) use the capability
app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
