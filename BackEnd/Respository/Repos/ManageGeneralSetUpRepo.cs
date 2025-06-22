using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos;

public class ManageGeneralSetUpRepo : IManageGeneralSetUpRepo
{
    private readonly JetSendDbContext _context;
    public ManageGeneralSetUpRepo(JetSendDbContext context)
    {
        _context = context;
    }

    #region ItemCategory
    public async Task<IEnumerable<ItemCategory>> GetAll()
    {
        return await _context.ItemCategories.ToListAsync();
    }
    public async Task AddItemCategoory(string name)
    {
        var item = new ItemCategory { Name = name };
        await _context.ItemCategories.AddAsync(item);
        await _context.SaveChangesAsync();
    }
    #endregion
    #region RegionState
    public async Task<IEnumerable<RegionState>> GetAllRegionState()
    {
        return await _context.RegionState.ToListAsync();
    }
    public async Task<IEnumerable<VehicleType>> GetAllVehicleType()
    {
        return await _context.VehicleTypes.ToListAsync();
    }
    public async Task AddRegionState(string name)
    {
        var item = new RegionState { Name = name };
        await _context.RegionState.AddAsync(item);
        await _context.SaveChangesAsync();
    }


    #endregion
    #region RegionLga
    public async Task<IEnumerable<RegionLga>> GetAllRegionLga(int stateid)
    {
        return await _context.RegionLga.Where(o => o.StateId == stateid).ToListAsync();
    }
    public async Task AddRegionLga(string name, int stateId)
    {
        var item = new RegionLga { Name = name, StateId = stateId };
        await _context.RegionLga.AddAsync(item);
        await _context.SaveChangesAsync();
    }


    #endregion

    #region ItemType

    public async Task<IEnumerable<ItemType>> GetItemTypeByCategoryId(long categoryId)
    {
        var result = await _context.ItemTypes.Where(x => x.ItemCategoryId == categoryId).ToListAsync();
        return result;
    }

    public async Task AddItemType(string name, long categoryId)
    {
        var item = new ItemType { Name = name, ItemCategoryId = categoryId };
        await _context.ItemTypes.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    #endregion

}