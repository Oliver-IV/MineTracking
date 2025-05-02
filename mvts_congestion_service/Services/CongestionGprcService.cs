using Grpc.Core;
using Microsoft.Extensions.Options;
using mvts_congestion_service.Mappers;
using mvts_congestion_service.Repositories;
using mvts_congestion_service.Setting;
using mvts_congestion_service.Utils.rabbitmq;

namespace mvts_congestion_service.Services
{
    public class CongestionGrpcService : CongestionService.CongestionServiceBase
    {
        private readonly ILogger<CongestionGrpcService> _logger;
        private readonly ICongestionRepository _congesRepo;
        private readonly IRabbitMQService _rabbitMQService;
        private readonly RabbitSettings _rabbitSettings;

        public CongestionGrpcService(ILogger<CongestionGrpcService> logger, ICongestionRepository repo,IRabbitMQService rabbitMQService,IOptions<RabbitSettings> rabbitSettings)
        {
            _logger = logger;
            _congesRepo = repo;
            _rabbitMQService = rabbitMQService;
            _rabbitSettings = rabbitSettings.Value;
        }

        public async  override Task<CongestionDTO> GetCongestionById(CongestionByIdDTO request, ServerCallContext context)
        {
            var entity = await _congesRepo.FindById(request.Id);
            Console.WriteLine(_rabbitSettings.Host);
            if (entity == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Congestion not found"));
            }
            return entity.ToDTO();
        }

        public async override Task<CongestionByIdDTO> CreateCongestion(CongestionCreateDTO request, ServerCallContext context)
        {
            var conges = request.ToEntityFromCreate();
            var entityCreated = await _congesRepo.Create(conges);

            entityCreated.ToDTO();
            await _rabbitMQService.PublishMessageAsync(_rabbitSettings.CongestionExchangeName, entityCreated.ToDTO());
            return new CongestionByIdDTO() { Id= entityCreated.Id };
        }

        public override async Task<ListCongestionDTO> GetAll(GetCongestionRequest request, ServerCallContext context)
        {
            var list = await _congesRepo.GetAll();


            return new ListCongestionDTO
            {
                Congestions =
                {
                    list.Select(c => c.ToDTO())
                }
            };
        }
    }
}
