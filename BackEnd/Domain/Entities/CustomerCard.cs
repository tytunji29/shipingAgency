namespace Vubids.Domain.Entities;

public class CustomerCard : BaseEntity
{
    public string Name { get; set; }
    public string CardNumber { get; set; }
    public string ExpiryDate { get; set; }
    public string CVV { get; set; }
    public string UserId { get; set; }
}
