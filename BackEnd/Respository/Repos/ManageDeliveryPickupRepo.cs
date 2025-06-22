using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageDeliveryPickupRepo : IManageDeliveryPickupRepo
    {
        private readonly JetSendDbContext _db;
        public ManageDeliveryPickupRepo(JetSendDbContext db)
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
