using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
{
    [ApiController]
    public class TransportersController : APIBaseController
    {
        private readonly ITransporterService _transporterService;

        public TransportersController(ITransporterService transporterService)
        {
            _transporterService = transporterService;
        }

        [HttpGet("get-all-transporters")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<TransporterResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll()
        {
            var response = await _transporterService.GetAllTransporters();
            return ResponseCode(response);
        }

        [HttpPost("add-transporter")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create(CreateTransporterRequestDto request)
        {
            var response = await _transporterService.AddTransporter(request);
            return ResponseCode(response);
        }

    }
}
