using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        public PaymentService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
        }

        public async Task<ApiResponse<IEnumerable<PaymentHistoryResponseDto>>> GetPaymentHistory(string? status)
        {
            var loggedInUser = await _authService.ValidateRequest();
            if (loggedInUser == null)
                return new ApiResponse<IEnumerable<PaymentHistoryResponseDto>> { Message = "Invalid User", Status = false, StatusCode = StatusEnum.Unauthorised };

            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);
            if (customer == null)
                return new ApiResponse<IEnumerable<PaymentHistoryResponseDto>> { Message = "User not found", Status = false, StatusCode = StatusEnum.NoRecordFound };

            var paymentHistory = await _unitOfWork.ManagePaymentRepo.GetPaymentsHistory(customer.UserId, status);
            if (paymentHistory == null)
                return new ApiResponse<IEnumerable<PaymentHistoryResponseDto>> { Message = "No payment history found", StatusCode = StatusEnum.NoRecordFound, Status = false };

            var response = paymentHistory.Select(payment => new PaymentHistoryResponseDto
            {
                PaymentId = payment.PaymentId,
                Date = payment.TimeCreated.ToString(),
                Status = payment.Status,
                PaymentMethod = payment.PaymentMethod,
                ShipmemtId = payment.ShipmentId,
                Receiver = payment.Receiver,
                DeliveryAddress = payment.DeliveryAddress,
                Amount = payment.Amount.ToString(),
            }).ToList();

            return new ApiResponse<IEnumerable<PaymentHistoryResponseDto>>
            {
                Data = response,
                Message = "Payment history retrieved successfully",
                Status = true,
                StatusCode = StatusEnum.Success,
                TotalRecord = response.Count()
            };
        }

        public async Task<ApiResponse<PaymentHistoryResponseDto>> GetPayment(long Id)
        {
            var loggedInUser = await _authService.ValidateRequest();
            if (loggedInUser == null)
                return new ApiResponse<PaymentHistoryResponseDto> { Message = "Invalid User", Status = false, StatusCode = StatusEnum.Unauthorised };

            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);
            if (customer == null)
                return new ApiResponse<PaymentHistoryResponseDto> { Message = "User not found", StatusCode = StatusEnum.Failed, Status = false };

            var getPayment = await _unitOfWork.ManagePaymentRepo.GetByPaymentIdAsync(customer.UserId, Id);

            if (getPayment == null || getPayment.UserId != customer.UserId)
                return new ApiResponse<PaymentHistoryResponseDto> { Message = "Payment not found", StatusCode = StatusEnum.NoRecordFound, Status = false };
            
            var response = new PaymentHistoryResponseDto
            {
                PaymentId = getPayment.PaymentId,
                Date = getPayment.TimeCreated.ToString(),
                Status = getPayment.Status,
                PaymentMethod = getPayment.PaymentMethod,
                ShipmemtId = getPayment.ShipmentId,
                Receiver = getPayment.Receiver,
                Amount = getPayment.Amount.ToString(),
                DeliveryAddress = getPayment.DeliveryAddress,
            };
            return new ApiResponse<PaymentHistoryResponseDto> { Message = "Payment retrieved successfully", Status = true, StatusCode = StatusEnum.Success, Data = response };
        }

        public async Task<ApiResponse> AddPaymentDetails(AddCustomerCardRequestDto request)
        {
            var loggedInUser = await _authService.ValidateRequest();
            var customerUser = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);

            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(customerUser.Email);
            if (customer == null)
                return new ApiResponse("User not found", StatusEnum.Failed, false);
            var card = new CustomerCard
            {
                Name = request.Name,
                CardNumber = request.CardNumber,
                CVV = request.CVV,
                ExpiryDate = request.Expiry,
                UserId = customer.UserId
            };

            await _unitOfWork.ManagePaymentRepo.Add(card);

            return new ApiResponse("Payment details added successfully", StatusEnum.Success, true);
        }
    }
}
