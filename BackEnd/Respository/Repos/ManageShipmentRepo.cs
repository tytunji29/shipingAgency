using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageShipmentRepo : IManageShipmentRepo
    {
        private readonly JetSendDbContext _db;
        public ManageShipmentRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task AddshipmentAsync(Shipment request)
        {
            await _db.Shipments.AddAsync(request);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Shipment>> GetShipments()
        {
            var shipments = await _db.Shipments.ToListAsync();
            return shipments;
        }
        public async Task<Shipment> GetShipment(string shipId)
        {
            var shipments = await _db.Shipments.FirstOrDefaultAsync(o => o.ShipmentId == shipId);
            return shipments;
        }
        public async Task<IEnumerable<ShipmentResponsForLandingeDto>> GetShipmentsLanding()
        {
            var query = from s in _db.Shipments
                        join d in _db.DeliveryPickups on s.Id equals d.ShipmentId
                        join i in _db.ItemTypes on s.ItemId equals i.Id
                        join i0 in _db.ItemCategories on i.ItemCategoryId equals i0.Id
                        join c in _db.Customers on s.UserId equals c.UserId.ToString()
                        select new ShipmentResponsForLandingeDto
                        {
                            TimeCreated = s.TimeCreated,
                            UserId = s.UserId,
                            ShipmentId = s.ShipmentId,
                            From = d.PickUpAddress,
                            To = d.DeliveryAddress,
                            TransporterId = s.TransporterId,
                            Quote = s.Amount.ToString("F2"),
                            PickupDate = d.PickupDate,
                            DeliveryDate = d.DeliveryDate,
                            Status = s.Status,
                            Customer = $"{c.FirstName} {c.LastName}",
                            Item = new ItemCat
                            {
                                Name = i.Name,
                                Description = i0.Name
                            },
                            Quotes = _db.Quotes
                                .Where(q => q.ShipmentId == s.ShipmentId)
                                .Select(q => new ReturnQuotes
                                {
                                    QuoteId = q.QuoteId,
                                    ShipmentId = q.ShipmentId,
                                    TransporterId = q.TransporterId,
                                    Amount = q.Amount,
                                    DateSubmitted = q.DateSubmitted
                                }).ToList()
                        };

            var result = query.OrderBy(o=>o.TimeCreated);
            return result;
        }

        public async Task<IEnumerable<ShipmentResponseDto>> GetShipments(string? status)
        {
            var query = from shipment in _db.Shipments
                        join deliveryPickup in _db.DeliveryPickups
                        on shipment.Id equals deliveryPickup.ShipmentId
                        join transporter in _db.Transporters
                        on shipment.Id equals transporter.ShipmentId

                        select new ShipmentResponseDto
                        {
                            ShipmentId = shipment.ShipmentId,
                            Transporter = transporter.Name,
                            Pickup = deliveryPickup.PickUpAddress,
                            Destination = deliveryPickup.DeliveryAddress,
                            Quote = shipment.Amount.ToString(),
                            PickupDate = deliveryPickup.PickupDate,
                            DeliveryDate = deliveryPickup.DeliveryDate
                        };
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status.Equals(status, StringComparison.OrdinalIgnoreCase
                    ));
            }
            return await query.ToListAsync();
        }
    }
}
