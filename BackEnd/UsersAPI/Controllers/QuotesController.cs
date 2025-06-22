using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
{
    [ApiController]
    public class QuotesController : APIBaseController
    {
        private readonly IQuoteService _quoteService;

        public QuotesController(IQuoteService quoteService)
        {
            _quoteService = quoteService;
        }

        [HttpGet("get-all-quotes")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuoteResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAll(string? status)
        {
            var response = await _quoteService.GetAll(status);
            return ResponseCode(response);
        }
        [HttpPost("add-quotes")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddQuote(Quotes quouteId)
        {
            var response = await _quoteService.AddQuote(quouteId);
            return ResponseCode(response);
        }
        [HttpPost("make-bid")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> MakeBid(QuotesFm quouteId)
        {
            var response = await _quoteService.AddQuote(quouteId);
            return ResponseCode(response);
        }
        [HttpPost("accept-bid")]
        [ProducesResponseType(typeof(ApiResponse<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AcceptBid(string quouteId)
        {
            var response = await _quoteService.AcceptBid(quouteId);
            return ResponseCode(response);
        }
    }
}
