"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  company: string
  date: string
  time: string
  message: string
  timeAgo: string
  trackingNumber: string
  status: string
  origin: string
  destination: string
  isRead: boolean
}

interface MessageListProps {
  onSelectMessage: (messageId: string) => void
  selectedMessageId: string | null
}

export default function MessageList({ onSelectMessage, selectedMessageId }: MessageListProps) {
  const messages: Message[] = [
    {
      id: "1",
      company: "Gokada Logistics",
      date: "20/02/2025",
      time: "10:00 AM",
      message: "Your shipment is on its way.",
      timeAgo: "1min ago",
      trackingNumber: "SHIP132990336R",
      status: "In-Transit",
      origin: "Ikeja",
      destination: "Mushin",
      isRead: false,
    },
    {
      id: "2",
      company: "Gokada Logistics",
      date: "20/02/2025",
      time: "09:45 AM",
      message: "Your shipment has been picked up.",
      timeAgo: "16min ago",
      trackingNumber: "SHIP132990337R",
      status: "Picked Up",
      origin: "Lekki",
      destination: "Victoria Island",
      isRead: true,
    },
    {
      id: "3",
      company: "Gokada Logistics",
      date: "20/02/2025",
      time: "09:15 AM",
      message: "Your shipment is out for delivery.",
      timeAgo: "46min ago",
      trackingNumber: "SHIP132990338R",
      status: "Out for Delivery",
      origin: "Yaba",
      destination: "Surulere",
      isRead: true,
    },
    {
      id: "4",
      company: "Gokada Logistics",
      date: "20/02/2025",
      time: "08:30 AM",
      message: "Your shipment has been delivered.",
      timeAgo: "1hr 31min ago",
      trackingNumber: "SHIP132990339R",
      status: "Delivered",
      origin: "Ikeja",
      destination: "Ikoyi",
      isRead: true,
    },
    {
      id: "5",
      company: "Gokada Logistics",
      date: "19/02/2025",
      time: "16:45 PM",
      message: "Your shipment is delayed.",
      timeAgo: "17hr 26min ago",
      trackingNumber: "SHIP132990340R",
      status: "Delayed",
      origin: "Apapa",
      destination: "Ajah",
      isRead: true,
    },
    {
      id: "6",
      company: "Gokada Logistics",
      date: "19/02/2025",
      time: "14:20 PM",
      message: "Your shipment is ready for pickup.",
      timeAgo: "19hr 41min ago",
      trackingNumber: "SHIP132990341R",
      status: "Ready for Pickup",
      origin: "Ikeja",
      destination: "Self Pickup - Ikeja Hub",
      isRead: true,
    },
  ]

  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "px-3 py-2 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors",
            selectedMessageId === message.id && "bg-muted/50",
            !message.isRead && "border-[1px] border-gray-200",
          )}
          onClick={() => onSelectMessage(message.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">{message.company}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {message.date} {message.time}
              </p>
              <p className="mt-1 text-sm text-gray-700">{message.message}</p>
              {/* <p className="text-xs text-muted-foreground mt-1">
                <span
                  className={cn(
                    "inline-block px-1.5 py-0.5 rounded-full text-xs mr-1",
                    message.status === "Delivered" && "bg-green-100 text-green-800",
                    message.status === "In-Transit" && "bg-blue-100 text-blue-800",
                    message.status === "Delayed" && "bg-red-100 text-red-800",
                    message.status === "Picked Up" && "bg-purple-100 text-purple-800",
                    message.status === "Out for Delivery" && "bg-yellow-100 text-yellow-800",
                    message.status === "Ready for Pickup" && "bg-orange-100 text-orange-800",
                  )}
                >
                  {message.status}
                </span>
                {message.trackingNumber}
              </p> */}
            </div>
            <span className="text-xs text-gray-500">{message.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  )
}