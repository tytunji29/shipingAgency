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
    public interface IUnitOfWork
    {
        IManageUserRepo ManageUserRepo { get; }
        IManageCompanyRepo ManageCompanyRepo { get; }
        IManagePackageRepo ManagePackageRepo { get; }
        IManageVehicleRepo ManageVehicleRepo { get; }
        IManageShipmentRepo ManageShipmentRepo { get; }
        IManageTransporterRepo ManageTransporterRepo { get; }
        IManageDeliveryPickupRepo ManageDeliveryPickupRepo { get; }
        IManageQuoteRepo ManageQuoteRepo { get; }
        IManageSupportRepo ManageSupportRepo { get; }
        IManagePaymentRepo ManagePaymentRepo { get; }
        IManageChatMessageRepo ManageChatMessageRepo { get; }
        IManageGeneralSetUpRepo ManageGeneralSetUpRepo { get; }
    }
}
