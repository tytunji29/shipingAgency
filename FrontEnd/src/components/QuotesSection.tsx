import React from "react";
import { QuoteCard } from "./QuoteCard";
import CustomText from "./CustomText";
import LongArrow from "./LongArrow";

interface Quote {
  id: string;
  customer: string;
  from: string;
  to: string;
  item: { name: string; description: string };
  status: string;
  statuss: string;
}

interface QuotesSectionProps {
  title: string;
  quotes: Quote[];
  actionType?: string;
  badge?: string;
}

function QuotesSection({ title, quotes, actionType, badge }: QuotesSectionProps) {
  return (
    <div className="space-y-2 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <CustomText variant="smallTitle" className="text-sm text-gray-900">
          {title}
        </CustomText>
        {badge && (
          <CustomText className="px-2.5 py-0.5 text-xs font-medium bg-[#EEEEEE] rounded-lg">
            {badge}
          </CustomText>
        )}
      </div>
      <div className="">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            showActions={!!actionType}
            actionType={actionType}
            sectionTitle={title}  // Pass the section title to QuoteCard
          />
        ))}
      </div>
      <button className="w-full text-xs px-4 py-3 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-start gap-2">
        View All
        <LongArrow />
      </button>
    </div>
  );
}

export default QuotesSection;