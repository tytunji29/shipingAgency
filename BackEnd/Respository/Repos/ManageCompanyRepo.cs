
using Microsoft.EntityFrameworkCore;
using Vubids.Domain.Entities;
using Vubids.Domain.Entities.Auths;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;

namespace VubidsRespository.Repos
{
   

    public class ManageCompanyRepo : IManageCompanyRepo
    {
        private readonly VubidDbContext _db;

        public ManageCompanyRepo(VubidDbContext db)
        {
            _db = db;
        }

        public async Task AddCompany(Company entity)
        {
            await _db.Companies.AddAsync(entity);
            await _db.SaveChangesAsync();
        }
        public async Task<IEnumerable<Company>> GetAll()
        {
            return await _db.Companies.ToListAsync();
        }

        public async Task UpdateUser(Company entity)
        {
            _db.Companies.Update(entity);
            await _db.SaveChangesAsync();
        }
    }
}
