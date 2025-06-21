using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageVehicleRepo
    {
        Task<IEnumerable<VehicleType>> GetAll();
        Task AddVehicle(string name);
    }
}
