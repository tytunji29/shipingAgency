import { Check, X } from "lucide-react";
import { LocationMarker } from "./LocationMarker";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { cn } from "../lib/utils";

interface Quote {
  customer: string;
  from: string;
  to: string;
  item: {
    name: string;
  };
  status?: string;
  statuss?: string;
}

interface QuoteCardProps {
  quote: Quote;
  showActions?: boolean;
  actionType?: string;
  actionType1?: string;
  sectionTitle?: string;
}

export function QuoteCard({ quote, showActions = false, actionType, actionType1, sectionTitle }: QuoteCardProps) {
  // Helper function to determine if status should be shown
  const shouldShowStatus = () => {
    return sectionTitle === "Completed Quotes" || sectionTitle === "Accepted Quotes";
  };

  return (
    <div className="flex items-start space-x-2 py-4 bg-white rounded-lg hover:shadow-sm transition-shadow hover:border border-gray-100">
      <LocationMarker />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-900">
          {quote.customer}
        </p>
        <div className="flex items-center space-x-2 my-1">
          <span className="text-xs text-gray-600">{quote.from}</span>
          <HiOutlineArrowLongRight />
          <span className="text-xs text-gray-600">{quote.to}</span>
        </div>
        <div className="bg-[#F0F2F2] px-2 rounded-lg py-0.5 w-[fit-content]">
          <p className="text-[11px] text-gray-500">Item: {quote.item.name}</p>
        </div>
      </div>
      {showActions && actionType === "checkmark" && (
        <div className="flex space-x-2">
          <button className="p-1 rounded-full bg-[#12B76A]">
            <Check className="w-4 h-4 text-white" />
          </button>
          <button className="p-1 rounded-full bg-gray-100">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
      {showActions && actionType === "bid" && (
        <button className="px-4 py-1 text-[11px] font-medium text-black bg-[#FFACAC] rounded-lg ">
          Bid Now
        </button>
      )}
      {quote.statuss && shouldShowStatus() && (
        <span
          className={cn("text-[11px] bg-[#F0F2F2] px-2 rounded-lg py-0.5 w-[fit-content] font-medium ", {
            "bg-gray-100 text-gray-800": quote.statuss === "completed",
            "bg-green-100 text-green-800": quote.statuss === "Delivered",
            "bg-blue-100 text-blue-800": quote.statuss === "In-transit",
            "bg-yellow-100 text-yellow-800": quote.statuss === "Pending",
          })}
        >
          {(quote.status ?? '').charAt(0).toUpperCase() + (quote.status ?? '').slice(1)}
        </span>
      )}
    </div>
  );
}

export default QuoteCard;