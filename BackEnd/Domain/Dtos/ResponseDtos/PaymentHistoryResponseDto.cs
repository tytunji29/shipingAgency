namespace JetSend.Domain.Dtos.ResponseDtos
{
    public class PaymentHistoryResponseDto
    {
        public string PaymentId { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string ShipmemtId { get; set; }
        public string Receiver { get; set; }
        public string Amount { get; set; }
        public string DeliveryAddress { get; set; }
    }
}
