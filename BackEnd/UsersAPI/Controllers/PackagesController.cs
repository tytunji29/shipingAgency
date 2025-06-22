using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
{
    [AllowAnonymous]
    public class PackagesController : APIBaseController
    {
        private readonly IPackageService _packageService;
        public PackagesController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpPost("send-package")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SendPackage([FromBody] SendPackageRequest request)
        {
            var response = await _packageService.SendPackageAsync(request);
            return ResponseCode(response);
        }

        [HttpGet("get-active-package")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetActive()
        {
            var response = await _packageService.GetAllActive();
            return ResponseCode(response);
        }

        [HttpGet("get-pending-package")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPending()
        {
            var response = await _packageService.GetAllPending();
            return ResponseCode(response);
        }
    }
}
