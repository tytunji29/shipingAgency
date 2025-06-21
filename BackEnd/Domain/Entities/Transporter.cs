using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class Transporter : BaseEntity
    {
        public string Name { get; set; }
        public string? VehicleInfo { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string? Status { get; set; }
        public long ShipmentId { get; set; }
    }
}
