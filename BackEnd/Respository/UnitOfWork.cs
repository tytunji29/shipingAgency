using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;
using JetSend.Respository.Repos;

namespace JetSend.Respository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly JetSendDbContext _db;

        public UnitOfWork(JetSendDbContext db)
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
        public IManageGeneralSetUpRepo ManageGeneralSetUpRepo => new ManageGeneralSetUpRepo(_db);

    }
}
