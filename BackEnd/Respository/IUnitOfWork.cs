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
        IManageItemsRepo ManageItemsRepo { get; }
    }
}
