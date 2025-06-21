"use client"
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import { faqs } from "@/datas/sidebarLinks";

// Define the FAQ item type
interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
  path: string;
}

const Faqs: React.FC = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string | number, boolean>>({});

  const handleClick = () => {
    console.log("Button clicked!");
  };

  // Toggle the visibility of an FAQ item's answer
  const toggleAnswer = (id: string | number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="my-[2rem] md:mx-[2rem] xl:my-[5rem] xl:mx-[5rem] px-4">
      <div className="flex flex-col lg:flex-row justify-between w-[100%] gap-10 lg:gap-0">
        <div className="w-[100%] flex flex-col items-center lg:items-start">
          <CustomText
            variant="smallHero"
            className="capitalize text-[23px] md:text-[40px] xl:text-[48px]"
          >
            FAQs
          </CustomText>
          
          <CustomText
            variant="textLink"
            className="text-[10px] md:text-[12px] xl:text-[14px] tracking-wider text-center"
          >
            Find Answers to Common Questions About VuBids Services
          </CustomText>
          
          <CustomButton
            title="Contact"
            onClick={handleClick}
            bgVariant="success"
            textVariant="primary"
            className="font-DmSansRegular bg-[#4891BC] text-[16px] rounded-md h-[50px] w-[120px] shadow-none mt-4"
          />
        </div>
        
        <div className="flex flex-col w-[100%] gap-2 overflow-hidden bg-[#F9F9F9] rounded-xl p-2">
          {faqs.map((item) => {
            return (
              <div key={item.id} className="p-4 bg-white w-[100%] rounded-xl">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={(e) => toggleAnswer(item.id, e)}
                >
                  <CustomText
                    variant="subtitle"
                    className="leading-[1.2rem] text-[13px] font-semibold"
                  >
                    {item.question}
                  </CustomText>
                  
                  {/* Conditionally render arrow based on expanded state */}
                  {!expandedItems[item.id] ? (
                    <IoIosArrowDown className="text-xl"/>
                  ) : (
                    <IoIosArrowUp className="text-xl"/>
                  )}
                </div>
                
                {/* Conditionally render answer based on expanded state */}
                {expandedItems[item.id] && (
                  <CustomText 
                    variant="subtitle" 
                    className="leading-[1.6rem] my-4 transition-all duration-300 ease-in-out"
                  >
                    {item.answer}
                  </CustomText>
                )}
                
                {/* Wrap the Link around a span so onClick doesn't conflict */}
                  {/* <span className="text-[#4891BC] text-sm hover:underline">
                    Read more
                  </span> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faqs;