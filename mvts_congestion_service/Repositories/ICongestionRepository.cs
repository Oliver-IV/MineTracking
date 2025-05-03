using mvts_congestion_service.Models;

namespace mvts_congestion_service.Repositories
{
    public interface ICongestionRepository
    {
        Task<Congestion> Create(Congestion congestion);
        Task<Congestion?> FindById(int congestionId);
        Task<IEnumerable<Congestion>> GetAll();
        Task<IEnumerable<Congestion>> GetAllByDate(int option);
    }
}
