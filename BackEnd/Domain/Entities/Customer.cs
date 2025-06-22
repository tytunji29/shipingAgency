using System.ComponentModel.DataAnnotations;

namespace JetSend.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string UserId { get; set; } = default!;
        [MaxLength(80)]
        public string Email { get; set; } = default!;
        [MaxLength(100)]
        public string FirstName { get; set; } = default!;
        [MaxLength(100)]
        public string LastName { get; set; } = default!;
        [MaxLength(30)]
        public string PhoneNumber { get; set; } = default!;
        public string? Photo { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? DateOfBirth { get; set; }
       // public int Status { get; set; }
       // public int IsAdmin { get; set; }
    }
}
