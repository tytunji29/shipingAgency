import React, { useState } from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";

function Company() {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div>
      <CustomText variant="subtitle" className="mb-7">
        Step 1/3
      </CustomText>
      <CustomText variant="smallHeader">Let's Know your company</CustomText>
      <CustomText variant="subtitle" className="mt-2">
        Fill in the appropriate details about you company
      </CustomText>
      <div className="w-[22rem] md:w-[30rem] space-y-7 mt-10 ">
        <InputField
          label="Contact Full Names"
          placeholder="Full Name"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <InputField
          label="What is your company name?*"
          placeholder="Company's name"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Phone Number*"
          placeholder="Phone Number"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Email Address*"
          placeholder="Email Address"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Username*"
          placeholder="Username"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Password*"
          placeholder="Password"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Confirm Password*"
          placeholder="Password"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="mt-10"
        />
      </div>
    </div>
  );
}

export default Company;
