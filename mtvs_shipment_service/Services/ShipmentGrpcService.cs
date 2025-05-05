using Grpc.Core;
using mtvs_shipment_service.Mappers;
using mtvs_shipment_service.Repositories;
using mvts_shipment_service;

namespace mtvs_shipment_service.Services
{
    public class ShipmentGrpcService : ShipmentService.ShipmentServiceBase
    {
        
        private readonly IShipmentRepository _shipmentRepository;
        private readonly ILogger<ShipmentGrpcService> _logger;

        public ShipmentGrpcService(ILogger<ShipmentGrpcService> logger, IShipmentRepository shipmentRepository)
        {
            _logger = logger;
            _shipmentRepository = shipmentRepository;
        }

        public async override Task<ShipmentDTO> GetShipmentById(ShipmentByIdDTO request, ServerCallContext context)
        {
            var entity = await _shipmentRepository.FindById(request.Id);
            if (entity == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Shipment not found"));
            }
            return entity.ToDTO();
        }

        public async override Task<ShipmentByIdDTO> CreateShipment(ShipmentCreateDTO request, ServerCallContext context)
        {
            var conges = request.ToEntityFromCreate();
            var entityCreated = await _shipmentRepository.Create(conges);

            entityCreated.ToDTO();
            return new ShipmentByIdDTO() { Id = entityCreated.Id };
        }

        public override async Task<ListShipmentDTO> GetAll(EmptyMessage request, ServerCallContext context)
        {
            var list = await _shipmentRepository.GetAll();


            return new ListShipmentDTO
            {
                Shipments =
                {
                    list.Select(c => c.ToDTO())
                }
            };
        }

        public async override Task<ListShipmentDTO> GetByDate(GetShipmentByDateRequest request, ServerCallContext context)
        {
            var list = await _shipmentRepository.GetAllByDate(request.OptionDate);


            return new ListShipmentDTO
            {
                Shipments =
                {
                    list.Select(c => c.ToDTO())
                }
            };
        }
    }
}
