﻿using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
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
        [HttpPost("rate-rider")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RateRider([FromBody] RateRiderRequestDto request)
        {
            var response = await _shipmentService.RateRider(request);
            return ResponseCode(response);
        }

        [HttpGet("get-all-shipment")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll(string? status)
        {
            var response = await _shipmentService.GetShipments(status);
            return ResponseCode(response);
        }
        [HttpGet("get-all-shipment-landingpaginated")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllLanding(int page, int pageSize, int source)
        {
            var response = await _shipmentService.GetShipments(page, pageSize, source);
            return ResponseCode(response);
        }
        [HttpGet("get-all-shipment-landing")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllLanding()
        {
            var response = await _shipmentService.GetShipments();
            return ResponseCode(response);
        }
        [HttpGet("get-lastest-shipment")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ShipmentResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetMostRecent()
        {
            var response = await _shipmentService.GetShipment();
            return ResponseCode(response);
        }
    }
}
