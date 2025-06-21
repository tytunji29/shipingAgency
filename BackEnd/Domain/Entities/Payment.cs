using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class Payment : BaseEntity
    {
        public string UserId { get; set; } 
        public string PaymentId { get; set; }
        public string ShipmentId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string Receiver { get; set; }
        public string DeliveryAddress { get; set; }
    }
}
