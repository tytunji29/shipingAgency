using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManageShipmentRepo
    {
        Task<bool> UpdateShipmentMap(string shipId);
        Task AddshipmentAsync(RateRider request);
        Task AddshipmentAsync(Shipment request);
        Task<IEnumerable<Shipment>> GetShipments();
        Task<Shipment> GetShipment(string shipId);
        Task<IEnumerable<ShipmentResponsForLandingeDto>> GetShipmentsLanding();
        Task<ShipmentDto?> GetShipmentLatest(string userId);
        Task<IEnumerable<ShipmentResponseDto>> GetShipments(string? status);
        Task<List<ShipmentAfterPaymentDto>> GetShipmentsAfterPaymentRawAsync(string userId, string role);
    }
}
