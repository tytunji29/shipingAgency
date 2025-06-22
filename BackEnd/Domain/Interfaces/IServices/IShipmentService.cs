using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IShipmentService
    {
        Task<ApiResponse> CreateShipment(CreateShipmentRequestDto request);
        Task<ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>>> GetShipments();
        Task<ApiResponse<IEnumerable<ShipmentResponseDto>>> GetShipments(string? status);
    }
}
