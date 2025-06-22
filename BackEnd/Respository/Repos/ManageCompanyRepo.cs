
using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities;
using JetSend.Domain.Entities.Auths;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
   

    public class ManageCompanyRepo : IManageCompanyRepo
    {
        private readonly JetSendDbContext _db;

        public ManageCompanyRepo(JetSendDbContext db)
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
