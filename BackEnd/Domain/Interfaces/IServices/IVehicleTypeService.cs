using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IVehicleTypeService
    {
        Task<ApiResponse<IEnumerable<VehicleType>>> GetAll();
        Task<ApiResponse> AddVehicle(string name);
    }
}
