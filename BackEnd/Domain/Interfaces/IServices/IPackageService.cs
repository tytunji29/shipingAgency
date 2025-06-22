using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IPackageService
    {
        Task<ApiResponse> SendPackageAsync(SendPackageRequest request);
        Task<ApiResponse<IEnumerable<Package>>> GetAllPending();
        Task<ApiResponse<IEnumerable<Package>>> GetAllActive();
    }
}
