using mtvs_shipment_service.Models;
namespace mtvs_shipment_service.Repositories
{
    public interface IShipmentRepository 
    {
        Task<Shipment> Create(Shipment shipment);
        Task<Shipment?> FindById(int shipmentId);
        Task<IEnumerable<Shipment>> GetAll();
        Task<IEnumerable<Shipment>> GetAllByDate(int option);
    }
}
