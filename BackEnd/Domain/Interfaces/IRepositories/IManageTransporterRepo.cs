using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageTransporterRepo
    {
        Task<IEnumerable<TransporterResponseDto>> GetAllTransporter();
        Task AddTransporter(Transporter request);
    }
}
