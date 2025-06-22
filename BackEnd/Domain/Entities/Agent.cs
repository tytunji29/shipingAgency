using System.ComponentModel.DataAnnotations;
using Vubids.Core.Infranstructure.Common.Enums;

namespace Vubids.Domain.Entities
{
    public class Agent : BaseEntity
    {
        [MaxLength(50)]
        public string UserId { get; set; } = default!;
        [MaxLength(50)]
        public string FirstName { get; set; } = default!;
        [MaxLength(50)]
        public string LastName { get; set; } = default!;
        [MaxLength(75)]
        public string Email { get; set; } = default!;
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = default!;
        [MaxLength(20)]
        public string NationalIdentityNumber { get; set; } = default!;
        [MaxLength(100)]
        public string? Photo { get; set; }
        [MaxLength(15)]
        public string Gender { get; set; } = default!;
        [MaxLength(500)]
        public int RegionState { get; set; } 
        [MaxLength(500)]
        public int RegionLgaId { get; set; }
        [MaxLength(50)]
        public string? DriverLicenseImage { get; set; }
        [MaxLength(50)]
        public string? PlateNumber { get; set; }
        public EntityStatusEnum Status { get; set; }
        public string ApprovedBy { get; set; } = default!;
    }

    public class AgentBankDetail : BaseEntity
    {
        public long AgentId { get; set; }
        [MaxLength(50)]
        public string BankName { get; set; } = default!;
        [MaxLength(50)]
        public string AccountName { get; set; } = default!;
        [MaxLength(50)]
        public string AccountNumber { get; set; } = default!;

    }
}
