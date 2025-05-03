using Microsoft.EntityFrameworkCore;
using mtvs_shipment_service.Models;
using mtvs_shipment_service.Setting;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace mtvs_shipment_service.Repositories
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly AppDbContext _context;
        public ShipmentRepository(AppDbContext context) {
            _context = context;
         }
        public async Task<Shipment> Create(Shipment shipment)
        {
            _context.Shipments.Add(shipment);
            await _context.SaveChangesAsync();
            return shipment;
        }

        public async Task<Shipment?> FindById(int shipmentId)
        {
            var shipment = await _context.Shipments.FirstOrDefaultAsync(x => x.Id == shipmentId);

            return shipment;
        }

        public async Task<IEnumerable<Shipment>> GetAll()
        {
            return await _context.Shipments.ToListAsync();
        }

        public async Task<IEnumerable<Shipment>> GetAllByDate(int option)
        {
            switch (option)
            {
                case 1:
                    // Logs today
                    return await _context.Shipments
                        .Where(e => e.DateDelivered >= DateTime.Today && e.DateDelivered < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.DateDelivered)
                        .ToListAsync();
                case 2:
                    // Logs in the last 7 days (including today)
                    return await _context.Shipments
                        .Where(e => e.DateDelivered >= DateTime.Today.AddDays(-6) && e.DateDelivered < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.DateDelivered)
                        .ToListAsync();
                case 3:

                    // Logs in the last 4 weeks (including today)
                    return await _context.Shipments
                        .Where(e => e.DateDelivered >= DateTime.Today.AddDays(-27) && e.DateDelivered < DateTime.Today.AddDays(1))
                        .OrderByDescending(r => r.DateDelivered)
                        .ToListAsync();
                default:
                    throw new ArgumentException("Invalid option");
            }
        }
    }
}
