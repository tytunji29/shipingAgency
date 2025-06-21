using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.DataContext;
using VubidsRespository.Repos;

namespace VubidsRespository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VubidDbContext _db;

        public UnitOfWork(VubidDbContext db)
        {
            _db = db;
        }

        public IManageUserRepo ManageUserRepo =>  new ManageUserRepo(_db);
        public IManageCompanyRepo ManageCompanyRepo => new ManageCompanyRepo(_db);
        public IManagePackageRepo ManagePackageRepo => new ManagePackageRepo(_db);
        public IManageVehicleRepo ManageVehicleRepo => new ManageVehicleRepo(_db);
        public IManageShipmentRepo ManageShipmentRepo => new ManageShipmentRepo(_db);
        public IManageDeliveryPickupRepo ManageDeliveryPickupRepo => new ManageDeliveryPickupRepo(_db);
        public IManageTransporterRepo ManageTransporterRepo => new ManageTransporterRepo(_db);
        public IManageQuoteRepo ManageQuoteRepo => new ManageQuoteRepo(_db);
        public IManageSupportRepo ManageSupportRepo => new ManageSupportRepo(_db);
        public IManagePaymentRepo ManagePaymentRepo => new ManagePaymentRepo(_db);
        public IManageChatMessageRepo ManageChatMessageRepo => new ManageChatMessageRepo(_db);
        public IManageItemsRepo ManageItemsRepo => new ManageItemsRepo(_db);
    }
}
