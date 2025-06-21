using Microsoft.AspNetCore.Mvc;
using System.Net;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Interfaces.IServices;

namespace VubUsersAPI.Controllers
{
    [ApiController]
    public class ShipmentsController : APIBaseController
    {
        private readonly IShipmentService _shipmentService;
        public ShipmentsController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpPost("create-shipment")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateShipment([FromBody] CreateShipmentRequestDto request)
        {
            var response = await _shipmentService.CreateShipment(request);
            return ResponseCode(response);
        }

        [HttpGet("get-all-shipment")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll(string? status)
        {
            var response = await _shipmentService.GetShipments(status);
            return ResponseCode(response);
        }
        [HttpGet("get-all-shipment-landing")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllLanding()
        {
            var response = await _shipmentService.GetShipments();
            return ResponseCode(response);
        }
    }
}
