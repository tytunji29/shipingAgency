using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IPaymentService
    {
        Task<ApiResponse<IEnumerable<PaymentHistoryResponseDto>>> GetPaymentHistory(string status);
        Task<ApiResponse<PaymentHistoryResponseDto>> GetPayment(long Id);
        Task<ApiResponse> AddPaymentDetails(AddCustomerCardRequestDto request);
    }
}
