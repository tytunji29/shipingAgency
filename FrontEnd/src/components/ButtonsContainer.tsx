// ButtonsContainer.jsx (Client Component)
"use client";
import React from "react";
import CustomButton from "./CustomButton";

function ButtonsContainer() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mt-8">
      <CustomButton
        title="Ship Package"
        onClick={handleClick}
        className="font-DmSansRegular rounded-md text-[14px] shadow-none"
      />
      <CustomButton
        title="Are you a Transport Company"
        onClick={handleClick}
        textVariant="primary"
        bgVariant="outline"
        className="font-DmSansRegular rounded-md text-[14px] shadow-none border-white border-[1px]"
      />
    </div>
  );
}

export default ButtonsContainer;