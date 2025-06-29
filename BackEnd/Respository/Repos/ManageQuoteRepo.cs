using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageQuoteRepo : IManageQuoteRepo
    {
        private readonly JetSendDbContext _db;

        public ManageQuoteRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<QuoteResponseDto>> GetQuotes(string? status)
        {
            var query = from shipment in _db.Shipments
                        join quote in _db.Quotes
                        on shipment.ShipmentId equals quote.ShipmentId
                        join transporter in _db.Transporters
                        on shipment.Id equals transporter.ShipmentId

                        select new QuoteResponseDto
                        {
                            ShipmentId = shipment.ShipmentId,
                            Transporter = transporter.Name,
                            DateSubmitted = quote.DateSubmitted,
                            QuoteId = quote.QuoteId,
                            Quote = shipment.Amount.ToString(),
                            Status = quote.Status
                        };
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status.ToLower() == status.ToLower());
            }

            return await query.ToListAsync();

        }

        public async Task<Quotes> Get(long quoteId)
        {
            return await _db.Quotes.FirstOrDefaultAsync(x => x.Id == quoteId);
        }
        public async Task<Quotes> Get(string quoteId)
        {
            return await _db.Quotes.FirstOrDefaultAsync(x => x.QuoteId == quoteId);
        }
        public async Task<bool> AddQuote(Quotes quoteId)
        {
            try
            {

                _db.Quotes.Add(quoteId);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task UpdateQuote(Quotes quote)
        {
            _db.Quotes.Update(quote);

            var shipment = _db.Shipments.FirstOrDefault(o => o.ShipmentId == quote.ShipmentId);
            shipment.Status = "Accepted";
            shipment.Amount = quote.Amount;
            shipment.TransporterId = quote.TransporterId;
            await _db.SaveChangesAsync();
        }
    }
}
