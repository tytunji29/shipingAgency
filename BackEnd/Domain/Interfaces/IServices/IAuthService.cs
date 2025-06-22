using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.RequestDtos.Account;
using JetSend.Domain.Dtos.ResponseDtos.Account;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IAuthService
    {
        Task<ApiResponse<SimpleProfileResponse>> GetProfile();
        Task<ApiResponse<CustomerProfileResponse>> GetCustometProfile();
        Task<ApiResponse<CustomerLoginResponse>> LoginUser(LoginRequest request);
        Task<ApiResponse<string>> CreateCustomer(CreateCustomerRequest request, CancellationToken cancellationToken);
        Task<ApiResponse<string>> CreateAgent(CreateAgentRequest request, CancellationToken cancellationToken);
        Task<ApiResponse> ChangePassword(ChangePasswordRequest request, string email);
        Task<ApiResponse> ResetPassword(ResetPasswordRequest request);
        Task<ApiResponse<string>> ForgotPassword();
        Task<ApiResponse> UpdateProfile(UpdateCustomerRequest request);
        Task<UserRequestDto> ValidateRequest();
        Task<UserRequestDto> GetShipperDetailByQuote(string shipmentId);
    }
}
