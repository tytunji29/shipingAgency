using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class CustomerAcceptedTransporter : BaseEntity
    {
        public string Name { get; set; }
        public long ShipmentId { get; set; }
        public string VehicleInfo { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }
    }
}
