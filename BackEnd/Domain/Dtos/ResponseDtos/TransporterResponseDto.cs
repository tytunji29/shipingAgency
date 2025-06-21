using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Dtos.ResponseDtos
{
    public class TransporterResponseDto
    {
        public string Transporter { get; set; }
        public string ShipmentId { get; set; }
        public string VehicleInfo { get; set; }
        public string EstimatedDelivery { get; set; }
        public string Status { get; set; }
        public string Reviews { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
