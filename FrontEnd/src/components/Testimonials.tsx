"use client"
import React, { useState } from "react";
import CustomText from "./CustomText";
import { choose, recentDelivery } from "../datas/sidebarLinks";
import { GoDotFill, GoDot } from "react-icons/go";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const totalPages = Math.ceil(choose.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentDelivery.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleDotSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="md:my-[2rem] md:mx-[2rem] xl:my-[5rem] xl:mx-[5rem] px-4 xl:px-[2rem] py-[2rem] xl:py-[1rem] bg-white rounded-3xl md:flex ">
      <div className="">
        <CustomText
          variant="smallHero"
          className="capitalize text-[23px] font-semibold md:text-[40px] xl:text-[48px] md:-mt-2"
        >
          Testimonials
        </CustomText>
        {/* Large screen testimonal */}
        <div className="mt-[3rem] hidden md:flex ">
          {currentItems.map((mode) => (
            <div className="flex items-center gap-[20px]" key={mode.id}>
              <img
                src="/images/9.png"
                alt="img"
                className=" w-[200px] h-[200px] "
              />
              <div className="">
                <div className="flex text-[#FEA142] ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={`star-lg-${mode.id}-${star}`} />
                  ))}
                </div>
                <CustomText
                  variant="textLink"
                  className="text-[10px] md:text-[12px] xl:text-[14px] font-semibold mt-[32px] "
                >
                  "In a matter of hours, I received an offer that matched my
                  budget from a company with very good feedback. I love being
                  able to rely on Shiply for getting the precious finds from
                  Ebay across the country for a reasonable price."
                </CustomText>
                <CustomText
                  variant="textLink"
                  className="text-[8px] md:text-[10px] xl:text-[12px] font-medium mt-[32px] "
                >
                  Balogun Elegbede
                </CustomText>
                <CustomText
                  variant="textLink"
                  className="text-[9px] md:text-[11px] xl:text-[11px] font-light tracking-tight mt-"
                >
                  Customer
                </CustomText>
              </div>
            </div>
          ))}
        </div>

        {/* Small screen testimonal */}
        <div className="mt-[3rem] p-5 bg-[#F9F9F9] rounded-lg block md:hidden">
          {currentItems.map((mode) => (
            <div key={`mobile-${mode.id}`}>
              <div className="flex justify-between">
                <img
                  src="/images/9.png"
                  alt="img"
                  className=" w-[70px] h-[70px] rounded-full "
                />
                <div className="flex text-[#FEA142] ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={`star-sm-${mode.id}-${star}`} />
                  ))}
                </div>
              </div>
              <div className="">
                <CustomText
                  variant="textLink"
                  className="text-[10px] md:text-[12px] xl:text-[14px] font-semibold mt-[32px] "
                >
                  "In a matter of hours, I received an offer that matched my
                  budget from a company with very good feedback. I love being
                  able to rely on Shiply for getting the precious finds from
                  Ebay across the country for a reasonable price."
                </CustomText>
                <CustomText
                  variant="textLink"
                  className="text-[8px] md:text-[10px] xl:text-[12px] font-medium mt-[32px] "
                >
                  Balogun Elegbede
                </CustomText>
                <CustomText
                  variant="textLink"
                  className="text-[9px] md:text-[11px] xl:text-[11px] font-light tracking-tight mt-"
                >
                  Customer
                </CustomText>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex">
            {[...Array(totalPages)].map((_, index) =>
              currentPage === index + 1 ? (
                <GoDotFill key={`dot-filled-${index}`} className="text-black" />
              ) : (
                <GoDot
                  key={`dot-outline-${index}`}
                  onClick={() => handleDotSelect(index + 1)}
                  className="cursor-pointer hover:text-black"
                />
              )
            )}
          </div>

          <div className="flex gap-5 text-3xl md:text-4xl">
            <IoArrowBackCircleOutline
              onClick={handlePrevPage}
              className={`cursor-pointer ${
                currentPage === 1 ? "text-gray-500" : "hover:text-black"
              }`}
            />
            <IoArrowForwardCircleOutline
              onClick={handleNextPage}
              className={`cursor-pointer ${
                currentPage === totalPages
                  ? "text-gray-500"
                  : "hover:text-black"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;