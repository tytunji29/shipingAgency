"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountSettingsForm from "./account-settings-form"
import NotificationPreference from "./notification-preference"

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="max-w-2xl ">
      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
          <TabsTrigger value="account"><p className="text-black">Account Settings</p></TabsTrigger>
          <TabsTrigger value="notification"><p className="text-black">Notification Preference</p></TabsTrigger>
        </TabsList>

        <h2 className="text-xl font-medium mb-6">
          {activeTab === "account" ? "Account Settings" : "Account Settings"}
        </h2>

        <TabsContent value="account">
          <AccountSettingsForm />
        </TabsContent>

        <TabsContent value="notification">
          <NotificationPreference />
        </TabsContent>
      </Tabs>
    </div>
  )
}

