using Microsoft.EntityFrameworkCore;
using mvts_congestion_service.Repositories;
using mvts_congestion_service.Services;
using mvts_congestion_service.Setting;
using mvts_congestion_service.Utils.rabbitmq;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<RabbitSettings>(builder.Configuration.GetSection("RabbitSettings"));
builder.Services.AddScoped<ICongestionRepository, CongestionRepository>();
builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();

// Add services to the container.
builder.Services.AddGrpc();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<CongestionGrpcService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
