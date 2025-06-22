using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class ShipmentImage
    {
        public long Id { get; set; }
        public string ImagePath { get; set; }
        public string Instruct { get; set; }

    }
}
