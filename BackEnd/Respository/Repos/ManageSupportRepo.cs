using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageSupportRepo : IManageSupportRepo
    {
        private readonly JetSendDbContext _db;
        public ManageSupportRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Support>> GetAll()
        {
            return await _db.Supports.ToListAsync();
        }

        public async Task Add(Support request)
        {
            await _db.AddAsync(request);
            await _db.SaveChangesAsync();
        }
    }
}
