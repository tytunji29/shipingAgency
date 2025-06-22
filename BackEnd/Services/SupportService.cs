using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class SupportService : ISupportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;

        public SupportService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
        }

        public async Task<ApiResponse<IEnumerable<SupportResponseDto>>> GetAll()
        {
            var supports = await _unitOfWork.ManageSupportRepo.GetAll();

            var result = supports.Select(support => new SupportResponseDto
            {
                Date = support.TimeCreated.ToString(),
                Comment = support.Subject,
                status = support.Status,

            });

            return new ApiResponse<IEnumerable<SupportResponseDto>> { Data = result.ToList(), Message = "Supports retrieved Successfully", Status = true, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse> SubmitTicket(CreateTicketRequestDto request, string email)
        {
             
            var loggedInUser =  await _authService.ValidateRequest();
            var user = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);
            if (user == null)
                return new ApiResponse("User not found", StatusEnum.Failed, false);

            var ticket = new Support
            {
                Subject = request.Subject,
                Description = request.Description,
                Status = "Pending",
                UserId = user.UserId
            };

            await _unitOfWork.ManageSupportRepo.Add(ticket);

            return new ApiResponse("Ticket submitted successfully", StatusEnum.Success, true);
        }
    }
}
