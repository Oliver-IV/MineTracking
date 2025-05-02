using Microsoft.EntityFrameworkCore;
using mvts_congestion_service.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Congestion> Congestions { get; set; } = null!;
}
