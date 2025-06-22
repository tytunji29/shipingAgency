using Microsoft.EntityFrameworkCore;
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
    public class ManageVehicleRepo : IManageVehicleRepo
    {
        private readonly JetSendDbContext _db;

        public ManageVehicleRepo(JetSendDbContext db) 
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
