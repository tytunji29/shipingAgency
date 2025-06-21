using Vubids.Domain.Dtos.RequestDtos.Account;
using Vubids.Domain.Dtos.ResponseDtos.Account;
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities.Auths;
using Vubids.Domain.Entities;
using Vubids.Core.Infranstructure.Common;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageUserRepo
    {
        Task AddCustomer(Customer entity);
        Task UpdateCustomer(Customer entity);
        Task AddOTP(OtpVerificationLog entity);
        Task AddUser(Management entity);
        Task<Customer?> GetCustomerByEmail(string email);
        Task UpdateUser(Management entity);
        Task RemoveAdminUser(Management entity);
        Task<ApplicationUsers?> GetAuthUserByEmail(string email);
        Task<IEnumerable<ApplicationUsers>> GetAuthUsers();
        Task<Customer?> GetCustomer(string email);
        Task<Customer?> GetCustomer(string email, string userId);
        Task<OtpVerificationLog?> GetOtpVerificationLog(string code);
        Task<IEnumerable<OtpVerificationLog>> GetOtpVerificationLogs();
        Task<Management?> GetUser(string UserName);
        Task<List<ManagementDto>> Managements();
        //Task<Management> GetManagementUser(string email);
        Task SaveChangesAsync();
        Task UpdateOTP(SendOtpRequest request);
        Task<ApiResponse> ValidateOTPCodeAsync(ValidateOtpRequest otpRequest, int otpExpiry);
        Task<CustomerProfileResponse?> GetProfile(string email);
        Task<IEnumerable<Customer>> GetCustomers();
        Task AddAgent(Agent entity);
        Task<ApplicationUsers?> GetAuthUserByPhone(string phoneNumber);
    }
}
