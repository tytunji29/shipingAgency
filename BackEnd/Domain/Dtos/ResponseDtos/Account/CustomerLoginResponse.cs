using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Dtos.ResponseDtos.Account
{
    public record CustomerLoginResponse
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string UserId { get; set; } = default!;
        public string CustomerId { get; set; }
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string? Photo { get; set; }
        public string? Token { get; set; }
        public string? IsCompany { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }

    public record CustomerProfileResponse
    {
        public string UserId { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string? Gender { get; set; }
        public string? Photo { get; set; }
        public string? Address { get; set; }
        public string? DateOfBirth { get; set; }
        public string? IsCompany { get; set; }
    }

    public record AgentProfileResponse : CustomerProfileResponse
    {
        public string? DriverLicense { get; set; }
        public string? PlateNumber { get; set; }
    }

    public class AgentBank
    {
        public long Id { get; set; }
        public string BankName { get; set; } = default!;
        public string AccountName { get; set; } = default!;
        public string AccountNumber { get; set; } = default!;
    }

    public record AgentLoginResponse
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string UserId { get; set; } = default!;
        public long AgentId { get; set; }
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string? Photo { get; set; }
        public string? Token { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }

}
