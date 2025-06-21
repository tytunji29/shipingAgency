using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories;

public interface IManageItemsRepo
{
    #region ItemCategory
    Task<IEnumerable<ItemCategory>> GetAll();
    Task AddItemCategoory(string name);

    #endregion

    #region ItemType
    Task<IEnumerable<ItemType>> GetItemTypeByCategoryId(long categoryId);
    Task AddItemType(string name, long categoryId);

    #endregion
}
