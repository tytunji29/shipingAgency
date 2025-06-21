using MeetTech.Core.Utilities.Extensions;
using MeetTech.Core.Utilities.Services.Messages;
using MeetTech.Core.Utilities.Statics;
using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UtilitiesServices.Statics;
using Vubids.Core.Infranstructure.Common;
using Vubids.Core.Infranstructure.Common.Enums;
using Vubids.Domain.Dtos.RequestDtos;
using Vubids.Domain.Dtos.RequestDtos.Account;
using Vubids.Domain.Dtos.ResponseDtos.Account;
using Vubids.Domain.Entities;
using Vubids.Domain.Entities.Auths;
using Vubids.Domain.Exceptions;
using Vubids.Domain.Interfaces.IServices;
using VubidsRespository;

namespace VubidsServices
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly SignInManager<ApplicationUsers> _signInManager;
        private readonly IGenerateTokenService _generateTokenService;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly IEmailService _emailService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SymmetricSecurityKey _key;


        public AuthService(IUnitOfWork unitOfWork, UserManager<ApplicationUsers> userManager, SignInManager<ApplicationUsers> signInManager,
                        IGenerateTokenService generateTokenService, IOptions<AppSettings> appSettings, IEmailService emailService,
                        IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _signInManager = signInManager;
            _generateTokenService = generateTokenService;
            _appSettings = appSettings;
            _emailService = emailService;
            _httpContextAccessor = httpContextAccessor;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Value.JwtKey));
        }

        public async Task<ApiResponse<string>> CreateCustomer(CreateCustomerRequest request, CancellationToken cancellationToken)
        {
            var validateResult = ValidateCustomerRequest(request);
            if (!validateResult.status.GetValueOrDefault())
                return new ApiResponse<string> { Status = validateResult.status, Message = validateResult.message, StatusCode = validateResult.statusCode };

            request.Email = request.Email.Trim().ToLower();
            var users = await _unitOfWork.ManageUserRepo.GetAuthUsers();
            if (users.Any(us => us.Email == request.Email && us.PhoneNumber == request.PhoneNumber))
            {
                return new ApiResponse<string> { Message = $"Customer already exists. Please verify and try again.", StatusCode = StatusEnum.Validation };
            }

            if (users.Any(us => us.Email == request.Email))
            {
                return new ApiResponse<string> { Message = $"Email  address  {request.Email} already registered, check and try again later.", StatusCode = StatusEnum.Validation };
            }

            if (users.Any(us => us.PhoneNumber == request.PhoneNumber))
            {
                return new ApiResponse<string> { Message = $"Phone number  {request.PhoneNumber} already registered, check and try again later.", StatusCode = StatusEnum.Validation };
            }

            var uCustomer = request.ToUser();
            var createUser = await _userManager.CreateAsync(uCustomer, request.Password);

            var customer = new Customer
            {
                Email = request.Email,
                Gender = request.Gender,
                FirstName = request.Gender,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                UserId = uCustomer.Id.ToString(),
                IsAdmin = 0
            };
            await _unitOfWork.ManageUserRepo.AddCustomer(customer);

            if (!createUser.Succeeded)
            {
                var errors = createUser.Errors.Select(x => x.Description);
                return new ApiResponse<string> { Message = $"Unable to register at this time. {string.Join(" ", errors)}", StatusCode = StatusEnum.ServerError };
            }

            request.ToCustomer(uCustomer.Id);

            var otp = CustomizeCodes.GenerateOTP(6);
            await SendOTPCodeAsync(new SendOtpRequest
            {
                Code = otp,
                FirstName = request.FirstName,
                UserId = uCustomer.Id,
                SenderName = "Vubids",
                SendingMode = "Email",
                UserEmail = uCustomer.Email ?? " ",
                Purpose = OtpVerificationPurposeEnum.EmailVerification
            });
            string message = $"Hello {request.FirstName}, kindly utilize the code {otp} to finalize the registration process. We're excited to welcome you onboard!<br/><br/>";

            await _emailService.SendMail_SendGrid(request.Email, "Email Verification", message, "Vubids");

            return new ApiResponse<string> { Status = true, Message = $"Success! Kindly check your email and use the provided code to finalize your registration.", Data = uCustomer.Id, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse<string>> CreateCustomerCompany(CreateCustomerCompanyRequest request, CancellationToken cancellationToken)
        {
            var validateResult = ValidateCustomerRequest(request);
            if (!validateResult.status.GetValueOrDefault())
                return new ApiResponse<string> { Status = validateResult.status, Message = validateResult.message, StatusCode = validateResult.statusCode };

            request.Email = request.Email.Trim().ToLower();
            var users = await _unitOfWork.ManageUserRepo.GetAuthUsers();
            if (users.Any(us => us.Email == request.Email && us.PhoneNumber == request.PhoneNumber))
            {
                return new ApiResponse<string> { Message = $"Customer already exists. Please verify and try again.", StatusCode = StatusEnum.Validation };
            }

            if (users.Any(us => us.Email == request.Email))
            {
                return new ApiResponse<string> { Message = $"Email  address  {request.Email} already registered, check and try again later.", StatusCode = StatusEnum.Validation };
            }

            if (users.Any(us => us.PhoneNumber == request.PhoneNumber))
            {
                return new ApiResponse<string> { Message = $"Phone number  {request.PhoneNumber} already registered, check and try again later.", StatusCode = StatusEnum.Validation };
            }

            var uCustomer = request.ToUser();
            var createUser = await _userManager.CreateAsync(uCustomer, request.Password);
            if (!createUser.Succeeded)
            {
                var errors = createUser.Errors.Select(x => x.Description);
                return new ApiResponse<string> { Message = $"Unable to register at this time. {string.Join(" ", errors)}", StatusCode = StatusEnum.ServerError };
            }
            request.ToCustomer(uCustomer.Id);

            var otp = CustomizeCodes.GenerateOTP(6);
            await SendOTPCodeAsync(new SendOtpRequest
            {
                Code = otp,
                FirstName = request.FirstName,
                UserId = uCustomer.Id,
                SenderName = "Vubids",
                SendingMode = "Email",
                UserEmail = uCustomer.Email ?? " ",
                Purpose = OtpVerificationPurposeEnum.EmailVerification
            });

            var customer = new Customer
            {
                Email = request.Email,
                Gender = request.Gender,
                FirstName = request.Gender,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                UserId = uCustomer.Id.ToString(),
                IsAdmin = 1
            };
            await _unitOfWork.ManageUserRepo.AddCustomer(customer);

            var newCompany = new Company
            {
                Availability = request.Availability,
                LoadingNo = request.LoadingNo,
                TypeOfService = request.TypeOfService,
                Region = request.Region,
                NoOfVeicles = request.NoOfVeicles,
                Rate = request.Rate,
                Email = request.Email,
                UserId = uCustomer.Id.ToString()
            };

            await _unitOfWork.ManageCompanyRepo.AddCompany(newCompany);


            string message = $"Hello {request.FirstName}, kindly utilize the code {otp} to finalize the registration process. We're excited to welcome you onboard!<br/><br/>";

            await _emailService.SendMail_SendGrid(request.Email, "Email Verification", message, "Vubids");

            return new ApiResponse<string> { Status = true, Message = $"Success! Kindly check your email and use the provided code to finalize your registration.", Data = uCustomer.Id, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse<CustomerLoginResponse>> LoginUser(LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = "Email is required." };

            if (string.IsNullOrEmpty(request.Password))
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = "Password is required." };

            if (!StringExtensions.IsValidEmail(request.Email.Trim()))
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = "Email address is not valid, check and try again." };

            var user = await _unitOfWork.ManageUserRepo.GetAuthUserByEmail(request.Email);
            if (user is null)
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.NoRecordFound, Status = false, Message = "User record not found, check and try again." };

            if (!await _userManager.CheckPasswordAsync(user, request.Password))
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Unauthorised, Status = false, Message = "Unauthorized." };
            try
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, request.Password, false, true);
                if (!signInResult.Succeeded)
                {
                    if (signInResult.IsLockedOut)
                    {
                        user.LockoutEnd = DateTime.MaxValue;
                        await _userManager.UpdateAsync(user);
                        return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = "Your account has been locked. Kindly initiate a password reset to unlock your account." };
                    }
                    else
                    {
                        int maxAttempts = _userManager.Options.Lockout.MaxFailedAccessAttempts;
                        int failedAttempts = await _userManager.GetAccessFailedCountAsync(user);
                        if (maxAttempts - failedAttempts == 0)
                        {
                            user.LockoutEnabled = true;
                            user.LockoutEnd = DateTime.MaxValue;
                            await _userManager.UpdateAsync(user);

                            return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = "Your account has been locked. Kindly initiate a password reset to unlock your account." };
                        }
                        return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Validation, Status = false, Message = $"Invalid login credentials.You have {maxAttempts - failedAttempts} attempts left." };
                    }
                }
                string iscus = "";
                var customer = await _unitOfWork.ManageUserRepo.GetAuthUserByEmail(user.Email!);
                if (customer == null)
                    return new ApiResponse<CustomerLoginResponse> { Message = "Customer record not found, check and try again later.", StatusCode = StatusEnum.NoRecordFound, Status = false };

                user.LockoutEnabled = false;
                user.LockoutEnd = null;
                user.AccessFailedCount = 0;
                await _userManager.UpdateAsync(user);

                var token = await _generateTokenService.CreateUserToken(user.UserName!, user.Id, "");
                var cusDet = await _unitOfWork.ManageUserRepo.GetCustomerByEmail(request.Email);
                if (cusDet != null)
                {
                    iscus = cusDet.IsAdmin == 0 ? "No" : "Yes";
                }
                var response = new CustomerLoginResponse
                {
                    UserId = user.Id,
                    Email = user.Email!,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    CustomerId = customer.Id,
                    PhoneNumber = customer.PhoneNumber,
                    Token = token,
                    IsCompany = iscus,
                    Photo = string.IsNullOrEmpty(customer.Photo) ? _appSettings.Value.DefaultImageUrl : customer.Photo,
                };

                //Send Message to Customer: 
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Success, Status = true, Message = "Login was successful.", Data = response };
            }
            catch (Exception)
            {
                return new ApiResponse<CustomerLoginResponse> { StatusCode = StatusEnum.Failed, Status = false, Message = $"Unable to login, please try again later." };
            }
        }

        public async Task<ApiResponse<string>> ForgotPassword()
        {

            var loggedInUser = await ValidateRequest();
            var customerUser = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);

            if (!customerUser.Email.IsValidEmail())
                return new ApiResponse<string> { StatusCode = StatusEnum.Validation, Status = false, Message = "Invalid email address." };

            var user = await _userManager.FindByEmailAsync(customerUser.Email);
            if (user == null)
                return new ApiResponse<string> { StatusCode = StatusEnum.NoRecordFound, Status = false, Message = "User record not found, check and try again later." };

            var otp = CustomizeCodes.GenerateOTP(6);
            await SendOTPCodeAsync(new SendOtpRequest
            {
                Code = otp,
                UserId = user.Id,
                UserEmail = user.Email!,
                Purpose = OtpVerificationPurposeEnum.ForgetPassword
            });

            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(user.Email!, "");
            string message = $"Hello {customer!.FirstName}, kindly utilize the code {otp} to reset your password." +
                "<br/><br/>If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.";

            await _emailService.SendMail_SendGrid(user.Email!, "Forget password code Verification", message, "Vubids");

            return new ApiResponse<string> { StatusCode = StatusEnum.Success, Status = true, Message = "Success! Kindly check your email and use the provided code to finalize your reset password.", Data = user.Id };
        }

        public async Task<ApiResponse> ResetPassword(ResetPasswordRequest request)
        {
            if (!request.NewPassword.Equals(request.ConfirmPassword))
                return new ApiResponse("Passwords do not match.", StatusEnum.Validation, false);

            if (string.IsNullOrEmpty(request.Code))
                return new ApiResponse("Code is required.", StatusEnum.Validation, false);

            var optValidationLog = await _unitOfWork.ManageUserRepo.GetOtpVerificationLog(request.Code);

            if (optValidationLog is null)
                return new ApiResponse("Reset password code does not exist, check and try again later.", StatusEnum.NoRecordFound, false);

            var validateCodeResponse = await _unitOfWork.ManageUserRepo.ValidateOTPCodeAsync(new ValidateOtpRequest
            {
                Code = optValidationLog.Code,
                UserId = optValidationLog.UserId!,
                Purpose = optValidationLog.Purpose
            }, _appSettings.Value.OtpExpiry);

            if (!validateCodeResponse.status.GetValueOrDefault())
                return new ApiResponse(validateCodeResponse.message, validateCodeResponse.statusCode, validateCodeResponse.status);

            var user = await _userManager.FindByIdAsync(optValidationLog.UserId!);
            if (user is null)
                return new ApiResponse("Unable to find user. Please try again later.", StatusEnum.NoRecordFound, false);

            user.PasswordHash = new PasswordHasher<ApplicationUsers>().HashPassword(user, request.NewPassword);
            user.SecurityStamp = Guid.NewGuid().ToString();
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return new ApiResponse("Password updated successfully.", StatusEnum.Success, true);
            else
            {
                var errorMessage = result.Errors.Select(c => c.Description).FirstOrDefault();
                return new ApiResponse(errorMessage ?? "", StatusEnum.ServerError, false);
            }
        }

        public async Task<ApiResponse> ChangePassword(ChangePasswordRequest request, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user is null)
                return new ApiResponse("Unable to find user. Please try again later.", StatusEnum.NoRecordFound, false);

            if (string.IsNullOrEmpty(request.CurrentPassword))
                return new ApiResponse("Please enter current password.", StatusEnum.Validation, false);

            if (request.NewPassword.ToLower() != request.ConfirmPassword.ToLower())
                return new ApiResponse("Password not the same as confirm password. Please try again later.", StatusEnum.Validation, false);

            user.PasswordHash = new PasswordHasher<ApplicationUsers>().HashPassword(user, request.NewPassword);
            user.SecurityStamp = Guid.NewGuid().ToString();
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return new ApiResponse("Password updated successfully.", StatusEnum.Success, true);
            else
            {
                var errorMessage = result.Errors.Select(c => c.Description).FirstOrDefault();
                return new ApiResponse(errorMessage ?? "", StatusEnum.ServerError, false);
            }
        }

        public async Task<ApiResponse<SimpleProfileResponse>> GetProfile()
        {
            var loggedInUser = await ValidateRequest();
            var customerUser = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);

            if (customerUser is null)
                return new ApiResponse<SimpleProfileResponse> { StatusCode = StatusEnum.NoRecordFound, Status = false, Message = "Customer record not found." };

            var response = new SimpleProfileResponse
            {
                Email = loggedInUser.Email,
                CustomerId = customerUser.Id,
                PhoneNumber = customerUser.PhoneNumber,
                UserId = customerUser.UserId,
            };

            return new ApiResponse<SimpleProfileResponse> { StatusCode = StatusEnum.Success, Status = true, Message = "Customer profile fetched successfully.", Data = response };
        }

        public async Task<ApiResponse<CustomerProfileResponse>> GetCustometProfile()
        {
            var loggedInUser = await ValidateRequest();
            var customerProfile = await _unitOfWork.ManageUserRepo.GetProfile(loggedInUser.Email);

            if (customerProfile is null)
                return new ApiResponse<CustomerProfileResponse> { StatusCode = StatusEnum.NoRecordFound, Status = false, Message = "Customer record not found." };
            return new ApiResponse<CustomerProfileResponse> { StatusCode = StatusEnum.Success, Status = true, Message = "Customer profile fetched successfully.", Data = customerProfile };
        }

        public async Task<ApiResponse> UpdateProfile(UpdateCustomerRequest request)
        {
            var loggedInUser = await ValidateRequest();
            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(loggedInUser.Email);

            var aspUser = await _unitOfWork.ManageUserRepo.GetAuthUserByEmail(customer.Email);
            if (aspUser is null)
                return new ApiResponse("Customer record not found.", StatusEnum.NoRecordFound, false);

            //Update Customer table
            customer.Address = string.IsNullOrWhiteSpace(request.Address) ? customer.Address : request.Address;
            customer.DateOfBirth = string.IsNullOrWhiteSpace(request.DateOfBirth) ? customer.DateOfBirth : request.DateOfBirth;
            customer.Email = string.IsNullOrWhiteSpace(request.Email) ? customer.Email : request.Email;
            customer.FirstName = string.IsNullOrWhiteSpace(request.FirstName) ? customer.FirstName : request.FirstName;
            customer.LastName = string.IsNullOrWhiteSpace(request.LastName) ? customer.LastName : request.LastName;
            customer.PhoneNumber = string.IsNullOrWhiteSpace(request.PhoneNumber) ? customer.PhoneNumber : request.PhoneNumber;
            customer.Status = (int)EntityStatusEnum.Active;
            customer.TimeUpdated = DateTime.Now;

            await _unitOfWork.ManageUserRepo.UpdateCustomer(customer);

            //Update AspNetUser table
            aspUser.FirstName = request.FirstName ?? aspUser.FirstName;
            aspUser.LastName = request.LastName ?? aspUser.LastName;
            aspUser.PhoneNumber = request.PhoneNumber ?? aspUser.PhoneNumber;

            var result = await _userManager.UpdateAsync(aspUser);

            if (result.Succeeded)
                return new ApiResponse("Customer Profile updated successfully.", StatusEnum.Success, true);
            else
            {
                var errorMessage = result.Errors.Select(c => c.Description).FirstOrDefault();
                return new ApiResponse(errorMessage ?? "", StatusEnum.ServerError, false);
            }
        }

        static ApiResponse ValidateCustomerRequest(CreateCustomerRequest request)
        {
            if (string.IsNullOrEmpty(request.FirstName))
                return new ApiResponse("First name is required.", StatusEnum.Validation, false);

            else if (string.IsNullOrEmpty(request.LastName))
                return new ApiResponse("Last name is required.", StatusEnum.Validation, false);

            else if (string.IsNullOrEmpty(request.Email))
                return new ApiResponse("Email is required.", StatusEnum.Validation, false);

            else if (!request.Email.IsValidEmail())
                return new ApiResponse("Invalid email address.", StatusEnum.Validation, false);

            else if (!request.PhoneNumber.IsValidPhoneNumber())
                return new ApiResponse("Invalid phone number.", StatusEnum.Validation, false);
            else
                return new ApiResponse("Validation passed", StatusEnum.Success, true);
        }

        public async Task<UserRequestDto> ValidateRequest()
        {
            ////Validate ClientSetUps here : TODO after admin part Completed
            var res = new UserRequestDto();
            string AuthToken = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            if (string.IsNullOrWhiteSpace(AuthToken)) throw new ApiGenericException(GenericStrings.InvalidUserRequest);
            var rs = await _generateTokenService.GetUserTokenParams(AuthToken);
            if (rs != null)
            {
                var customer = await _unitOfWork.ManageUserRepo.GetCustomer(rs.UserName);
                if (customer != null)
                {
                    res.UserId = customer.UserId;
                    res.PhoneNumber = customer.PhoneNumber;
                    res.FirstName = customer.FirstName;
                    res.Email = customer.Email;
                    res.LastName = customer.LastName;
                    res.Photo = customer.Photo;
                    res.CreateDateTime = customer.TimeCreated;
                    res.IsCompany = customer.IsAdmin == 1 ? "Yes" : "No";
                }
                else
                    throw new ApiGenericException("User is null");
            }

            else throw new ApiGenericException(GenericStrings.InvalidUserRequest);
            return res;
        }
        public async Task<UserRequestDto> GetShipperDetailByQuote(string shipmentId)
        {
            ////Validate ClientSetUps here : TODO after admin part Completed
            var res = new UserRequestDto();

            var shipper = await _unitOfWork.ManageShipmentRepo.GetShipment(shipmentId);
            if (shipper == null)
                throw new ApiGenericException("Shipment not found");
            var customer = await _unitOfWork.ManageUserRepo.GetCustomer(null, shipper.UserId);
            if (customer != null)
            {
                res.UserId = customer.UserId;
                res.PhoneNumber = customer.PhoneNumber;
                res.FirstName = customer.FirstName;
                res.Email = customer.Email;
                res.LastName = customer.LastName;
                res.Photo = customer.Photo;
                res.CreateDateTime = customer.TimeCreated;
                res.IsCompany = customer.IsAdmin == 1 ? "Yes" : "No";
            }
            else
                throw new ApiGenericException("User is null");
            return res;
        }

        private async Task SendOTPCodeAsync(SendOtpRequest request)
        {
            await _unitOfWork.ManageUserRepo.UpdateOTP(request);

            //OtpVerificationLog verificationLog = new()
            //{
            //    UserId = request.UserId,
            //    Recipient = request.UserEmail!,
            //    Purpose = request.Purpose,
            //    Code = request.Code,
            //    Status = OtpCodeStatusEnum.Sent,
            //    TimeCreated = DateTime.UtcNow,
            //    TimeUpdated = DateTime.UtcNow,
            //};

            //await _unitOfWork.ManageUserRepo.AddOTP(verificationLog);
        }
    }

}
