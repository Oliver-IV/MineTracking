namespace mvts_congestion_service.Setting
{
    /// <summary>
    /// Represents the settings for RabbitMQ connection.
    /// </summary>
    public class RabbitSettings
    {
        public string Host { get; set; } = "rmq";
        public string Port { get; set; } = "5672";
        public string CongestionExchangeName { get; set; } = "congestion_exchange";


        public string Username { get; set; }  = "user";
        public string Password { get; set; }  = "password";



    }
}
