using Microsoft.EntityFrameworkCore;
using mtvs_shipment_service.Repositories;
using mtvs_shipment_service.Services;
using mtvs_shipment_service.Setting;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();


builder.Services.AddGrpc();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<ShipmentGrpcService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();

