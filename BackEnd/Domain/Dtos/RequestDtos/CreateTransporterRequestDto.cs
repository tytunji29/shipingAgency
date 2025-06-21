using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Dtos.RequestDtos
{
    public class CreateTransporterRequestDto
    {
        public string Name { get; set; }
        public string VehicleInfo { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
