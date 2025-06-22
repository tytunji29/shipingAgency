using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
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
