using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Dtos.RequestDtos
{
    public class CreateShipmentRequestDto
    {
        public ItemDetailsRequest ItemsRequest{ get; set; }
        public  DeliveryPickupDetailsRequest DeliveryPickupRequest { get; set; }
    }

    public  class ItemDetailsRequest
    {
        public long VehicleTypeId { get; set; }
        public long ItemCategoryId { get; set; }
        public long ItemTypeId { get; set; }
        public int Length { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public string Instructions { get; set; }
    }

    public  class DeliveryPickupDetailsRequest
    {
        public string PickUpAddress { get; set; }
        public string DeliveryAddress { get; set; }
        public string PickupDate { get; set; }
        public string DeliveryDate { get; set; }
        public decimal? PickupLongitude { get; set; }
        public decimal? PickupLatitude { get; set; }
        public decimal? DeliveryLongitude { get; set; }
        public decimal? DeliveryLatitude { get; set; }
    }

    public class ImageDetails
    {

    }
}
