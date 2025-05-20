using Microsoft.Extensions.Options;
using mvts_congestion_service.Setting;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace mvts_congestion_service.Utils.rabbitmq
{
    public class RabbitMQService : IRabbitMQService
    {
        private readonly ConnectionFactory _connectionFactory;
        private readonly RabbitSettings _rabbitSettings;
        private IConnection _connection;
        private IChannel _channel;

        public RabbitMQService(IOptions<RabbitSettings> rabbitSettings)
        {
            _rabbitSettings = rabbitSettings.Value;
            _connectionFactory = CreateConnectionFactory();
            CreateConnectionWithRabbit().ConfigureAwait(false).GetAwaiter().GetResult();
        }

        private ConnectionFactory CreateConnectionFactory()
        {
            return new ConnectionFactory
            {
                HostName = _rabbitSettings.Host,
                Port = 5672,
                UserName = _rabbitSettings.Username, 
                Password = _rabbitSettings.Password
            };
        }

        private async Task CreateConnectionWithRabbit()
        {
            _connection = await _connectionFactory.CreateConnectionAsync();
            _channel = await _connection.CreateChannelAsync();
        }

        public async Task PublishMessageAsync<T>(string exchangeName, T message)
        {
            await _channel.ExchangeDeclareAsync(exchange: exchangeName, type: ExchangeType.Fanout);

            var jsonMessage = JsonSerializer.Serialize(message);
            var body = Encoding.UTF8.GetBytes(jsonMessage);

            await _channel.BasicPublishAsync(
                exchange: exchangeName,
                routingKey: string.Empty,
                body: body
            );
        }

        /// <summary>
        /// Disposes the RabbitMQ connection and channel asynchronously, when the server is dispose.
        /// </summary>
        /// <returns></returns>
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
