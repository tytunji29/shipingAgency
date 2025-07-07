using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.RequestDtos
{
    public class CreateTransporterRequestDto
    {
        public string Name { get; set; }
        public string VehicleInfo { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class LocationDto
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
        public DateTime Timestamp { get; set; }
    }

}
