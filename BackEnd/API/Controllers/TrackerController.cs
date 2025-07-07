using System.Text.Json;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Respository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> StoreLocation(string shipmentId, [FromBody] LocationDto entry)
        {
            await _trackingService.StoreLocationAsync(shipmentId, entry);
            return Ok(new { message = "Location stored successfully" });
        }

        [HttpGet("{shipmentId}/location")]
        public async Task<IActionResult> GetLatestLocation(string shipmentId)
        {
            var retrievedLocation = await _trackingService.GetLatestLocationAsync<LocationDto>(shipmentId);
            if (retrievedLocation == null)
                return NotFound(new { message = "No location found for this shipment" });

            return Ok(new { retrievedLocation });
        }
    }
}