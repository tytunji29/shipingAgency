using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface ISupportService
    {
        Task<ApiResponse<IEnumerable<SupportResponseDto>>> GetAll();
        Task<ApiResponse> SubmitTicket(CreateTicketRequestDto request, string email);
    }
}
