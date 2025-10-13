using System.Net;
using System.Text.Json;
using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Dtos.ResponseDtos.Account;
using JetSend.Respository.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace JetSend.API.Controllers
{
    //[Route("api/[controller]")]
    [AllowAnonymous]
    [Route("app/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class TrackerController : APIBaseController
    {
        private readonly RedisTrackingService _trackingService;

        public TrackerController(RedisTrackingService trackingService)
        {
            _trackingService = trackingService;
        }

        [HttpPost("{shipmentId}/location")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> StoreLocation(string shipmentId, [FromBody] LocationDto entry)
        {
            await _trackingService.StoreLocationAsync(shipmentId, entry);
            var ret = new ApiResponse("Location Captured Successfully", StatusEnum.Success, true);
            return Ok(ret);
        }

        [HttpGet("{shipmentId}/location")]
        [ProducesResponseType(typeof(ApiResponse<LocationDto>), (int)HttpStatusCode.OK)]
        public async Task<ApiResponse<LocationDto>> GetLatestLocation(string shipmentId)
        {
            var retrievedLocation = await _trackingService.GetLatestLocationAsync<LocationDto>(shipmentId);
           
            return new ApiResponse<LocationDto>
            {
                Data = retrievedLocation,
                Message = "Shipments retrieved successfully",
                Status = true,
                StatusCode = StatusEnum.Success
            };
        }
    }
}