using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories;

public interface IManageGeneralSetUpRepo
{
    Task<IEnumerable<ItemCategory>> GetAll();
    Task AddItemCategoory(string name); 
    Task<IEnumerable<RegionLga>> GetAllRegionLga(int stateid);
    Task AddRegionLga(string name, int stateId); 
    Task<IEnumerable<RegionState>> GetAllRegionState();
    Task<IEnumerable<VehicleType>> GetAllVehicleType();
    Task AddRegionState(string name);
    Task<IEnumerable<ItemType>> GetItemTypeByCategoryId(long categoryId);
    Task AddItemType(string name, long categoryId);
}
