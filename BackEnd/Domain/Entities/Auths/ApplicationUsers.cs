using Microsoft.AspNetCore.Identity;

namespace Vubids.Domain.Entities.Auths
{
    public class ApplicationUsers : IdentityUser
    {
        public DateTime CreateDateTime { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Photo { get; set; }
    }
}
