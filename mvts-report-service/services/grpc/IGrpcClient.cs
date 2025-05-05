using mvts_report_service.dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mvts_report_service.services.grpc
{
    internal interface IGrpcClient<T> : IAsyncDisposable
    {
        public Task<T> GetDataAsync(ReportDetailsDTO reportDTO);
    }
}
