"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

type Transporter = {
  id: string
  name: string
  shipmentId: string
  vehicleInfo: string
  estimatedDelivery: string
  status: "Delivered" | "In-Transit"
}

type ContactModalProps = {
  transporter: Transporter
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ transporter, isOpen, onClose }: ContactModalProps) {
  // In a real app, this would come from the API based on the transporter
  const contactInfo = {
    phone: "+234 812 345 6789",
    email: `logistics@${transporter.name.toLowerCase().replace(/\s+/g, "")}.com`,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-xl">Contact info</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full">
              <Phone className="h-5 w-5 text-slate-600" />
            </div>
            <p className="text-slate-700">{contactInfo.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-slate-600" />
            </div>
            <p className="text-slate-700">{contactInfo.email}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-slate-100 hover:bg-slate-300">Send message</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

