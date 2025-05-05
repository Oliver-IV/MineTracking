using Grpc.Net.Client;
using mvts_congestion_service;
using mvts_report_service.dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace mvts_report_service.services.grpc
{
    internal class GrpcCongestion : IGrpcClient<IEnumerable<CongestionDTO>>
    {
        private  readonly GrpcChannel _channel;
        
        public GrpcCongestion() {
            _channel = GrpcChannel.ForAddress("http://localhost:5295");
        }
        public async ValueTask DisposeAsync()
        {
            if(_channel != null)
            {
                await _channel.ShutdownAsync();
            }
        }

        public async Task<IEnumerable<CongestionDTO>> GetDataAsync(ReportDetailsDTO detailsReport)
        {
            var optionDate = (int)detailsReport.DateType;
            var client = new CongestionService.CongestionServiceClient(_channel);
            ListCongestionDTO reply = await client.GetByDateAsync(
                              new GetCongestionByDateRequest { OptionDate = optionDate });

            return reply.Congestions;
        }
    }
}
