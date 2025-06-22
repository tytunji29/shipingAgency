using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Dtos.RequestDtos.Account
{
    public class AddNewUserParam
    {
        public string RoleName { get; set; }
        public string UserName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
    }
    public class LoginParam
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
    }
    public class TokenParams
    {
        public string Email {  get; set; }  
        public string UserName { get; set; }
        public string AuthId { get; set; }
        public string? RoleName { get; set; }
    }
    public class ChangePasswordParam
    {
        public string Email { get; set; }
        public string NewPassWord { get; set; }
        public string OldPassWord { get; set; }

    }
}
