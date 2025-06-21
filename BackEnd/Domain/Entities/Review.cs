using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class Review : BaseEntity
    {
        public long TransporterId { get; set; }
        public string ShipmentId { get; set; }
        public string Comments { get; set; }
        //public int Rating { get; set; }
        public DateTime ReviewDate { get; set; }
        public string UserId { get; set; }
    }
}
