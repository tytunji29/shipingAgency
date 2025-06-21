using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IShipmentService
    {
        Task<ApiResponse> CreateShipment(CreateShipmentRequestDto request);
        Task<ApiResponse<IEnumerable<ShipmentResponsForLandingeDto>>> GetShipments();
        Task<ApiResponse<IEnumerable<ShipmentResponseDto>>> GetShipments(string? status);
    }
}
