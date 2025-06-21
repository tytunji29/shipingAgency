import React, { useState } from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";
import { FaLocationDot } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

function Address() {
  const [form, setForm] = useState({
    pickAddress: "",
    password: "",
  });

  return (
    <div className="">
      <CustomText variant="subtitle" className="mb-7">
      Pick Address 1/4
      </CustomText>

      <CustomText variant="smallHeader">Pickup Address</CustomText>
      <CustomText variant="subtitle" className="mt-2">
        Fill in pickup address
      </CustomText>
      <div className="flex flex-col md:flex-row items-center gap-[10px] w-[100%] mt-5">
        <InputField
          label="Pick-up Address"
          LeftIcon={FaLocationDot}
          placeholder="State, City, Town"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-2"
        />
        <div className="bg-black  w-[30.46px] h-[30.46px] p-2 rounded-md ">
          <GrTransaction className="text-white" />
        </div>
        <InputField
          label="Delivery Address"
          LeftIcon={FaLocationDot}
          placeholder="State, City, Town"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-2"
        />
      </div>
    </div>
  );
}

export default Address;
