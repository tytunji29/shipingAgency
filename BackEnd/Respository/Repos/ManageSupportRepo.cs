using Microsoft.EntityFrameworkCore;
using Vubids.Domain.Entities;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;

namespace VubidsRespository.Repos
{
    public class ManageSupportRepo : IManageSupportRepo
    {
        private readonly VubidDbContext _db;
        public ManageSupportRepo(VubidDbContext db)
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
