"use client";

import React, { useState, ChangeEvent } from "react";
import SelectField from "./SelectField";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import { FaLocationDot } from "react-icons/fa6";

function Search() {
  const [form, setForm] = useState({
    pickAddress: "",
    deliveryLocation: "",
  });

  const handleClick = () => {
    console.log("Button clicked!");
  };

  // Handle input change for regular input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setForm({
      ...form,
      [fieldName]: e.target.value
    });
  };

  return (
    <div>
      <div className="hidden md:flex items-center gap-1 xl:w-[80%] lg:gap-5 mt-4 ">
        <SelectField
          containerStyle="border-white h-[62px] mt-0 "
          className="text-[#000] "
          options={[
            { value: "", label: "Item Type" },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <div className="bg-white h-[62px] flex items-center rounded-md mt-2 px-2">
          <InputField
            containerStyle="border-white lg:mr-5"
            placeholder="Pick-Up Location"
            borderColor="#6C6C6C"
            onChange={(e) => handleInputChange(e, 'pickAddress')}
          />
          <div className="border-l-[1px] border-black h-10 pl-2"></div>
          <InputField
            placeholder="Delivery location"
            containerStyle="border-white mr-5"
            inputStyle="text-black"
            onChange={(e) => handleInputChange(e, 'deliveryLocation')}
          />
          <CustomButton
            title="Receive Quotes"
            onClick={handleClick}
            bgVariant="secondary"
            textVariant="primary"
            className="font-DmSansRegular text-xs rounded-md h-[50px] lg:w-[350px] text-[14px] shadow-none w-[200px] "
          />
        </div>
      </div>
      <div className="flex flex-col md:hidden mt-4">
        <SelectField
          containerStyle="border-white h-[50px] mt-0 "
          className="text-[#000] "
          options={[
            { value: "", label: "Item Type" },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <InputField
          placeholder="Pick-Up Location"
          containerStyle="border-white bg-white w-[100%]"
          placeholderColor="text-black"
          LeftIcon={FaLocationDot}
          inputStyle="text-[#000] "
          onChange={(e) => handleInputChange(e, 'pickAddress')}
        />
        <InputField
          placeholder="Delivery location"
          containerStyle="border-white bg-white w-[100%]"
          inputStyle="text-black"
          LeftIcon={FaLocationDot}
          onChange={(e) => handleInputChange(e, 'deliveryLocation')}
        />
        <CustomButton
          title="Receive Quotes"
          onClick={handleClick}
          className="font-DmSansRegular text-xs rounded-md h-[50px] w-[100%] text-[14px] shadow-none mt-2 "
        />
      </div>
    </div>
  );
}

export default Search;