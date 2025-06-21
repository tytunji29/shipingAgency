using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IPaymentService
    {
        Task<ApiResponse<IEnumerable<PaymentHistoryResponseDto>>> GetPaymentHistory(string status);
        Task<ApiResponse<PaymentHistoryResponseDto>> GetPayment(long Id);
        Task<ApiResponse> AddPaymentDetails(AddCustomerCardRequestDto request);
    }
}
