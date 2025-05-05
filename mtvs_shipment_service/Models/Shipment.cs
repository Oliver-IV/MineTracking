using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mtvs_shipment_service.Models
{
    [Table("shipments")]
    public class Shipment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_vehicle")]
        public int IdVehicle { get; set; }

        [Column("id_route")]
        public int IdRoute { get; set; }

        [Column("state")]
        public State State { get; set; } = State.COMPLETED;

        [Column("material")]
        public MaterialType Material { get; set; } = MaterialType.GOLD;

        [Column("quantity")]
        public double Quantity { get; set; }
        [Column("date_delivered", TypeName = "timestamp without time zone")]
        public DateTime DateDelivered { get; set; } = DateTime.Now;
    }
}
