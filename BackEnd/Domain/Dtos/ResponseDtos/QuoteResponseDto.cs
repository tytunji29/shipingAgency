using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.ResponseDtos
{
    public class QuoteResponseDto
    {
        public string ShipmentId { get; set; }
        public string QuoteId { get; set; }
        public string Transporter { get; set; }
        public string Quote { get; set; }
        public string DateSubmitted { get; set; }
        public string Status { get; set; }
    }
}
