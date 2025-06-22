using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface ISupportService
    {
        Task<ApiResponse<IEnumerable<SupportResponseDto>>> GetAll();
        Task<ApiResponse> SubmitTicket(CreateTicketRequestDto request, string email);
    }
}
