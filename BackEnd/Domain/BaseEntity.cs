using System.ComponentModel.DataAnnotations;

namespace Vubids.Domain
{
    public class BaseEntity
    {
        [Key]
        public long Id { get; set; }
        public DateTime TimeCreated { get; set; } = DateTime.UtcNow;
        public DateTime TimeUpdated { get; set; }
    }
}
