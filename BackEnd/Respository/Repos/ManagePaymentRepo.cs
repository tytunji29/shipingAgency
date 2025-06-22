using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManagePaymentRepo : IManagePaymentRepo
    {
        private readonly JetSendDbContext _db;
        public ManagePaymentRepo(JetSendDbContext db)
        {
            _db = db;
        }


        public async Task<IEnumerable<Payment>> GetPaymentsHistory(string userId, string? status)
        {
            var payments = await _db.Payments.Where(x => x.UserId == userId || x.Status == status).ToListAsync();
            return payments;
        }

        public async Task<Payment> GetByPaymentIdAsync(string userId, long paymentId)
        {
            var payment = await _db.Payments.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == paymentId);
            return payment;
        }

        public async Task Add(CustomerCard request)
        {
            await _db.CustomerCards.AddAsync(request);
            await _db.SaveChangesAsync();
        }
    }
}
