using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManageTransporterRepo
    {
        Task<IEnumerable<TransporterResponseDto>> GetAllTransporter();
        Task AddTransporter(Transporter request);
    }
}
