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
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();

        // Intentar varias veces por si la base de datos a�n no est� lista
        var retry = 0;
        var maxRetries = 10;
        Console.WriteLine("Intentando aplicar migraciones a la base de datos...");

        while (retry < maxRetries)
        {
            try
            {
                context.Database.Migrate();
                Console.WriteLine("Migraci�n de base de datos aplicada con �xito");
                break; // Si tiene �xito, sal del bucle
            }
            catch (Exception ex)
            {
                retry++;
                if (retry >= maxRetries)
                {
                    Console.WriteLine($"No se pudo migrar la base de datos despu�s de {maxRetries} intentos. �ltimo error: {ex.Message}");
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
app.MapGrpcService<ShipmentGrpcService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();

