using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.RequestDtos
{
    public class UserRequestDto
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Photo { get; set; }
        public string? IsCompany { get; set; }
        public string? UserId { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }

}
