using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Dtos.RequestDtos;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
{
    [ApiController]
    public class Paymentscontroller : APIBaseController
    {
        private readonly IPaymentService _paymentService;

        public Paymentscontroller(IPaymentService paymentService)
        {
            _paymentService = paymentService;   
        }


        [HttpGet("get-payments-history")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<PaymentHistoryResponseDto>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPaymentHistory(string? status)
        {
            var response = await _paymentService.GetPaymentHistory(status);
            return ResponseCode(response);
        }


        [HttpGet("get-payment-history/{Id}")]
        [ProducesResponseType(typeof(ApiResponse<PaymentHistoryResponseDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPaymentHistory(long Id)
        {
            var response = await _paymentService.GetPayment(Id);
            return ResponseCode(response);
        }

        [HttpPost("add-payment-detaills")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPayment(AddCustomerCardRequestDto request)
        {
            var response = await _paymentService.AddPaymentDetails(request);
            return ResponseCode(response);
        }
    }
}
