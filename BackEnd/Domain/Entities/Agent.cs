using System.ComponentModel.DataAnnotations;
using JetSend.Core.Infranstructure.Common.Enums;

namespace JetSend.Domain.Entities
{
    public class Agent : BaseEntity
    {
        [MaxLength(40)]
        public string UserId { get; set; } = default!;
        [MaxLength(50)]
        public string FirstName { get; set; } = default!;
        [MaxLength(50)]
        public string LastName { get; set; } = default!;
        [MaxLength(75)]
        public string Email { get; set; } = default!;
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = default!;
        public string NationalIdentityNumber { get; set; } = default!;
        public string? Photo { get; set; }
        [MaxLength(15)]
        public string Gender { get; set; } = default!;
        [MaxLength(15)]
        public string DateOfBirth { get; set; } = default!;
        public string RegionState { get; set; }
        public string RegionLgaId { get; set; }
        public string VehicleTypeId { get; set; }
        public string? DriverLicenseImage { get; set; }
        [MaxLength(500)]
        public string? HouseAddress { get; set; }
        [MaxLength(50)]
        public string? PlateNumber { get; set; }
        public EntityStatusEnum Status { get; set; }
        public string? ApprovedBy { get; set; } 
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
