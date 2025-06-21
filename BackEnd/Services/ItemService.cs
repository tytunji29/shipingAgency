using Vubids.Core.Infranstructure.Common;
using Vubids.Core.Infranstructure.Common.Enums;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IServices;
using VubidsRespository;

namespace VubidsServices
{
    public class ItemService : IItemService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ItemService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region ItemCategory
        public async Task<ApiResponse<IEnumerable<ItemCategory>>> GetItemCategories()
        {
            var result = await _unitOfWork.ManageItemsRepo.GetAll();
            return new ApiResponse<IEnumerable<ItemCategory>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item categories fetched successfully.", Data = result };
        }

        public async Task<ApiResponse> AddItemCategory(string name)
        {
            await _unitOfWork.ManageItemsRepo.AddItemCategoory(name);
            return new ApiResponse("Item Category Added Successfully", StatusEnum.Success, true);
        }

        #endregion

        #region ItemType
        public async Task<ApiResponse<IEnumerable<ItemType>>> GetItemTypes(long itemCategoryId)
        {
            var result = await _unitOfWork.ManageItemsRepo.GetItemTypeByCategoryId(itemCategoryId);
            return new ApiResponse<IEnumerable<ItemType>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item Types returned successfully", Data = result};
        }

        public async Task<ApiResponse> AddItemType(string name, long categoryId)
        {
            await _unitOfWork.ManageItemsRepo.AddItemType(name, categoryId);
            return new ApiResponse("Item Type Added Successfully", StatusEnum.Success, true);
        }

        #endregion
    }
}
