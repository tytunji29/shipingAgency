using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.ResponseDtos
{
    public class ManagementDto
    {
        public string UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        // public string RoleId { get; set; }
        public string? RoleName { get; set; }
        public string ProfileImage { get; set; } = "https://res.cloudinary.com/lomee31/image/upload/v1732229045/Logo2_kbnz7t.png";
    }
    public class LoginDto
    {
        public bool IsLocked { get; set; }
        public bool IsLoggedIn { get; set; }
        public string AuthToken { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; } 
    }
    public class RoleDto
    {
        public string Name { get; set; } = string.Empty;
        public string RoleId { get; set; }
    }
}
