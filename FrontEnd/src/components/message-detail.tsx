"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface MessageDetailProps {
  messageId: string | null;
}

export default function MessageDetail({ messageId }: MessageDetailProps) {
  const [message, setMessage] = useState("");

  // If no message is selected, return empty state
  if (!messageId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No message selected yet</p>
      </div>
    );
  }

  // Fake conversation data - in a real app, you would fetch this based on messageId
  const conversation = {
    company: "Gokada Logistics",
    email: "info@Gokadalogistics.com",
    messages: [
      {
        id: "msg1",
        sender: "company",
        timestamp: "09:45 AM",
        content:
          "Hi user, Your shipment is on it's way. This is to bring to your notice that your shipment with waybill number SHIP132990336R from Ikeja, current status is In-Transit to Mushin.",
        isRead: true,
      },
      {
        id: "msg2",
        sender: "user",
        timestamp: "09:50 AM",
        content: "Thank you for the update. When can I expect the delivery?",
        isRead: true,
      },
      {
        id: "msg3",
        sender: "company",
        timestamp: "09:55 AM",
        content:
          "Your shipment is expected to arrive at the destination between 2:00 PM and 4:00 PM today. You will receive another notification once it's delivered. The driver's contact is 08012345678 if you need to reach them directly.",
        isRead: true,
      },
      {
        id: "msg4",
        sender: "user",
        timestamp: "10:00 AM",
        content:
          "Perfect, thank you. Is there any way to track the shipment's real-time location?",
        isRead: true,
      },
      {
        id: "msg5",
        sender: "company",
        timestamp: "10:05 AM",
        content:
          "Yes, you can track your shipment in real-time by clicking on this link: tracking.gokada.ng/SHIP132990336R or by downloading our mobile app. The current location shows the package is at Ikorodu Road, approaching Mushin.",
        isRead: false,
      },
    ],
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic would go here
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src="/images/Avatar.png"
              alt={conversation.company}
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium text-sm">{conversation.company}</h2>
            <p className="text-xs text-muted-foreground">
              {conversation.email}
            </p>
          </div>
        </div>
        <Button variant="outline" className="text-xs h-[25px]">
          Archive
        </Button>
      </div>

      {/* Message thread */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "company" && (
              <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <Image
                  src="/images/Avatar.png"
                  alt={conversation.company}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}

            <div
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === "user" ? "bg-gray-200/10" : "bg-gray-200/50"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {msg.timestamp}
              </p>
            </div>

            {msg.sender === "user" && (
              <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <Image
                  src="/images/Avatar.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type message"
            className="min-h-[80px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            className="bg-[#0f172a] text-white text-xs hover:bg-[#1e293b] h-[30px]"
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
