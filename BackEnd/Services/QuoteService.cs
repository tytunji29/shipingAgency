using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Entities;
using Twilio.TwiML.Voice;
using JetSendsServices.Extensions;
using Microsoft.Extensions.Configuration;

namespace JetSendsServices
{
    public class QuoteService : IQuoteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _auth;
        private readonly IConfiguration _config;
        public QuoteService(IUnitOfWork unitOfWork, IConfiguration config, IAuthService auth)
        {
            _unitOfWork = unitOfWork;
            _config = config;
            _auth = auth;
        }

        public async Task<ApiResponse<IEnumerable<QuoteResponseDto>>> GetAll(string? status)
        {
            var result = await _unitOfWork.ManageQuoteRepo.GetQuotes(status);
            return new ApiResponse<IEnumerable<QuoteResponseDto>> { Data = result, Status = true, StatusCode = StatusEnum.Success, Message = "Quotes retrieved succcessfully" };
        }

        public async Task<ApiResponse> AcceptBid(long quoteId)
        {
            var quote = await _unitOfWork.ManageQuoteRepo.Get(quoteId);
            if (quote == null)
                return new ApiResponse("Quote not found", StatusEnum.NoRecordFound, false);

            quote.Status = "Accepted";
            quote.IsAccepted = true;

            await _unitOfWork.ManageQuoteRepo.UpdateQuote(quote);

            return new ApiResponse("Quoted Accepted", StatusEnum.Success, true);
        }
        public async Task<ApiResponse> AcceptBid(string quoteId, int source)
        {
            //ValidateRequest();
            var quote = await _unitOfWork.ManageQuoteRepo.Get(quoteId);
            if (quote == null)
                return new ApiResponse("Quote not found", StatusEnum.NoRecordFound, false);
            quote.IsAccepted = true;
            quote.Amount = (Convert.ToDecimal(quote.Amount) * 1.10m);
            if(source==1)
            quote.Status = "Accepted";
            else
                quote.Status = "Completed";

            await _unitOfWork.ManageQuoteRepo.UpdateQuote(quote);

            return new ApiResponse("Quoted Accepted", StatusEnum.Success, true);
        }
        public async Task<ApiResponse> AddQuote(Quotes quoteId)
        {
            var quote = await _unitOfWork.ManageQuoteRepo.AddQuote(quoteId);

            return new ApiResponse("Quoted Added", StatusEnum.Success, true);
        }
        public async Task<ApiResponse> AddQuote(QuotesFm quoteId)
        {
            var user = await _auth.ValidateRequest();
            var userRec = await _auth.GetShipperDetailByQuote(quoteId.ShipmentId);
            Quotes qu = new Quotes();
            qu.TransporterId = user.FullName;
            qu.TransId = user.UserId.ToString();
            qu.ShipmentId = quoteId.ShipmentId;
            qu.Amount = Convert.ToDecimal(quoteId.Amount);
            qu.Status = "Pending";
            qu.IsAccepted = false;
            qu.QuoteId = Guid.NewGuid().ToString();
            qu.TimeCreated = DateTime.Now;
            qu.DateSubmitted = DateTime.Now.Date.ToString();
            var quote = await _unitOfWork.ManageQuoteRepo.AddQuote(qu);
            WhatsappNotification whatsappNotification = new WhatsappNotification(_config);
            whatsappNotification.SendAsync(
                body: $"Your Shipment with ID: {quoteId.ShipmentId}. As Been Bidded For",
                url: "http://localhost:3000/",
                to: userRec.PhoneNumber
            ).GetAwaiter().GetResult();
            return new ApiResponse("Quoted Added", StatusEnum.Success, true);
        }
    }
}
