namespace Vubids.Domain.Dtos.RequestDtos
{
    public class AddCustomerCardRequestDto
    {
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public string Expiry { get; set; }
        public string CVV { get; set; }
    }
}
