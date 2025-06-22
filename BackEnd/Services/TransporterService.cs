using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class TransporterService : ITransporterService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TransporterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse> AddTransporter(CreateTransporterRequestDto request)
        {
            var transporter = new Transporter
            {
                Email = request.Email,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                VehicleInfo = request.VehicleInfo,
                Status = "Intransit"
            };

            await _unitOfWork.ManageTransporterRepo.AddTransporter(transporter);

            return new ApiResponse("Transporter Added successfulyy", StatusEnum.Success, true);
        }

        public async Task<ApiResponse<IEnumerable<TransporterResponseDto>>> GetAllTransporters()
        {
            var result = await _unitOfWork.ManageTransporterRepo.GetAllTransporter();
            return new ApiResponse<IEnumerable<TransporterResponseDto>> { Data = result, Message = "Transporters retrieved successfully", Status = true, StatusCode = StatusEnum.Success };
        }
    }
}
