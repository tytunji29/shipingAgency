using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Dtos.ResponseDtos;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IQuoteService
    {
        Task<ApiResponse<IEnumerable<QuoteResponseDto>>> GetAll(string? status);
        Task<ApiResponse> AcceptBid(long quoteId);
        Task<ApiResponse> AcceptBid(string quoteId);
        Task<ApiResponse> AddQuote(Quotes quoteId);
        Task<ApiResponse> AddQuote(QuotesFm quoteId);
    }
}
