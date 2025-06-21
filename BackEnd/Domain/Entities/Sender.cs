using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities
{
    public class Sender : BaseEntity
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public long UserId { get; set; }
    }

}
