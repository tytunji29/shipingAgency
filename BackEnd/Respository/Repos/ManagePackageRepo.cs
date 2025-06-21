using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Entities;
using Vubids.Domain.Entities.Auths;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;

namespace VubidsRespository.Repos
{
    public class ManagePackageRepo : IManagePackageRepo
    {
        private readonly VubidDbContext _db;
        public ManagePackageRepo(VubidDbContext db)
        {
            _db = db;
        }

        #region Package
        public async Task AddPackage(Package entity)
        {
            await _db.Packages.AddAsync(entity);
            await _db.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<Package>> GetPackages()
        {
            return await _db.Packages.ToListAsync();
        }

        public async Task<Package> GetPackage(long Id)
        {
            var result = await _db.Packages.FirstOrDefaultAsync(x => x.Id == Id);
            return result;
        }

        public async Task<IEnumerable<Package>> GetActivePackages()
        {
            var result =  await _db.Packages.Where(x => x.Status == Status.Active).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<Package>> GetPendingPackages()
        {
            var result = await _db.Packages.Where(x => x.Status == Status.Pending).ToListAsync();
            return result;
        }


        #endregion

        #region Receiver
        public async Task AddReceiver(Receiver entity)
        {
            await _db.Receivers.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Receiver>> GetRecivers()
        {
            return await _db.Receivers.ToListAsync();
        }

        public async Task<Receiver> GetReceiver(long Id)
        {
            var result = await _db.Receivers.FirstOrDefaultAsync(x => x.Id == Id);
            return result;
        }

        public async Task<Receiver> GetReceiverByPhoneNumber(string PhoneNumber)
        {
            var result = await _db.Receivers.FirstOrDefaultAsync(x => x.PhoneNumber == PhoneNumber);
            return result;
        }

        #endregion

        #region Sender
        public async Task AddSender(Sender entity)
        {
            await _db.Senders.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Sender>> GetSenders()
        {
            return await _db.Senders.ToListAsync();
        }

        public async Task<Sender> GetSender(long Id)
        {
            var result = await _db.Senders.FirstOrDefaultAsync(x => x.Id == Id);
            return result;
        }

        #endregion

        #region Item
        public async Task AddItems(Item entity)
        {
            await _db.Items.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _db.Items.ToListAsync();
        }

        public async Task<Item> GetItem(long Id)
        {
            var result = await _db.Items.FirstOrDefaultAsync(x => x.Id == Id);
            return result;
        }

        #endregion
    }
}
