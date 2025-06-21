using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class DeliveryPickup : BaseEntity
    {
        public long ShipmentId { get; set; }
        public string PickUpAddress { get; set; }
        public string DeliveryAddress { get; set; }
        public string PickupDate { get; set; }
        public string DeliveryDate { get; set; }
        public decimal? PickupLongitude { get; set; }
        public decimal? PickupLatitude { get; set; }
        public decimal? DeliveryLongitude { get; set; }
        public decimal? DeliveryLatitude { get; set; }
    }
}
