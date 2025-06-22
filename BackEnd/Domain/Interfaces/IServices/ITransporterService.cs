using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface ITransporterService
    {
        Task<ApiResponse> AddTransporter(CreateTransporterRequestDto request);
        Task<ApiResponse<IEnumerable<TransporterResponseDto>>> GetAllTransporters();
    }
}
