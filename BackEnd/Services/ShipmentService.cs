using Vubids.Core.Infranstructure.Common;
using Vubids.Core.Infranstructure.Common.Enums;
using MeetTech.Core.Utilities.Services.FileService;
using UtilitiesServices.Statics;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IServices;
using VubidsRespository;
using VubidsServices.Extensions;
using Microsoft.Extensions.Configuration;

namespace VubidsServices
{
    public class ShipmentService : IShipmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        private readonly IAuthService _authService;
        private readonly IUploadFileService _uploadFileService;
        public ShipmentService(IUnitOfWork unitOfWork, IConfiguration config, IAuthService authService, IUploadFileService uploadFileService)
        {
            _unitOfWork = unitOfWork;
            _config = config;
            _authService = authService;
            _uploadFileService = uploadFileService;
        }

        public async Task<ApiResponse> CreateShipment(CreateShipmentRequestDto request)
        {
            var loggedInUser = await _authService.ValidateRequest();
            if (loggedInUser == null)
                return new ApiResponse("Invalid User", StatusEnum.Unauthorised, false);
            var Email = loggedInUser.Email;

            var customer = await _unitOfWork.ManageUserRepo.GetAuthUserByEmail(Email);
            if (customer == null)
                return new ApiResponse("User not found", StatusEnum.NoRecordFound, false);

            var imgPath = SaveImages(request.ItemsRequest.ImageUrl);

            var shipmentId = "SHIP" + CustomizeCodes.GenerateOTP(6);

            var shipment = new Shipment
            {
                VehicleTypeId = request.ItemsRequest.VehicleTypeId,
                ItemId = request.ItemsRequest.ItemCategoryId,
                ItemTypeId = request.ItemsRequest.ItemTypeId,
                Length = request.ItemsRequest.Length,
                Weight = request.ItemsRequest.Weight,
                Height = request.ItemsRequest.Height,
                Quantity = request.ItemsRequest.Quantity,
                ShipmentId = shipmentId,
                Status = "In-Transit",
                ImageUrl = imgPath,
                Instructions = request.ItemsRequest.Instructions,
                UserId = customer.Id,
            };
            await _unitOfWork.ManageShipmentRepo.AddshipmentAsync(shipment);

            var deliveryPickup = new DeliveryPickup
            {
                PickUpAddress = request.DeliveryPickupRequest.PickUpAddress,
                DeliveryAddress = request.DeliveryPickupRequest.DeliveryAddress,
                PickupDate = request.DeliveryPickupRequest.PickupDate,
                DeliveryDate = request.DeliveryPickupRequest.DeliveryDate,
                PickupLongitude = request.DeliveryPickupRequest.PickupLongitude,
                PickupLatitude = request.DeliveryPickupRequest.PickupLatitude,
                DeliveryLongitude = request.DeliveryPickupRequest.DeliveryLongitude,
                DeliveryLatitude = request.DeliveryPickupRequest.DeliveryLatitude,
                ShipmentId = shipment.Id
            };
            await _unitOfWork.ManageDeliveryPickupRepo.AddPackage(deliveryPickup);
            WhatsappNotification whatsappNotification = new WhatsappNotification(_config);
            whatsappNotification.SendAsync(
                body: $"Your, New Shipment Created with ID: {shipmentId}. Pickup Address: {deliveryPickup.PickUpAddress}, Delivery Address: {deliveryPickup.DeliveryAddress}",
                url: "http://localhost:3000/",
                to: loggedInUser.PhoneNumber
            ).GetAwaiter().GetResult();
            return new ApiResponse("Shipment Created Successfully", StatusEnum.Success, true);
        }

        public async Task<ApiResponse<IEnumerable<ShipmentResponseDto>>> GetShipments(string? status)
        {
            var result = await _unitOfWork.ManageShipmentRepo.GetShipments(status);
            return new ApiResponse<IEnumerable<ShipmentResponseDto>> { Data = result, Message = "Shipments retrieved successfully", Status = true, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>>> GetShipments()
        {
            var result = new List<ShipmentResponsForLandingeDto>();
            var loggedInUser = await _authService.ValidateRequest();
            if (loggedInUser.IsCompany == "Yes")
            {
                var shipments = await _unitOfWork.ManageShipmentRepo.GetShipmentsLanding();

                var finalShipments = shipments.Where(o => o.Status == "In-Transit").ToList();
                result = shipments.Select(shipment => new ShipmentResponsForLandingeDto
                {
                    ShipmentId = shipment.ShipmentId,
                    TransporterId = shipment.TransporterId,
                    From = shipment.From,
                    To = shipment.To,
                    TimeCreated = shipment.TimeCreated,
                    Quote = "",
                    Customer = shipment.Customer,
                    Status = shipment.Status,
                    PickupDate = shipment.PickupDate,
                    DeliveryDate = shipment.DeliveryDate,
                    Item = shipment.Item,
                    AsBidded= shipment.Quotes.Count>0 ? "Yes" : "No",
                    Quotes = shipment.Quotes
                }).ToList();
            }
            else
            {
                var shipments = await _unitOfWork.ManageShipmentRepo.GetShipmentsLanding();
                var finalShipments= shipments.Where(o => o.UserId.Trim() == loggedInUser.UserId.Trim()).ToList();
                result = finalShipments.Select(shipment => new ShipmentResponsForLandingeDto
                {
                    ShipmentId = shipment.ShipmentId,
                    TransporterId = shipment.TransporterId,
                    From = shipment.From,
                    To = shipment.To,
                    TimeCreated = shipment.TimeCreated,
                    Quote = "",
                    Customer = shipment.Customer,
                    Status = shipment.Status,
                    PickupDate = shipment.PickupDate,
                    DeliveryDate = shipment.DeliveryDate,
                    Item = shipment.Item,
                    Quotes = shipment.Quotes
                }).ToList();
            }
            return new ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>> { Data = result, Message = "Shipments retrieved successfully", Status = true, StatusCode = StatusEnum.Success };
        }

        private string SaveImages(string? fileContent)
        {
            string imagePath = "https://res.cloudinary.com/lomee31/image/upload/v1734120180/FesPrisFood/CourseItem_pyydy0.jpg";
            if (fileContent is not null)
            {
                var uploadImage = _uploadFileService.UploadCloudinaryFile(fileContent).GetAwaiter().GetResult();
                if (uploadImage.FileUrl != "NotV")
                {
                    imagePath = uploadImage.FileUrl;
                }
            }
            return imagePath;
        }
    }
}
