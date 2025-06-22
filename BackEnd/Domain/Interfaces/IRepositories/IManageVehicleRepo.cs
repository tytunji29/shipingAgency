using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManageVehicleRepo
    {
        Task<IEnumerable<VehicleType>> GetAll();
        Task AddVehicle(string name);
    }
}
