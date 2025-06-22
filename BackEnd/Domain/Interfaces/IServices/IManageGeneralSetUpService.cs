using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IManageGeneralSetUpService
    {
        Task<ApiResponse<IEnumerable<RegionState>>> GetRegionStates();
        Task<ApiResponse<IEnumerable<RegionLga>>> GetRegionLgas();
        Task<ApiResponse> AddRegionState(string name);
        Task<ApiResponse> AddRegionLga(string name, int stateId);
        //ItemType
        Task<ApiResponse<IEnumerable<ItemCategory>>> GetItemCategories();
        Task<ApiResponse> AddItemCategory(string name);

        //ItemCategory
        Task<ApiResponse<IEnumerable<ItemType>>> GetItemTypes(long itemCategoryId);
        Task<ApiResponse> AddItemType(string name, long categoryId);
    }
}
