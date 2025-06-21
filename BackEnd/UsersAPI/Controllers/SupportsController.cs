using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Interfaces.IServices;
using VubidsServices;

namespace VubUsersAPI.Controllers
{
    [ApiController]
    [AllowAnonymous]
    public class SupportsController : APIBaseController
    {
        private readonly ISupportService _supportService;

        public SupportsController(ISupportService supportService)
        {
                _supportService = supportService;
        }

        [HttpGet("get-all-transporters")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<SupportResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll()
        {
            var response = await _supportService.GetAll();
            return ResponseCode(response);
        }

        [HttpPost("submit-ticket")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTicket(CreateTicketRequestDto request)
        {//string email
            var response = await _supportService.SubmitTicket(request, "");
            return ResponseCode(response);
        }
    }
}
