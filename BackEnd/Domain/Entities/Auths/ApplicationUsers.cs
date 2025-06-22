using Microsoft.AspNetCore.Identity;

namespace JetSend.Domain.Entities.Auths
{
    public class ApplicationUsers : IdentityUser
    {
        public DateTime CreateDateTime { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? Photo { get; set; }
    }  
    public class ApplicationUsersRole : IdentityRole
    {
    }
}
