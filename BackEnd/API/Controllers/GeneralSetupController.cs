using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JetSend.API.Controllers;

[AllowAnonymous]
public class GeneralSetupController : APIBaseController
{
    private readonly IManageGeneralSetUpService _itemService;
    public GeneralSetupController(IManageGeneralSetUpService itemService)
    {
        _itemService = itemService;
    }

    // ItemCategory
    [HttpPost("add-item-category")]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddItem(string name)
    {
        var response = await _itemService.AddItemCategory(name);
        return ResponseCode(response);
    }
    [HttpGet("get-all-item-categories")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<ItemCategory>>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllItems()
    {
        var response = await _itemService.GetItemCategories();
        return ResponseCode(response);
    }
    // RegionState
    [HttpPost("add-region-state")]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddRegionState(string name)
    {
        var response = await _itemService.AddRegionState(name);
        return ResponseCode(response);
    }
    [HttpGet("get-all-region-state")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<RegionState>>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllRegionStates()
    {
        var response = await _itemService.GetRegionStates();
        return ResponseCode(response);
    }   [HttpGet("get-all-vehicletypes")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<VehicleType>>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllVehicleTypes()
    {
        var response = await _itemService.GetVehicleTypes();
        return ResponseCode(response);
    } 
    // RegionLga
    [HttpPost("add-region-lga")]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddRegionLga(string name, int stateId)
    {
        var response = await _itemService.AddRegionLga(name, stateId);
        return ResponseCode(response);
    }
    [HttpGet("get-all-region-lga/{stateid}")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<RegionLga>>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllRegionLgas(string stateid)
    {
        int stId = Convert.ToInt32(stateid);
        var response = await _itemService.GetRegionLgas(stId);
        return ResponseCode(response);
    }

    // ItemType

    [HttpPost("add-item-type")]
    [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddItemType(string name, long categoryId)
    {
        var response = await _itemService.AddItemType(name, categoryId);
        return ResponseCode(response);
    }

    [HttpGet("get-all-item-types-by-category-id")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<ItemType>>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAllItemTypes(long categoryId)
    {
        var response = await _itemService.GetItemTypes(categoryId);
        return ResponseCode(response);
    }
}
