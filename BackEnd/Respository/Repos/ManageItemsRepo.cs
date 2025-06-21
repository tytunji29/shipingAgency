using Microsoft.EntityFrameworkCore;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;

namespace VubidsRespository.Repos;

public class ManageItemsRepo : IManageItemsRepo
{
    private readonly VubidDbContext _context;
    public ManageItemsRepo(VubidDbContext context)
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