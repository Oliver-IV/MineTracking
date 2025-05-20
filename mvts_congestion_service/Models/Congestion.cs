using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvts_congestion_service.Models
{
    [Table("congestions")]
    public class Congestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        [MaxLength(100)]
        [Required]
        public string? Name { get; set; }
        [Column("latitude")]
        [Required]
        public double Lat { get; set; }
        [Column("longitude")]
        [Required]
        public double Lng { get; set; }

        [Column("created_at", TypeName = "timestamp without time zone")]
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;


        [Column("type")]
        public CongestionType Type { get; set; } = CongestionType.Unknown;
    }
}
