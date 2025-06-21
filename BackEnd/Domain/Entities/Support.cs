using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class Support : BaseEntity
    {
        public string Subject { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }
    }
}
