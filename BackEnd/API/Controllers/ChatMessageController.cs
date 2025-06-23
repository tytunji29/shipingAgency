using Microsoft.AspNetCore.Mvc;
using System.Net;
using JetSend.Core.Infranstructure.Common;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;

namespace JetSend.API.Controllers
{
    [ApiController]
    public class ChatMessageController : APIBaseController
    {
        private readonly IManageChatMessageService _manageChatMessageService;
        public ChatMessageController(IManageChatMessageService manageChatMessageService)
        {
            _manageChatMessageService = manageChatMessageService;
        }

        [HttpPost("send")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SendMessage([FromBody] ChatMessage message)
        {
            var response = await _manageChatMessageService.SendMessage(message);
            return ResponseCode(response);
        }

        [HttpGet("history/{senderId}/{receiverId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ChatMessage>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetChatHistory(long senderId, long receiverId)
        {
            var response = await _manageChatMessageService.GetChatHistory(senderId, receiverId);
            return ResponseCode(response);
        }

        [HttpPost("archive/{messageId}")]
        [ProducesResponseType(typeof(ApiResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ArchiveMessage(int messageId)
        {
            var response = await _manageChatMessageService.ArhciveMessage(messageId);
            return ResponseCode(response);
        }

        [HttpPost("archived/{userId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ChatMessage>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetArchiveMessage(int messageId)
        {
            var response = await _manageChatMessageService.GetArchivedMessage(messageId);
            return ResponseCode(response);
        }

        [HttpGet("search/{userId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ChatMessage>>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Search(long userId, string searchTerm)
        {
            var response = await _manageChatMessageService.SearchMessages(userId, searchTerm);
            return ResponseCode(response);
        }
    }
}
