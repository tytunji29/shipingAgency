using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IVehicleTypeService
    {
        Task<ApiResponse<IEnumerable<VehicleType>>> GetAll();
        Task<ApiResponse> AddVehicle(string name);
    }
}
