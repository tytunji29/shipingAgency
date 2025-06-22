using System.ComponentModel.DataAnnotations;
using JetSend.Core.Infranstructure.Common.Enums;


namespace JetSend.Domain.Entities.Auths
{
    public class OtpVerificationLog : BaseEntity
    {
        [MaxLength(75)]
        public string Recipient { get; set; } = default!;
        [MaxLength(100)]
        public string? UserId { get; set; }
        [MaxLength(10)]
        public string Code { get; set; } = default!;
        public OtpCodeStatusEnum Status { get; set; }
        public OtpVerificationPurposeEnum Purpose { get; set; }
        public DateTimeOffset? ConfirmedOn { get; set; }
    }
}
