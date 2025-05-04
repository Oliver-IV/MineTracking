using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mvts_report_service.utils.rabbitmq
{
    internal interface IRabbitMQService : IAsyncDisposable
    {
        public Task StartAsync();
    }
}
