using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManagePaymentRepo
    {
        Task<IEnumerable<Payment>> GetPaymentsHistory(string userId, string? status);
        Task<Payment> GetByPaymentIdAsync(string userId, long paymentId);
        Task Add(CustomerCard request);
    }
}
