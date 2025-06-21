using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageShipmentRepo
    {
        Task AddshipmentAsync(Shipment request);
        Task<IEnumerable<Shipment>> GetShipments();
        Task<Shipment> GetShipment(string shipId);
        Task<IEnumerable<ShipmentResponsForLandingeDto>> GetShipmentsLanding();
        Task<IEnumerable<ShipmentResponseDto>> GetShipments(string? status);
    }
}
