using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IPackageService
    {
        Task<ApiResponse> SendPackageAsync(SendPackageRequest request);
        Task<ApiResponse<IEnumerable<Package>>> GetAllPending();
        Task<ApiResponse<IEnumerable<Package>>> GetAllActive();
    }
}
