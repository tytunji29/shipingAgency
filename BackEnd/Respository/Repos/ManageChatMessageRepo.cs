using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Entities;
using JetSend.Domain.Exceptions;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageChatMessageRepo : IManageChatMessageRepo
    {
        private readonly JetSendDbContext _db;

        public ManageChatMessageRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task Add(ChatMessage request)
        {
            await _db.ChatMessages.AddAsync(request);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<ChatMessage>> GetChatHistory(long senderId, long receiverId)
        {
            var messages = await _db.ChatMessages
                .Where(m => ((m.SenderId == senderId && m.ReceiverId == receiverId) ||
                             (m.SenderId == receiverId && m.ReceiverId == senderId))
                             && !m.IsArchived) 
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }

        public async Task<ChatMessage> ArchiveMessage(int messageId)
        {
            var message = await _db.ChatMessages.FindAsync(messageId);

            message.IsArchived = true;

            _db.ChatMessages.Update(message);
            await _db.SaveChangesAsync();

            return message;
        }

        public async Task<IEnumerable<ChatMessage>> GetArchivedMessages(long userId)
        {
            var messages = await _db.ChatMessages
                .Where(m => (m.SenderId == userId || m.ReceiverId == userId) && m.IsArchived)
                .OrderByDescending(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<ChatMessage>> SearchMessages(long userId, string keyword)
        {
            var messages = await _db.ChatMessages
                .Where(m => (m.SenderId == userId || m.ReceiverId == userId) &&
                            m.Message.ToLower().Contains(keyword.ToLower()))
                .OrderByDescending(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }
    }
}
