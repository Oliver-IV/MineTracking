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
    }
}
