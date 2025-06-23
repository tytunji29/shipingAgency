using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers;
[AllowAnonymous]
public class ItemsController : APIBaseController
{
    private readonly IManageGeneralSetUpService _itemService;
    public ItemsController(IManageGeneralSetUpService itemService)
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
