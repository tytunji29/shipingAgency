using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class RateRider : BaseEntity
    {
        public string Rating { get; set; }
        public string TransporterId { get; set; }
        public string TransId { get; set; }
        public string ShipmentId { get; set; }
    }
    public class Shipment : BaseEntity
    {
        public string UserId { get; set; }
        public long VehicleTypeId { get; set; }
        public long ItemId { get; set; }
        public long ItemTypeId { get; set; }
        public int Length { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public string ImageUrl { get; set; }
        public string Instructions { get; set; }
        public string Status { get; set; }
        public string ShipmentId { get; set; }
        public string? TransporterId { get; set; }
    }
}
