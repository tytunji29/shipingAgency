"use client"
import React, { useState } from "react";
import CustomText from "./CustomText";
import { choose, recentDelivery } from "../datas/sidebarLinks";
import Arrow from "./Arrow";
import CustomButton from "./CustomButton";
import { GoDotFill, GoDot } from "react-icons/go";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import Link from "next/link";

function RecentDelivery() {
  // State to manage current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(choose.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentDelivery.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination navigation
  const handleNextPage = () => {
    setCurrentPage((prevPage) => 
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => 
      prevPage > 1 ? prevPage - 1 : prevPage
    );
  };

  // Handle dot indicator selection
  const handleDotSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="md:my-[2rem] md:mx-[2rem] xl:my-[5rem] xl:mx-[5rem] px-4 xl:px-[2rem] py-[2rem] xl:py-[1rem] bg-white rounded-3xl md:flex justify-center">
      <div className="">
        <CustomText
          variant="smallHero"
          className="capitalize text-[23px] font-semibold md:text-[40px] xl:text-[48px] md:-mt-2"
        >
          Recent Deliveries
        </CustomText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] lg:gap-[13px] xl:gap-[18px] items-center mt-10 rounded-lg overflow-hidden bg-[#F9F9F9] p-3">
          {currentItems.map((mode) => (
            <div key={mode.id}>
              <div className="bg-white p-2 rounded-lg">
                <img src="/images/9.png" alt="w-[300px] h-[290px] " />
                <CustomText
                  variant="textLink"
                  className="text-[10px] md:text-[12px] xl:text-[14px] font-semibold mt-1"
                >
                  Samsung TV set
                </CustomText>
                <CustomText
                  variant="textLink"
                  className="text-[9px] md:text-[11px] xl:text-[13px] font-light"
                >
                  Electronics
                </CustomText>
                <div className="flex items-center gap-2 mt-2">
                  <CustomText
                    variant="textLink"
                    className="text-[14px] md:text-[16px] xl:text-[18px] font-light"
                  >
                    Berger
                  </CustomText>
                  <Arrow />
                  <CustomText
                    variant="textLink"
                    className="text-[14px] md:text-[16px] xl:text-[18px] font-light"
                  >
                    Ajah
                  </CustomText>
                </div>
                <CustomText
                  variant="textLink"
                  className="text-[9px] md:text-[11px] xl:text-[11px] font-light tracking-tight mt-3"
                >
                  Recently Taken
                </CustomText>
                <CustomButton
                  title="₦5,500"
                  onClick={handleClick}
                  bgVariant="success"
                  textVariant="primary"
                  className="font-DmSansRegular bg-[#4891BC] text-[16px] rounded-md h-[50px] w-[120px] shadow-none mt-4"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-5">
          <div className="flex">
            {[...Array(totalPages)].map((_, index) => (
              currentPage === index + 1 ? (
                <GoDotFill key={index} className="text-black" />
              ) : (
                <GoDot 
                  key={index} 
                  onClick={() => handleDotSelect(index + 1)}
                  className="cursor-pointer hover:text-black"
                />
              )
            ))}
          </div>
          
          <div className="flex gap-5 text-3xl md:text-4xl">
            <IoArrowBackCircleOutline 
              onClick={handlePrevPage}
              className={`cursor-pointer ${currentPage === 1 ? 'text-gray-500' : 'hover:text-black'}`}
            />
            <IoArrowForwardCircleOutline 
              onClick={handleNextPage}
              className={`cursor-pointer ${currentPage === totalPages ? 'text-gray-500' : 'hover:text-black'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentDelivery;