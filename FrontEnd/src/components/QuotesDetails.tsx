"use client";

import React from "react";
import CustomButton from "./CustomButton";
import SelectField from "./SelectField";

interface Quote {
  amount: number;
  provider: string;
}

interface QuotesDetailsProps {
  quotes: Quote[];
  onPlaceQuote: () => void;
}

function QuotesDetails({ quotes, onPlaceQuote }: QuotesDetailsProps) {
  return (
    <div className="">
      <div className=" mb-4 bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-between items-center text-xs font-medium ">
          <label className="block ">Amount</label>
          <label className="block ">Bid</label>
        </div>
        <div className="flex items-center justify-between">
          <SelectField
            containerStyle="border-[#6C6C6C]  h-[51px] w-[80%]"
            className="text-[#000] "
            options={[
              { value: "", label: "Select " },
              { value: "1000", label: "1000" },
              { value: "2000", label: "2000" },
            ]}
          />

          <CustomButton
            title="Place Quote"
            bgVariant="secondary"
            textVariant="primary"
            className="font-DmSansRegular text-white flex items-center rounded-md text-[12px] w-[45%] shadow-none h-[51px] mt-1"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg p-4">
        <div className="grid grid-cols-3 gap- font-medium mb-5  ">
          <div className="text-[13px]">Quote Amount</div>
          <div className="text-[13px] ">Transport Provider</div>
          <div className="text-[13px] ml-2">Quote Info</div>
        </div>
        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <div key={index} className="grid grid-cols-3 gap- items-center">
              <div className="font-medium text-xs">₦{quote.amount.toLocaleString()}</div>
              <div className="text-xs">{quote.provider}</div>
              <CustomButton
                title="View Quote"
                bgVariant="secondary"
                textVariant="primary"
                className="font-DmSansRegular  ml-2 text-xs text-white flex items-center rounded-md text-[12px] shadow-none h-[31px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default QuotesDetails;
