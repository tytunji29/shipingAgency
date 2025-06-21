using Vubids.Core.Infranstructure.Common;
using Vubids.Core.Infranstructure.Common.Enums;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IServices;
using VubidsRespository;

namespace VubidsServices
{
    public class VehicleTypeService : IVehicleTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public VehicleTypeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse<IEnumerable<VehicleType>>> GetAll()
        {
            var result = await _unitOfWork.ManageVehicleRepo.GetAll();
            return new ApiResponse<IEnumerable<VehicleType>> { StatusCode = StatusEnum.Success, Status = true, Message = "VehicleTypes fetched successfully.", Data = result }; 
        }

        public async Task<ApiResponse> AddVehicle(string name)
        {
            await _unitOfWork.ManageVehicleRepo.AddVehicle(name);
            return new ApiResponse("Vehicle Added Successfully", StatusEnum.Success, true);
        }
    }

}
