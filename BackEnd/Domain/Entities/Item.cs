using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class Item : BaseEntity
    {
        public string Category { get; set; }
        public string Weight { get; set; } 
        public int Quantity { get; set; }
        public decimal Value { get; set; } 
        public string ImageUrl { get; set; } 
        public string UserId { get; set; }
    }

}
