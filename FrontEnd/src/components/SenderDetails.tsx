import React, { useState } from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneFill } from "react-icons/pi";

function SenderDetails() {
  const [form, setForm] = useState({
    pickAddress: "",
    password: "",
  });

  return (
    <div>
      <CustomText variant="subtitle" className="mb-7">
        Sender’s Details 2/4
      </CustomText>

      <CustomText variant="smallHeader">Sender’s Details</CustomText>
      <CustomText variant="subtitle" className="mt-2">
        Fill in Sender’s Details
      </CustomText>
      <div className="space-y-7 md:space-y-10 mt-[2rem] md:mt-[3rem] ">
        <InputField
          label="Sender’s Full Name"
          placeholder="Full Name"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-0"
        />
        <InputField
          label="Phone Number"
          LeftIcon={PiPhoneFill}
          placeholder="State, City, Town"
          placeholderColor=""
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-0"
        />
        <InputField
          label="Sender’s Address"
          LeftIcon={FaLocationDot}
          placeholder="State, City, Town"
          placeholderColor=""
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-0"
        />
      </div>
    </div>
  );
}

export default SenderDetails;
