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

        public async Task AddshipmentAsync(RateRider request)
        {
            await _db.RateRiders.AddAsync(request);
            await _db.SaveChangesAsync();
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
        public async Task<ShipmentDto?> GetShipmentLatest(string userId)
        {
            var res = new ShipmentDto();
            var rec = await _db.Shipments
     .AsNoTracking()
     .Where(o => o.UserId == userId && o.Status == "Completed")
     .OrderByDescending(o => o.TimeCreated)
     .FirstOrDefaultAsync();
            if (rec != null)
            {
                //check if the shipment has been rated
                var hasRated = await _db.RateRiders.AnyAsync(r => r.ShipmentId == rec.ShipmentId);
                if (hasRated)
                {
                    // If rated, return null
                    return res;
                }
                res.Transporter = rec.TransporterId;
                res.ShipmentId = rec.ShipmentId;
                var qu = _db.Quotes.FirstOrDefault(o => o.ShipmentId == rec.ShipmentId && o.TransporterId.ToLower().Trim() == rec.TransporterId.ToLower().ToLower());
                if (qu != null)
                    res.TransId = qu.TransId;
            }
            return res;
        }


        public async Task<IEnumerable<ShipmentResponsForLandingeDto>> GetShipmentsLanding()
        {
            var shipments = await (
                from s in _db.Shipments
                join d in _db.DeliveryPickups on s.Id equals d.ShipmentId
                join i in _db.ItemTypes on s.ItemTypeId equals i.Id
                join ic in _db.ItemCategories on i.ItemCategoryId equals ic.Id
                join c in _db.Customers on s.UserId equals c.UserId.ToString()
                select new
                {
                    s.TimeCreated,
                    s.UserId,
                    s.ShipmentId,
                    From = d.PickUpAddress,
                    To = d.DeliveryAddress,
                    s.TransporterId,
                    QuoteAmount = s.Amount,
                    d.PickupDate,
                    d.DeliveryDate,
                    s.Status,
                    CustomerName = $"{c.FirstName} {c.LastName}",
                    ItemName = i.Name,
                    ItemCategoryName = ic.Name
                }
            ).OrderBy(o => o.TimeCreated).ToListAsync();

            var shipmentIds = shipments.Select(s => s.ShipmentId).ToList();

            var transporterIds = shipments.Select(o => o.TransporterId).Distinct().ToList();


            var quotes = await _db.Quotes
                .Where(q => shipmentIds.Contains(q.ShipmentId))
                .Select(q => new ReturnQuotes
                {
                    QuoteId = q.QuoteId,
                    ShipmentId = q.ShipmentId,
                    TransId = q.TransId,
                    TransporterId = q.TransporterId,
                    Amount = q.Amount.ToString(),
                    RiderRating=!string.IsNullOrEmpty(q.TransporterRating)? q.TransporterRating:"0",
                    RiderRatingCount = !string.IsNullOrEmpty(q.RaterCount) ? q.RaterCount : "0",
                    DateSubmitted = q.DateSubmitted
                })
                .ToListAsync();

            var groupedQuotes = quotes.GroupBy(q => q.ShipmentId)
                                       .ToDictionary(g => g.Key, g => g.ToList());

            var result = shipments.Select(s => new ShipmentResponsForLandingeDto
            {
                TimeCreated = s.TimeCreated,
                UserId = s.UserId,
                ShipmentId = s.ShipmentId,
                From = s.From,
                To = s.To,
                TransporterId = s.TransporterId,
                Quote = s.QuoteAmount.ToString("F2"),
                PickupDate = s.PickupDate,
                DeliveryDate = s.DeliveryDate,
                Status = s.Status,
                Customer = s.CustomerName,
                Item = new ItemCat
                {
                    Name = s.ItemName,
                    Description = s.ItemCategoryName
                },
                Quotes = groupedQuotes.ContainsKey(s.ShipmentId) ? groupedQuotes[s.ShipmentId] : new List<ReturnQuotes>(),

            }).ToList();

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
