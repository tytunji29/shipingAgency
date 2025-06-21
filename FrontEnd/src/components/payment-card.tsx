"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./ui/card"

interface PaymentMethod {
  id: string
  type: string
  lastFour: string
  expiryMonth: string
  expiryYear: string
}

interface PaymentCardProps {
  paymentMethod: PaymentMethod
  onRemove: () => void
}

export default function PaymentCard({ paymentMethod, onRemove }: PaymentCardProps) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col pt-8">
          <div className="mb-4">
            <p className="text-gray-800">
              {paymentMethod.type} **** **** **** {paymentMethod.lastFour}
            </p>
            <p className="text-gray-600 mt-1">
              {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" onClick={onRemove} className="text-gray-500 hover:text-gray-700 text-xs">
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

