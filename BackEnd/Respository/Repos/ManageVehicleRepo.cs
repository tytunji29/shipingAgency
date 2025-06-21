using Microsoft.EntityFrameworkCore;
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
    public class ManageVehicleRepo : IManageVehicleRepo
    {
        private readonly VubidDbContext _db;

        public ManageVehicleRepo(VubidDbContext db) 
        { 
            _db = db;
        }

        public async Task<IEnumerable<VehicleType>> GetAll()
        {
            return await _db.VehicleTypes.ToListAsync();
        }

        public async Task AddVehicle(string name)
        {
            var result = new VehicleType
            {
                Name = name
            };
            await _db.VehicleTypes.AddAsync(result);
            await _db.SaveChangesAsync();
        }
    }
}
