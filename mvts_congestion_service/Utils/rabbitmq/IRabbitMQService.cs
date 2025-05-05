namespace mvts_congestion_service.Utils.rabbitmq
{
    public interface IRabbitMQService : IAsyncDisposable
    {
        /// <summary>
        /// Asynchronously publishes a message to a RabbitMQ exchange with a fanout type.
        /// </summary>
        /// <typeparam name="T">The type of the message to publish.</typeparam>
        /// <param name="exchangeName">The name of the exchange to publish to.</param>
        /// <param name="message">The message object to publish.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task PublishMessageAsync<T>(string exchangeName, T message);

    }
}
