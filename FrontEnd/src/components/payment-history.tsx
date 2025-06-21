"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaymentCard from "@/components/payment-card"

interface PaymentMethod {
  id: string
  type: string
  lastFour: string
  expiryMonth: string
  expiryYear: string
}

interface PaymentHistoryProps {
  paymentMethods: PaymentMethod[]
  onAddPayment: () => void
  onRemovePayment: (id: string) => void
}

export default function PaymentHistory({ paymentMethods, onAddPayment, onRemovePayment }: PaymentHistoryProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-700">Payment History</h1>

      <div className="flex justify-between items-center my-6">
        <h2 className=" font-medium text-gray-700">Saved Payment Methods</h2>
        <Button variant="outline" onClick={onAddPayment} className="flex items-center gap-2 h-[38px] text-xs ">
          <PlusIcon className="h-3 w-3" />
          Add Payment
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <PaymentCard key={method.id} paymentMethod={method} onRemove={() => onRemovePayment(method.id)} />
        ))}
      </div>
    </div>
  )
}

