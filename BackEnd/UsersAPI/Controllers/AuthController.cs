using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.RequestDtos.Account;
using Vubids.Domain.Dtos.ResponseDtos.Account;
using Vubids.Domain.Interfaces.IServices;

namespace VubUsersAPI.Controllers
{
    [ApiController]
    [AllowAnonymous]
    public class AuthController : APIBaseController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("customer-signUp")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SignUp([FromBody] CreateCustomerRequest request, CancellationToken cancellationToken)
        {
            var response = await _authService.CreateCustomer(request, cancellationToken);
            return ResponseCode(response);
        }
        [HttpPost("agent-signUp")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AgentSignUp([FromBody] CreateCustomerRequest request, CancellationToken cancellationToken)
        {
            var response = await _authService.CreateCustomer(request, cancellationToken);
            return ResponseCode(response);
        }

        //[HttpPost("corporate-signUp")]
        //[ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> CorporateSignUp([FromBody] CreateCustomerCompanyRequest request, CancellationToken cancellationToken)
        //{
        //    var response = await _authService.CreateCustomerCompany(request, cancellationToken);
        //    return ResponseCode(response);
        //}

        [HttpPost("login")]
        [ProducesResponseType(typeof(ApiResponse<CustomerLoginResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginUser(request);
            return ResponseCode(response);
        }

        [HttpGet("get-customer-profile")]
        [ProducesResponseType(typeof(ApiResponse<CustomerProfileResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProfile()
        {
            var response = await _authService.GetCustometProfile();
            return ResponseCode(response);
        }


        [HttpPost("forgot-password")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Forgot()
        {
            var response = await _authService.ForgotPassword();
            return ResponseCode(response);
        }


        [HttpPost("reset-password")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var response = await _authService.ResetPassword(request);
            return ResponseCode(response);
        }

        [HttpPost("change-password")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);
            var email = User.Identity?.GetUserEmail() ?? "";

            var response = await _authService.ChangePassword(request, email);
            return ResponseCode(response);
        }

        [HttpPatch("update-profile")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProfile(UpdateCustomerRequest request)
        {
            var response = await _authService.UpdateProfile(request);
            return ResponseCode(response);
        }

    }
}
