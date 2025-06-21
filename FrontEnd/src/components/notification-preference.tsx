"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function NotificationPreference() {
  return (
    <div className="space-y-6">
      <div className="space-y-2  w-[100%] flex items-center">
        <Label htmlFor="notification-methods" className="text-sm font-medium  w-[40%]">
          Choose notification methods
        </Label>
        <Select>
          <SelectTrigger id="notification-methods" className="w-[60%]">
            <SelectValue placeholder="Email, SMS, In-app..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="in-app">In-app</SelectItem>
            <SelectItem value="all">All methods</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-[#0e1c36] text-white">Save</Button>
      </div>
    </div>
  )
}
