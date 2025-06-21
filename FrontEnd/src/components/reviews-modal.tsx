"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Transporter = {
  id: string
  name: string
  shipmentId: string
  vehicleInfo: string
  estimatedDelivery: string
  status: "Delivered" | "In-Transit"
}

type ReviewsModalProps = {
  transporter: Transporter
  isOpen: boolean
  onClose: () => void
}

export default function ReviewsModal({ transporter, isOpen, onClose }: ReviewsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Reviews for {transporter.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-700">Excellent service, timely delivery, and great communication.</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose} className="bg-slate-100 hover:bg-slate-300">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

