using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IShipmentService
    {
        Task<ApiResponse> CreateShipment(CreateShipmentRequestDto request);
        Task<ApiResponse> RateRider(RateRiderRequestDto request);
        Task<ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>>> GetShipments();
        Task<ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>>> GetShipments(int pageSize, int pageNumber, int source);
        Task<ApiResponse<IEnumerable<ShipmentResponseDto>>> GetShipments(string? status);
        Task<ApiResponse<ShipmentDto>> GetShipment();
    }
}
