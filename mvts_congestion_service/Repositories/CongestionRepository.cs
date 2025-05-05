using Microsoft.EntityFrameworkCore;
using mvts_congestion_service.Models;

namespace mvts_congestion_service.Repositories
{
    public class CongestionRepository : ICongestionRepository
    {
        private readonly AppDbContext _context;
        public CongestionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Congestion> Create(Congestion congestion)
        {
            _context.Congestions.Add(congestion);
            await _context.SaveChangesAsync();
            return congestion;
        }

        public async Task<Congestion?> FindById(int congestionId)
        {
            var congestion = await _context.Congestions.FirstOrDefaultAsync(c => c.Id == congestionId);
            return congestion;
        }

        public async Task<IEnumerable<Congestion>> GetAll()
        {
            return await _context.Congestions.ToListAsync();
        }

        public async Task<IEnumerable<Congestion>> GetAllByDate(int option)
        {

            switch (option)
            {
                case 1:
                    // Logs today
                    return await _context.Congestions
                        .Where(e => e.CreatedAt >= DateTime.Today && e.CreatedAt < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.CreatedAt)
                        .ToListAsync();
                case 2:
                    // Logs in the last 7 days (including today)
                    return await _context.Congestions
                        .Where(e => e.CreatedAt >= DateTime.Today.AddDays(-6) && e.CreatedAt < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.CreatedAt)
                        .ToListAsync();
                case 3:
                    
                    // Logs in the last 4 weeks (including today)
                    return await _context.Congestions
                        .Where(e => e.CreatedAt >= DateTime.Today.AddDays(-27) && e.CreatedAt < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.CreatedAt)
                        .ToListAsync();
                default:
                    throw new ArgumentException("Invalid option");
            }
        }
    }
}
