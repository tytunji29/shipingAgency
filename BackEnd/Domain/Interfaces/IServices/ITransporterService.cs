using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface ITransporterService
    {
        Task<ApiResponse> AddTransporter(CreateTransporterRequestDto request);
        Task<ApiResponse<IEnumerable<TransporterResponseDto>>> GetAllTransporters();
    }
}
