using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class PackageService : IPackageService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PackageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse> SendPackageAsync(SendPackageRequest request)
        {
            var sender = new Sender
            {
                FullName = request.Sender.FullName,
                Email = request.Sender.Email,
                Address = request.Sender.Address
            };
            await _unitOfWork.ManagePackageRepo.AddSender(sender);

            var receiver = await _unitOfWork.ManagePackageRepo.GetReceiverByPhoneNumber(request.Receiver.PhoneNumber);
            if (receiver == null)
            {
                receiver = new Receiver
                {
                    FullName = request.Receiver.FullName,
                    PhoneNumber = request.Receiver.PhoneNumber,
                    Address = request.Receiver.Address,
                    UserId = request.UserId
                };
                await _unitOfWork.ManagePackageRepo.AddReceiver(receiver);
            }

            var item = new Item
            {
                Category = request.Item.Category,
                Weight = request.Item.Weight,
                Quantity = request.Item.Quantity,
                Value = request.Item.Value,
                ImageUrl = request.Item.ImageUrl,
                UserId = request.UserId
            };
            await _unitOfWork.ManagePackageRepo.AddItems(item);

            // Create the package
            var package = new Package
            {
                VehicleType = request.VehicleId,
                PickupAddress = request.PickupAddress,
                SenderId = sender.Id,
                ReceiverId = receiver.Id,
                ItemId = item.Id,
                Status = Status.Active,
                UserId = request.UserId
            };

            await _unitOfWork.ManagePackageRepo.AddPackage(package);
            return new ApiResponse("Package added successfully.", StatusEnum.Success, true);
        }

        public async Task<ApiResponse<IEnumerable<Package>>> GetAllActive()
        {
            var result = await _unitOfWork.ManagePackageRepo.GetActivePackages();
            return new ApiResponse<IEnumerable<Package>> { Data = result, Status = true, StatusCode = StatusEnum.Success, Message = "Active Packages retrieved successfully"};
        }

        public async Task<ApiResponse<IEnumerable<Package>>> GetAllPending()
        {
            var result = await _unitOfWork.ManagePackageRepo.GetPendingPackages();
            return new ApiResponse<IEnumerable<Package>> { Data = result, Status = true, StatusCode = StatusEnum.Success, Message = "Pending Packages retrieved successfully" };
        }
    }
}
