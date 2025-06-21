namespace Vubids.Domain.Entities
{
    public class Company : BaseEntity
    {
        public string TypeOfService { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
        public string NoOfVeicles { get; set; }
        public string LoadingNo { get; set; }
        public string Rate { get; set; }
        public string Availability { get; set; }
    }
}
