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

// Aplicar migraciones al inicio
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();

        // Intentar varias veces por si la base de datos aún no está lista
        var retry = 0;
        var maxRetries = 10;
        Console.WriteLine("Intentando aplicar migraciones a la base de datos...");

        while (retry < maxRetries)
        {
            try
            {
                context.Database.Migrate();
                Console.WriteLine("Migración de base de datos aplicada con éxito");
                break; // Si tiene éxito, sal del bucle
            }
            catch (Exception ex)
            {
                retry++;
                if (retry >= maxRetries)
                {
                    Console.WriteLine($"No se pudo migrar la base de datos después de {maxRetries} intentos. Último error: {ex.Message}");
                    throw;
                }

                Console.WriteLine($"Error al migrar la base de datos (intento {retry}/{maxRetries}): {ex.Message}");
                // Espera antes de reintentar
                Thread.Sleep(5000); // 5 segundos
            }
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Error al aplicar las migraciones");
        throw;
    }
}


// Configure the HTTP request pipeline.
app.MapGrpcService<CongestionGrpcService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
