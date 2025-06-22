using Microsoft.AspNetCore.SignalR;
using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;

namespace JetSendsServices
{
    public class ManageChatMessageService : IManageChatMessageService
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IUnitOfWork _unitOfWork;
        public ManageChatMessageService(IHubContext<ChatHub> hubContext, IUnitOfWork unitOfWork) 
        {
            _hubContext = hubContext;
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse> SendMessage(ChatMessage message)
        {
            if (string.IsNullOrWhiteSpace(message.Message))
            {
                return new ApiResponse("Message cannot be empty", StatusEnum.Failed, false);
            }
            await _unitOfWork.ManageChatMessageRepo.Add(message);
       
            // Send message via SignalR
            await _hubContext.Clients.User(message.ReceiverId.ToString())
                                            .SendAsync("ReceiveMessage", message.SenderId, message.Message);

            return new ApiResponse("Message Sent successfully", StatusEnum.Success, true);
        }

        public async Task<ApiResponse<IEnumerable<ChatMessage>>> GetChatHistory(long senderId, long receiverId)
        {
            var response = await _unitOfWork.ManageChatMessageRepo.GetChatHistory(senderId, receiverId);
            return new ApiResponse<IEnumerable<ChatMessage>> { Message = "Chat history returned successfully", Data = response, Status = true, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse<IEnumerable<ChatMessage>>> GetArchivedMessage(long userId)
        {
            var response = await _unitOfWork.ManageChatMessageRepo.GetArchivedMessages(userId);
            return new ApiResponse<IEnumerable<ChatMessage>> { Message = "Archived messsages returned successfully", Data = response, Status = true, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse<IEnumerable<ChatMessage>>> SearchMessages(long userId, string searchTerm)
        {
            var response = await _unitOfWork.ManageChatMessageRepo.SearchMessages(userId, searchTerm);
            return new ApiResponse<IEnumerable<ChatMessage>> { Message = "Search messsages returned successfully", Data = response, Status = true, StatusCode = StatusEnum.Success };
        }

        public async Task<ApiResponse> ArhciveMessage(int messageId)
        {
            await _unitOfWork.ManageChatMessageRepo.ArchiveMessage(messageId);
            return new ApiResponse ("Message archived successfully", StatusEnum.Success, true);
        }
    }
}
