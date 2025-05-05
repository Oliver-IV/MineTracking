using mvts_report_service.services;
using mvts_report_service.utils.rabbitmq;

namespace mvts_report_service
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            IRabbitMQService rabbitMQService = new RabbitRpcService(new ReportService());
            await rabbitMQService.StartAsync();
        }
    }
}
