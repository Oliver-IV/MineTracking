using mtvs_shipment_service.Models;
using mvts_shipment_service;

namespace mtvs_shipment_service.Mappers
{
    public static class ShipmentMap
    {
        public static ShipmentDTO ToDTO(this Shipment shipment)
        {
            return new ShipmentDTO
            {
                Id = shipment.Id,
                IdVehicle = shipment.IdVehicle,
                IdRoute = shipment.IdRoute,
                State = (int)shipment.State,
                Material = (int) shipment.Material,
                Quantity = shipment.Quantity,
                DateDelivered = shipment.DateDelivered.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            };
        }
        public static Shipment ToEntityFromCreate(this ShipmentCreateDTO entity)
        {
            return new Shipment
            {
                IdVehicle = entity.IdVehicle,
                IdRoute = entity.IdRoute,
                Material = (MaterialType)entity.Material,
                Quantity = entity.Quantity
            };
        }
    }
}
