using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vubids.Domain.Entities;

namespace Vubids.Domain.Interfaces.IRepositories
{
    public interface IManageChatMessageRepo
    {
        Task Add(ChatMessage request);
        Task<ChatMessage> ArchiveMessage(int messageId);
        Task<IEnumerable<ChatMessage>> GetChatHistory(long senderId, long receiverId);
        Task<IEnumerable<ChatMessage>> GetArchivedMessages(long userId);
        Task<IEnumerable<ChatMessage>> SearchMessages(long userId, string keyword);
    }
}
