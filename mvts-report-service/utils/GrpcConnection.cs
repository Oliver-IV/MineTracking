using Grpc.Net.Client;
using mvts_report_service.dtos;
using mvts_report_service.services.grpc;


namespace mvts_report_service.utils
{
    internal class GrpcConnection : IAsyncDisposable
    {
        private static GrpcChannel? _channel;
        private GrpcConnection()
        {

        }

        public string SelectReport(ReportDetailsDTO dto)
        {
            if (dto.ReportType == ReportTypeDTO.CONGESTION)
            {
                var e = new GrpcCongestion();
                
                return "PDF Report";
            }
            if (dto.ReportType == ReportTypeDTO.SHIPMENT)
            {
                var e = new GrpcShipment();

                return "Excel Report";
            }

            return "Unknown Report Type";
        }


        public ValueTask DisposeAsync()
        {
            throw new NotImplementedException();
        }
    }
}
