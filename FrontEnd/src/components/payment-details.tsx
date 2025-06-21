"use client"

import { Button } from "@/components/ui/button"

interface PaymentDetailsProps {
  onClose: () => void
}

export default function PaymentDetails({ onClose }: PaymentDetailsProps) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Payment Details</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment ID:</span>
          <span className="font-medium">#PAY12345</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Date:</span>
          <span>2025-02-10</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="text-2xl font-bold">₦9,800</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status</span>
          <span className="px-2 py-1 rounded-md text-sm bg-green-100 text-green-600">Completed</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method:</span>
          <span>Visa card ****1234</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Details</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipment ID:</span>
            <span>SHIP123</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Receiver:</span>
            <span>John Doe</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Address:</span>
            <span className="text-right">2 Martin Street, Mushin, Lagos</span>
          </div>
        </div>
      </div>

      <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" onClick={onClose}>
        Close
      </Button>
    </div>
  )
}

