using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class ChatHub : Hub
    {
        // Store connected users
        private static Dictionary<string, string> ConnectedUsers = new Dictionary<string, string>();

        // Called when a user connects to SignalR
        public override async Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;
            if (!string.IsNullOrEmpty(userId))
            {
                ConnectedUsers[userId] = Context.ConnectionId;
            }

            await Clients.Caller.SendAsync("Connected", "You are now connected to the chat");
            await base.OnConnectedAsync();
        }

        // Called when a user disconnects
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.UserIdentifier;
            if (!string.IsNullOrEmpty(userId) && ConnectedUsers.ContainsKey(userId))
            {
                ConnectedUsers.Remove(userId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        // Send a message to a specific user
        public async Task SendMessage(long receiverId, long senderId, string message)
        {
            if (ConnectedUsers.TryGetValue(receiverId.ToString(), out string connectionId))
            {
                await Clients.Client(connectionId).SendAsync("ReceiveMessage", senderId, message);
            }
        }
    }
}
