using Grpc.Net.Client;
using mvts_report_service.dtos;
using mvts_shipment_service;

namespace mvts_report_service.services.grpc
{
    internal class GrpcShipment : IGrpcClient<IEnumerable<ShipmentDTO>>
    {
        private readonly GrpcChannel _channel;

        public GrpcShipment()
        {
            _channel = GrpcChannel.ForAddress("http://localhost:5299");
        }
        public async ValueTask DisposeAsync()
        {
            if (_channel != null)
            {
                await _channel.ShutdownAsync();
            }
        }

        public async Task<IEnumerable<ShipmentDTO>> GetDataAsync(ReportDetailsDTO reportDTO)
        {
            var optionDate = (int)reportDTO.DateType;
            var client = new ShipmentService.ShipmentServiceClient(_channel);
            ListShipmentDTO reply = await client.GetByDateAsync(
                              new GetShipmentByDateRequest { OptionDate = optionDate });
            return reply.Shipments;
        }
    }
}
