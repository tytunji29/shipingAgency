using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;

namespace VubidsRespository.Repos
{
    public class ManageDeliveryPickupRepo : IManageDeliveryPickupRepo
    {
        private readonly VubidDbContext _db;
        public ManageDeliveryPickupRepo(VubidDbContext db)
        {
                _db = db;
        }

        public async Task AddPackage(DeliveryPickup entity)
        {
            await _db.DeliveryPickups.AddAsync(entity);
            await _db.SaveChangesAsync();
        }
    }
}
