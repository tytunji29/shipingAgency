using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class Package : BaseEntity
    {
        public long VehicleType { get; set; } 

        public string PickupAddress { get; set; }

        public long SenderId { get; set; }

        public long ReceiverId { get; set; }

        public long ItemId { get; set; }

        public string UserId { get; set; }

        public Status Status { get; set; } 
    }

    public enum Status
    {
        Active = 1,
        Pending, 
        InTransit,
        Delivered
    }
}
