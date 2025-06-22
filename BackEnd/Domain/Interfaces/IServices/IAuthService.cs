using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.RequestDtos.Account;
using Vubids.Domain.Dtos.ResponseDtos.Account;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IAuthService
    {
        Task<ApiResponse<SimpleProfileResponse>> GetProfile();
        Task<ApiResponse<CustomerProfileResponse>> GetCustometProfile();
        Task<ApiResponse<CustomerLoginResponse>> LoginUser(LoginRequest request);
        Task<ApiResponse<string>> CreateCustomer(CreateCustomerRequest request, CancellationToken cancellationToken);
       // Task<ApiResponse<string>> CreateCustomerCompany(CreateCustomerCompanyRequest request, CancellationToken cancellationToken);
        Task<ApiResponse> ChangePassword(ChangePasswordRequest request, string email);
        Task<ApiResponse> ResetPassword(ResetPasswordRequest request);
        Task<ApiResponse<string>> ForgotPassword();
        Task<ApiResponse> UpdateProfile(UpdateCustomerRequest request);
        Task<UserRequestDto> ValidateRequest();
        Task<UserRequestDto> GetShipperDetailByQuote(string shipmentId);
    }
}
