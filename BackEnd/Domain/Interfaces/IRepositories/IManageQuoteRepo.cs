
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageQuoteRepo
    {
        Task<IEnumerable<QuoteResponseDto>> GetQuotes(string? status);
        Task<Quotes> Get(long quoteId);
        Task<Quotes> Get(string quoteId);
        Task<bool> AddQuote(Quotes quoteId);
        Task UpdateQuote(Quotes quote);
    }
}
