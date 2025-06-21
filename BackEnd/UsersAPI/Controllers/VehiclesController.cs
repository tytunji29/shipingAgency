using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Interfaces.IServices;
using VubidsServices;

namespace VubUsersAPI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    public class VehiclesController : APIBaseController
    {
        private readonly IVehicleTypeService _vehicleTypeService;

        public VehiclesController(IVehicleTypeService vehicleTypeService)
        {
            _vehicleTypeService = vehicleTypeService;
        }

        [HttpPost("add-vehicle")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SendPackage(string name)
        {
            var response = await _vehicleTypeService.AddVehicle(name);
            return ResponseCode(response);
        }

        [HttpGet("get-all-vehicles-types")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll()
        {
            var response = await _vehicleTypeService.GetAll();
            return ResponseCode(response);
        }
    }
}
