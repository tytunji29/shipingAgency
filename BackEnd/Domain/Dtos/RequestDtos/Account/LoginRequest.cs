using Vubids.Core.Infranstructure.Common.Enums;
using Vubids.Domain.Entities;
using Vubids.Domain.Entities.Auths;

namespace Vubids.Domain.Dtos.RequestDtos.Account
{
    public record LoginRequest : ForgetPasswordRequest
    {
        public string Password { get; set; } = default!;
    }

    public record ForgetPasswordRequest
    {
        public string Email { get; set; } = default!;
    }

    public record CreateCustomerRequest
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Gender { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string DateOfBirth { get; set; } = default!;

        public ApplicationUsers ToUser()
        {
            return new ApplicationUsers
            {
                Email = Email,
                NormalizedEmail = Email.ToUpper(),
                UserName = Email,
                NormalizedUserName = Email.ToUpper(),
                PhoneNumber = PhoneNumber,
                FirstName = FirstName,
                LastName = LastName,
                CreateDateTime = DateTime.Now,
            };
        }

        public Customer ToCustomer(string userId)
        {
            return new Customer
            {
                UserId = userId,
                Email = Email,
                PhoneNumber = PhoneNumber,
                FirstName = FirstName,
                LastName = LastName,
                Gender = Gender,
                TimeCreated = DateTime.Now,
                TimeUpdated = DateTime.Now,
            };
        }
    }

    public record CreateCustomerCompanyRequest : CreateCustomerRequest
    {
        public string TypeOfService { get; set; }
        public string Region { get; set; }
        public string NoOfVeicles { get; set; }
        public string LoadingNo { get; set; }
        public string Rate { get; set; }
        public string Availability { get; set; }
    }

    public sealed record SendOtpRequest
    {
        public string? UserId { get; set; }
        public string FirstName { get; set; } = default!;
        public string UserEmail { get; set; } = default!;
        public string SenderName { get; set; } = default!;
        public string Code { get; set; } = default!;
        public string SendingMode { get; set; } = default!;
        public OtpVerificationPurposeEnum Purpose { get; set; }
    }

    public sealed record ValidateOtpRequest
    {
        public string? UserId { get; set; }
        public string Code { get; set; } = default!;
        public OtpVerificationPurposeEnum Purpose { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Code { get; set; } = default!;
        public string NewPassword { get; set; } = default!;
        public string ConfirmPassword { get; set; } = default!;
    }

    public record ChangePasswordRequest
    {
        public string CurrentPassword { get; set; } = default!;
        public string NewPassword { get; set; } = default!;
        public string ConfirmPassword { get; set; } = default!;
    }

    public record SimpleProfileResponse
    {
        public long CustomerId { get; set; }
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string UserId { get; set; } = default!;
    }

    public class UpdateCustomerRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string DateOfBirth { get; set; }

    }
}