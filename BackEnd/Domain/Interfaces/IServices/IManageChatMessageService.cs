using Vubids.Core.Infranstructure.Common;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IManageChatMessageService
    {
        Task<ApiResponse> SendMessage(ChatMessage message);
        Task<ApiResponse<IEnumerable<ChatMessage>>> GetChatHistory(long senderId, long receiverId);
        Task<ApiResponse<IEnumerable<ChatMessage>>> GetArchivedMessage(long userId);
        Task<ApiResponse<IEnumerable<ChatMessage>>> SearchMessages(long userId, string searchTerm);
        Task<ApiResponse> ArhciveMessage(int messageId);
    }
}
