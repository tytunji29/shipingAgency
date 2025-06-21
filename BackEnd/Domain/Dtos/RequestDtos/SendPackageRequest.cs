using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Dtos.RequestDtos
{
    public class SendPackageRequest
    {
        public long VehicleId { get;set; }
        public string PickupAddress { get; set; }
        public string UserId { get; set; }
        public SenderInfo Sender { get; set; }
        public ReceiverInfo Receiver { get; set; }
        public ItemInfo Item { get; set; }
    }

    public class SenderInfo
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Address { get; set; }
    }

    public class ReceiverInfo
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }
    }

    public class ItemInfo
    {
        [Required]
        public string Category { get; set; }

        [Required]
        public string Weight { get; set; } // e.g., "5kg"

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Value { get; set; }

        [Required]
        public string ImageUrl { get; set; } // URL of item image
    }

}
