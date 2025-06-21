"use client";

import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/stats-card";
import AcceptedBidding from "@/components/accepted-bidding";
import CurrentJob from "@/components/current-job";
import RecentShipment from "@/components/recent-shipment";
import Delivery from "@/components/delivery";
import { useAppContext } from "@/context/AppContext";

export default function Dashboard() {
  const { state, logoutUser } = useAppContext();

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome, {state.user?.firstName} {state.user?.lastName}
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="bg-[#0E1E3F] hover:bg-navy/90 text-xs text-white rounded-md flex items-center gap-2">
            <Plus className="h-3 w-3" />
            Post a New Job
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-800">Quick Stats</h2>
          <Tabs defaultValue="month">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="day" className="text-xs">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Active" value="30" percentage={40} icon="truck" bgColor="bg-[#F4F8FF]" />
          <StatsCard title="Pending" value="52" percentage={40} icon="hourglass" color="yellow" bgColor="bg-[#FFFCF2]" />
          <StatsCard title="Completed" value="126" percentage={40} icon="check-circle" color="green" bgColor="bg-[#F1FFF1]" />
          <StatsCard title="Canceled" value="24" percentage={40} icon="x-circle" color="red" bgColor="bg-[#FFF4F4]" />
        </div>
      </div>

      {/* Delivery and Current Job */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <Delivery />
        <AcceptedBidding />
        <CurrentJob />
      </div>

      {/* Recent Shipment */}
      <RecentShipment />
    </div>
  );
}
