using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManagePackageRepo
    {
        //Package
        Task AddPackage(Package entity);
        Task<IEnumerable<Package>> GetPackages();
        Task<Package> GetPackage(long Id);
        Task<IEnumerable<Package>> GetActivePackages();
        Task<IEnumerable<Package>> GetPendingPackages();

        //Receiver
        Task AddReceiver(Receiver entity);
        Task<IEnumerable<Receiver>> GetRecivers();
        Task<Receiver> GetReceiver(long Id);
        Task<Receiver> GetReceiverByPhoneNumber(string PhoneNumber);

        //Sender
        Task AddSender(Sender entity);
        Task<IEnumerable<Sender>> GetSenders();
        Task<Sender> GetSender(long Id);

        //Items
        Task AddItems(Item entity);
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(long Id);
    }
}
