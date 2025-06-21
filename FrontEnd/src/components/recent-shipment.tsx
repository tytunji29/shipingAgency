"use client"

import { useState } from "react"
import { Tv, Sofa, Bike, Car, ChevronUp, ChevronDown } from "lucide-react"

type ShipmentStatus = "Active" | "Pending" | "Completed" | "Canceled"

interface Shipment {
  id: number
  item: string
  icon: "tv" | "furniture" | "bike" | "car"
  pickup: string
  destination: string
  transporter: string
  price: string
  status: ShipmentStatus
}

export default function RecentShipment() {
  const [activeTab, setActiveTab] = useState<"All" | ShipmentStatus>("All")
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const shipments: Shipment[] = [
    {
      id: 1,
      item: "Samsung Tv sets",
      icon: "tv",
      pickup: "Abule Egba, Lagos",
      destination: "Sango, Ogun",
      transporter: "Gokada",
      price: "₦6,500",
      status: "Active",
    },
    {
      id: 2,
      item: "Furniture",
      icon: "furniture",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      transporter: "Uber.co",
      price: "₦11,500",
      status: "Pending",
    },
    {
      id: 3,
      item: "Kid Bike",
      icon: "bike",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      transporter: "Redstar express",
      price: "₦9,800",
      status: "Canceled",
    },
    {
      id: 4,
      item: "Totalled Mercedes benz",
      icon: "car",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      transporter: "GIG Logistics",
      price: "₦4,500",
      status: "Completed",
    },
  ]

  const filteredShipments =
    activeTab === "All" ? shipments : shipments.filter((shipment) => shipment.status === activeTab)

  const getIcon = (icon: string) => {
    switch (icon) {
      case "tv":
        return <Tv className="h-4 w-4" />
      case "furniture":
        return <Sofa className="h-4 w-4" />
      case "bike":
        return <Bike className="h-4 w-4" />
      case "car":
        return <Car className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case "Active":
        return "text-blue-600 bg-blue-100 px-4 py-0.5"
      case "Pending":
        return "text-yellow-600 bg-yellow-100 px-4 py-0.5"
      case "Completed":
        return "text-green-600 bg-green-100 px-4 py-0.5"
      case "Canceled":
        return "text-red-600 bg-red-100 px-4 py-0.5"
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className="mb-10">
      <h2 className="text-sm font-medium text-gray-800 mb-4">Recent Shipment</h2>

      {/* Scrollable Tabs */}
      <div className="flex overflow-x-auto border-b mb-4 no-scrollbar">
        {["All", "Active", "Pending", "Completed", "Canceled"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as "All" | ShipmentStatus)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop Table (hidden on small screens) */}
      <div className="hidden md:block bg-white rounded-lg border overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-6 bg-gray-50 p-4 text-[13px] text-gray-500 font-medium">
          <div className="flex items-center">
            Item <ChevronUp className="h-4 w-4 ml-1" />
          </div>
          <div className="flex items-center">
            Pick up <ChevronUp className="h-4 w-4 ml-1" />
          </div>
          <div className="flex items-center">
            Destination <ChevronUp className="h-4 w-4 ml-1" />
          </div>
          <div className="flex items-center">
            Transporter <ChevronUp className="h-4 w-4 ml-1" />
          </div>
          <div className="flex items-center">
            Price <ChevronUp className="h-4 w-4 ml-1" />
          </div>
          <div>Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredShipments.map((shipment) => (
            <div key={shipment.id} className="grid grid-cols-6 p-4 items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                  {getIcon(shipment.icon)}
                </div>
                <span className="font-medium text-xs">{shipment.item}</span>
              </div>
              <div className="text-xs">{shipment.pickup}</div>
              <div className="text-xs">{shipment.destination}</div>
              <div className="text-xs">{shipment.transporter}</div>
              <div className="text-xs">{shipment.price}</div>
              <div className={`font-medium text-xs rounded-full w-fit flex justify-center items-center ${getStatusColor(shipment.status)}`}>{shipment.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Cards (shown on small screens) */}
      <div className="md:hidden space-y-4">
        {filteredShipments.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-lg border overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleExpand(shipment.id)}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                  {getIcon(shipment.icon)}
                </div>
                <div>
                  <span className="font-medium text-xs block">{shipment.item}</span>
                  <span className="text-xs text-gray-500">{shipment.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`font-medium text-xs rounded-full w-fit flex justify-center items-center ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </div>
                {expandedItem === shipment.id ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </div>
            </div>
            
            {expandedItem === shipment.id && (
              <div className="p-4 pt-0 bg-gray-50 space-y-3 text-xs">
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Pick up:</span>
                  <span className="col-span-2">{shipment.pickup}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Destination:</span>
                  <span className="col-span-2">{shipment.destination}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Transporter:</span>
                  <span className="col-span-2">{shipment.transporter}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredShipments.length === 0 && (
        <div className="bg-white rounded-lg border p-8 text-center text-gray-500">
          No shipments found for the selected filter.
        </div>
      )}
    </div>
  )
}