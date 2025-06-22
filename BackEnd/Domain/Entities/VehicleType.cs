using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class VehicleType
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public DateTime RegDate { get; set; } = DateTime.UtcNow;
    }
}
