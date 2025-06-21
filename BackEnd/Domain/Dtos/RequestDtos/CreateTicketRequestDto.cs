using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Dtos.RequestDtos
{
    public class CreateTicketRequestDto
    {
        public string Subject { get; set; }
        public string Description { get; set; }
    }
}
