using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class Quotes : BaseEntity
    {
        public string QuoteId { get;set; }
        public string ShipmentId { get;set; }
        public string TransporterId { get; set; }
        public decimal Amount { get;set; }
        public string DateSubmitted { get; set; }
        public string Status { get; set; }
        public  bool IsAccepted { get; set; }
    }


    public class QuotesFm
    {
        public string ShipmentId { get; set; }
        public string Amount { get; set; }
    }
}
