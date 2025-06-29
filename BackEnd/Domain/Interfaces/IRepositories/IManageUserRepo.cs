using JetSend.Domain.Dtos.RequestDtos.Account;
using JetSend.Domain.Dtos.ResponseDtos.Account;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities.Auths;
using JetSend.Domain.Entities;
using JetSend.Core.Infranstructure.Common;

namespace JetSend.Domain.Interfaces.IRepositories
{
    public interface IManageUserRepo
    {
        Task UpdateAgent(Agent entity);
        Task AddCustomer(Customer entity);
        Task<long> AddAgent(Agent entity);
        Task AddAgentBankDetail(AgentBankDetail entity);
        Task UpdateCustomer(Customer entity);
        Task AddOTP(OtpVerificationLog entity);
        Task AddUser(Management entity);
        Task<Customer?> GetCustomerByEmail(string email);
        Task UpdateUser(Management entity);
        Task RemoveAdminUser(Management entity);
        Task<ApplicationUsers?> GetAuthUserByEmail(string email);
        Task<IEnumerable<ApplicationUsers>> GetAuthUsers();
        Task<Customer?> GetCustomer(string email);
        Task<Agent?> GetAgent(string email);
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
        //Task AddAgent(Agent entity);
        Task<ApplicationUsers?> GetAuthUserByPhone(string phoneNumber);
    }
}
