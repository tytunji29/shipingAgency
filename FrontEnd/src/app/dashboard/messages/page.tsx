"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import MessageList from "@/components/message-list"
import MessageDetail from "@/components/message-detail"

export type MessagesPath = "inbox" | "company" | "archived"

export default function LogisticsTracker() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  )

  const tabTriggers = [
    {
      label: "Inbox",
      value: "inbox",
    },
    {
      label: "Transport Company",
      value: "company",
    },
    {
      label: "Archived",
      value: "archived",
    },
  ] as { label: string; value: MessagesPath }[]

  return (
    <div className="flex h-screen w-full">
      {/* Left sidebar */}
      <div className="w-full md:w-[380px] border-r flex flex-col">
        <div className="p-4">
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              {tabTriggers.map((trigger, _i) => (
                <TabsTrigger
                  className="text-xs "
                  key={_i}
                  value={trigger.value}
                >
                  <p className="text-black">{trigger.label}</p>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative mt-4 flex items-center ">
              <Search className="absolute left-2.5 top-2.5 h-3 w-3 mt-1 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversation"
                className="pl-8 bg-muted/40 border-0"
              />
            </div>

            <TabsContent value="inbox" className="text-xs">
              <div className="flex-1 overflow-auto">
                <div className="px- pb-4">
                  <h2 className="text-xs font-medium">Today</h2>
                </div>
                <MessageList 
                  onSelectMessage={setSelectedMessageId} 
                  selectedMessageId={selectedMessageId} 
                />
              </div>
            </TabsContent>

            <TabsContent value="company" className="text-xs">
              <div className="flex-1 overflow-auto">
                <div className="px-4 py-2">
                  <h2 className="text-xs font-medium">Transport Company</h2>
                </div>
                {/* <MessageList /> */}
              </div>
            </TabsContent>

            <TabsContent value="archived" className="text-xs">
              <div className="flex-1 overflow-auto">
                <div className="px-4 py-2">
                  <h2 className="text-xs font-medium">Archived</h2>
                </div>
                {/* <MessageList /> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right content area */}
      <div className="hidden md:flex flex-col flex-1">
        <MessageDetail messageId={selectedMessageId} />
      </div>
    </div>
  )
}