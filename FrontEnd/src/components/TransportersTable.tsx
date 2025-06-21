"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import ReviewsModal from "./reviews-modal"
import ContactModal from "./contact-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// Define the data structure
type Transporter = {
  id: string
  name: string
  shipmentId: string
  vehicleInfo: string
  estimatedDelivery: string
  status: "Delivered" | "In-Transit"
}

// Sample data
const transporters: Transporter[] = [
  {
    id: "1",
    name: "Gokada",
    shipmentId: "SHIP12345",
    vehicleInfo: "Toyota Hilux",
    estimatedDelivery: "2025-02-18",
    status: "Delivered",
  },
  {
    id: "2",
    name: "Uber.co",
    shipmentId: "SHIP12346",
    vehicleInfo: "Mercedes Sprinter",
    estimatedDelivery: "2025-02-19",
    status: "In-Transit",
  },
  {
    id: "3",
    name: "Redstar express",
    shipmentId: "SHIP12347",
    vehicleInfo: "Toyota Sienna",
    estimatedDelivery: "2025-02-20",
    status: "In-Transit",
  },
  {
    id: "4",
    name: "Redstar express",
    shipmentId: "SHIP12347",
    vehicleInfo: "Acura",
    estimatedDelivery: "2025-02-20",
    status: "Delivered",
  },
  {
    id: "5",
    name: "GiG Logistics",
    shipmentId: "SHIP12348",
    vehicleInfo: "Space Wagon",
    estimatedDelivery: "2025-02-21",
    status: "Delivered",
  },
]

export default function TransportersTable() {
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const handleViewReviews = (transporter: Transporter) => {
    setSelectedTransporter(transporter)
    setShowReviewsModal(true)
  }

  const handleContactTransporter = (transporter: Transporter) => {
    setSelectedTransporter(transporter)
    setShowContactModal(true)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-slate-700">Accepted Transporters</h1>

      <div className="rounded-md border ">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="font-medium text-slate-600">
                  <div className="flex items-center gap-1">
                    Transporter
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-slate-600">
                  <div className="flex items-center gap-1">
                    Shipment ID
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-slate-600">
                  <div className="flex items-center gap-1">
                    Vehicle Info
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-slate-600">
                  <div className="flex items-center gap-1">
                    Estimated Delivery
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-slate-600">Status</TableHead>
                <TableHead className="font-medium text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transporters.map((transporter) => (
                <TableRow key={transporter.id + transporter.vehicleInfo} className="border-b">
                  <TableCell className="font-medium">{transporter.name}</TableCell>
                  <TableCell>{transporter.shipmentId}</TableCell>
                  <TableCell>{transporter.vehicleInfo}</TableCell>
                  <TableCell>{transporter.estimatedDelivery}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transporter.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {transporter.status}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2 flex ">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReviews(transporter)}
                      className="text-slate-500 hover:text-slate-700 "
                    >
                      View Reviews
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactTransporter(transporter)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      Contact Transporter
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {transporters.map((transporter) => (
            <div key={transporter.id + transporter.vehicleInfo} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{transporter.name}</h3>
                  <p className="text-sm text-slate-500">{transporter.shipmentId}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transporter.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {transporter.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-500">Vehicle</p>
                  <p>{transporter.vehicleInfo}</p>
                </div>
                <div>
                  <p className="text-slate-500">Delivery Date</p>
                  <p>{transporter.estimatedDelivery}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => handleViewReviews(transporter)} className="text-xs">
                  View Reviews
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContactTransporter(transporter)}
                  className="text-xs"
                >
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedTransporter && (
        <>
          <ReviewsModal
            transporter={selectedTransporter}
            isOpen={showReviewsModal}
            onClose={() => setShowReviewsModal(false)}
          />
          <ContactModal
            transporter={selectedTransporter}
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
        </>
      )}
    </div>
  )
}

