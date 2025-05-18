namespace mvts_congestion_service.Setting
{
    /// <summary>
    /// Represents the settings for RabbitMQ connection.
    /// </summary>
    public class RabbitSettings
    {
        public string Host { get; set; } = "localhost";
        public string Port { get; set; } = "5672";
        public string CongestionExchangeName { get; set; }

    }
}
