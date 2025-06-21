import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AcceptedBidding() {
  const items = ["Furniture set", "Electronics", "Motor Bike", "Motor Bike"]

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-sm font-medium text-gray-800">Accepted Bidding</h2>
        <Button variant="ghost" size="view" >
          View
        </Button>
      </div>
      <div className="bg-white rounded-lg border p-4 mt-2">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700 text-xs">{item}</span>
              <Check className="h-4 w-4 text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

