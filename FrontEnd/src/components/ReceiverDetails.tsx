import React, { useState } from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneFill } from "react-icons/pi";

function ReceiverDetails() {
  const [form, setForm] = useState({
    pickAddress: "",
    password: "",
  });

  return (
    <div>
      <CustomText variant="subtitle" className="mb-7">
        Receiver’s Details 3/4
      </CustomText>

      <CustomText variant="smallHeader">Receiver’s Details</CustomText>
      <CustomText variant="subtitle" className="mt-2">
        Fill in Receiver’s Details
      </CustomText>
      <div className="space-y-7 md:space-y-10 mt-[2rem] md:mt-[3rem] ">
        <InputField
          label="Receiver’s Full Name"
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
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-0"
        />
        <InputField
          label="Sender’s Address"
          LeftIcon={FaLocationDot}
          placeholder="State, City, Town"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          labelStyle="top-0"
        />
      </div>
    </div>
  );
}

export default ReceiverDetails;
