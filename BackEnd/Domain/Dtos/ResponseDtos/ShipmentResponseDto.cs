using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.ResponseDtos
{
    public class ShipmentResponseDto
    {
        public string ShipmentId { get; set; }
        public string Transporter { get; set; }
        public string Pickup { get; set; }
        public string Destination { get; set; }
        public string Quote { get; set; }
        public string PickupDate { get; set; }
        public string DeliveryDate { get; set; }
        public string Status { get; set; }

    }
    public class ShipmentResponsForLandingeDto
    {
        public string AsBidded { get; set; }
        public string ShipmentId { get; set; }
        public string UserId { get; set; }
        public string TransporterId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Quote { get; set; }
        public string PickupDate { get; set; }
        public string TimeCreated { get; set; }
        public string DeliveryDate { get; set; }
        public string Status { get; set; }
        public string Customer { get; set; }
        public ItemCat Item { get; set; }
        public List<ReturnQuotes> Quotes { get; set; }

    }

    public class ReturnQuotes
    {
        public string QuoteId { get; set; }
        public string ShipmentId { get; set; }
        public string TransporterId { get; set; }
        public string Amount { get; set; }
        public string DateSubmitted { get; set; }
    }
    public class ItemCat
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
