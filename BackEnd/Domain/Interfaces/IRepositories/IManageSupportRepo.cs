using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManageSupportRepo
    {
        Task<IEnumerable<Support>> GetAll();
        Task Add(Support request);
    }
}
