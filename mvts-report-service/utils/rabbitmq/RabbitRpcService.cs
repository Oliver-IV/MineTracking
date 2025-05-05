using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using mvts_report_service.services;

namespace mvts_report_service.utils.rabbitmq
{
    internal class RabbitRpcService : IRabbitMQService
    {
        private readonly IConnectionFactory _connectionFactory;
        private IConnection? _connection;
        private IChannel? _channel;
        private readonly IReportService _reportService;
        const string QUEUE_NAME = "report_request_queue";
        public RabbitRpcService(IReportService reportService)
        {
            _reportService = reportService;
            _connectionFactory = new ConnectionFactory { HostName = "localhost" };
        }


        public async Task StartAsync()
        {
            _connection = await _connectionFactory.CreateConnectionAsync();
            _channel = await _connection.CreateChannelAsync();

            await _channel.QueueDeclareAsync(queue: QUEUE_NAME, durable: true, exclusive: false,
                autoDelete: false, arguments: null);

            await _channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1, global: false);

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (object sender, BasicDeliverEventArgs ea) =>
            {
                AsyncEventingBasicConsumer cons = (AsyncEventingBasicConsumer)sender;
                IChannel ch = cons.Channel;
                string response = string.Empty;

                byte[] body = ea.Body.ToArray();
                IReadOnlyBasicProperties props = ea.BasicProperties;
                var replyProps = new BasicProperties
                {
                    CorrelationId = props.CorrelationId
                };

                try
                {
                    Console.WriteLine("Process request");
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(message);
                    response = await _reportService.GenerateReport(message);
                    Console.WriteLine($"Request processed");
                    
                }
                catch (Exception e)
                {
                    Console.WriteLine($" [.] {e.Message}");
                    response = string.Empty;
                }
                finally
                {
                    var responseBytes = Encoding.UTF8.GetBytes(response);
                    await ch.BasicPublishAsync(exchange: string.Empty, routingKey: props.ReplyTo!,
                        mandatory: true, basicProperties: replyProps, body: responseBytes);
                    await ch.BasicAckAsync(deliveryTag: ea.DeliveryTag, multiple: false);
                }
            };

            await _channel.BasicConsumeAsync(QUEUE_NAME, false, consumer);
            Console.WriteLine(" [x] Awaiting RPC requests");
            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }

        public async ValueTask DisposeAsync()
        {
            if (_channel != null && _channel.IsOpen)
            {
                await _channel.CloseAsync();
                await _channel.DisposeAsync();
            }
            if (_connection != null && _connection.IsOpen)
            {
                await _connection.CloseAsync();
                await _connection.DisposeAsync();
            }
        }
    }
}
