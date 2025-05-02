using mvts_congestion_service.Models;
using System.Runtime.CompilerServices;

namespace mvts_congestion_service.Mappers
{
    public static class CongestionMap
    {
        public static Congestion ToEntityFromCreate(this CongestionCreateDTO dto)
        {
            return new Congestion()
            {
                Lat = dto.Lat,
                Lng = dto.Lng,
                Name = dto.Name,
            };
        }
        public static CongestionDTO ToDTO(this Congestion entity)
        {
            return new CongestionDTO()
            {
                Id = entity.Id,
                Name = entity.Name,
                Lat = entity.Lat,
                Lng = entity.Lng,
                CreatedAt = entity.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                //Type = entity.Type.ToString(),
            };
        }

    }
}
