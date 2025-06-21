using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vubids.Domain.Entities.Auths
{
    public class Management : BaseEntity
    {
        public string AccountId { get; set; }
        public string UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string RoleId { get; set; }
    }
}
