using Microsoft.EntityFrameworkCore;
using mtvs_shipment_service.Models;

namespace mtvs_shipment_service.Setting;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Shipment> Shipments { get; set; } = null!;

    
}
