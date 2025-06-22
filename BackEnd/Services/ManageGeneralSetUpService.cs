using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class ManageGeneralSetUpService : IManageGeneralSetUpService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ManageGeneralSetUpService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region ItemCategory
        public async Task<ApiResponse<IEnumerable<ItemCategory>>> GetItemCategories()
        {
            var result = await _unitOfWork.ManageGeneralSetUpRepo.GetAll();
            return new ApiResponse<IEnumerable<ItemCategory>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item categories fetched successfully.", Data = result };
        }

        public async Task<ApiResponse> AddItemCategory(string name)
        {
            await _unitOfWork.ManageGeneralSetUpRepo.AddItemCategoory(name);
            return new ApiResponse("Item Category Added Successfully", StatusEnum.Success, true);
        }

        #endregion 
        #region RegionLga
        public async Task<ApiResponse<IEnumerable<RegionLga>>> GetRegionLgas(int stateid)
        {

            var result = await _unitOfWork.ManageGeneralSetUpRepo.GetAllRegionLga(stateid);
            return new ApiResponse<IEnumerable<RegionLga>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item categories fetched successfully.", Data = result };
        }

        public async Task<ApiResponse> AddRegionLga(string name, int stateId)
        {
            await _unitOfWork.ManageGeneralSetUpRepo.AddRegionLga(name, stateId);
            return new ApiResponse("Record Added Successfully", StatusEnum.Success, true);
        }

        #endregion

        #region RegionState
        public async Task<ApiResponse<IEnumerable<RegionState>>> GetRegionStates()
        {
            var result = await _unitOfWork.ManageGeneralSetUpRepo.GetAllRegionState();
            return new ApiResponse<IEnumerable<RegionState>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item categories fetched successfully.", Data = result };
        }
         public async Task<ApiResponse<IEnumerable<VehicleType>>> GetVehicleTypes()
        {
            var result = await _unitOfWork.ManageGeneralSetUpRepo.GetAllVehicleType();
            return new ApiResponse<IEnumerable<VehicleType>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item categories fetched successfully.", Data = result };
        }

        public async Task<ApiResponse> AddRegionState(string name)
        {
            await _unitOfWork.ManageGeneralSetUpRepo.AddRegionState(name);
            return new ApiResponse("Record Added Successfully", StatusEnum.Success, true);
        }

        #endregion 
       

        #region ItemType
        public async Task<ApiResponse<IEnumerable<ItemType>>> GetItemTypes(long itemCategoryId)
        {
            var result = await _unitOfWork.ManageGeneralSetUpRepo.GetItemTypeByCategoryId(itemCategoryId);
            return new ApiResponse<IEnumerable<ItemType>> { StatusCode = StatusEnum.Success, Status = true, Message = "Item Types returned successfully", Data = result };
        }

        public async Task<ApiResponse> AddItemType(string name, long categoryId)
        {
            await _unitOfWork.ManageGeneralSetUpRepo.AddItemType(name, categoryId);
            return new ApiResponse("Item Type Added Successfully", StatusEnum.Success, true);
        }

        #endregion
    }
}
