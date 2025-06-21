import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CustomButton from './CustomButton';
import { deliveryHistory } from "../datas/sidebarLinks";

const Pagination = ({ 
  totalItems = deliveryHistory,
  itemsPerPage = 50,
  onPageChange = (page: number) => {} 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div className="mt-10 flex justify-between items-center">
      <CustomButton
        title="Prev"
        IconLeft={IoIosArrowBack}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`font-DmSansRegular flex items-center rounded-md text-[12px] h-[31px] gap-1 shadow-none text-black border-black border-[1px] ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />
      
      <div className="flex items-center gap-4">
        {getPageNumbers().map((pageNumber) => (
          <CustomButton
            key={pageNumber}
            title={pageNumber.toString()}
            onClick={() => handlePageChange(pageNumber)}
            className={`font-DmSansRegular flex items-center rounded-md text-[12px] h-[31px] gap-1 shadow-none text-black
              ${currentPage === pageNumber ? 'border-black border-[1px] bg-gray-100' : ''}`}
          />
        ))}
      </div>

      <CustomButton
        title="Next"
        IconRight={IoIosArrowForward}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`font-DmSansRegular flex items-center rounded-md text-[12px] h-[31px] gap-1 shadow-none text-black border-black border-[1px] ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
};

export default Pagination;