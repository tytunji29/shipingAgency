using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;

namespace JetSend.Domain.Interfaces.IServices
{
    public interface IQuoteService
    {
        Task<ApiResponse<IEnumerable<QuoteResponseDto>>> GetAll(string? status);
        Task<ApiResponse> AcceptBid(long quoteId);
        Task<ApiResponse> AcceptBid(string quoteId, int source);
        Task<ApiResponse> AddQuote(Quotes quoteId);
        Task<ApiResponse> AddQuote(QuotesFm quoteId);
    }
}
