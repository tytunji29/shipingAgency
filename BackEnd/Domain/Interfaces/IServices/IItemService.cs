using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IItemService
    {
        //ItemType
        Task<ApiResponse<IEnumerable<ItemCategory>>> GetItemCategories();
        Task<ApiResponse> AddItemCategory(string name);

        //ItemCategory
        Task<ApiResponse<IEnumerable<ItemType>>> GetItemTypes(long itemCategoryId);
        Task<ApiResponse> AddItemType(string name, long categoryId);
    }
}
