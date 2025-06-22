﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetSend.Domain.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public long SenderId { get; set; }
        public long ReceiverId { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsArchived { get; set; } = false;
    }
}
