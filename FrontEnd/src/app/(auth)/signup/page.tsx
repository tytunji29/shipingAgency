"use client";
import CustomText from "@/components/CustomText";
import Navbar from "@/components/Navbar";
import SignUpCourier from "@/components/SignUpCourier";
import SignUpIndividual from "@/components/SignUpIndividual";
import UserTypeCard from "@/components/UserTypeCard";
import Link from "next/link";
import React, { useState } from "react";
import { PiUserCircleFill, PiPackageFill } from "react-icons/pi";

function page() {
  const [selectedUserType, setSelectedUserType] = useState("individual");

  const handleSelection = (userType: string) => {
    setSelectedUserType(userType);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center md:px-[40px] ">
        <div className="flex flex-col items-center gap-[20px] md:gap-[25px] p-[20px] md:p-[30px] md:border-[1px] border-black rounded-md   ">
          <CustomText variant="title">Log In</CustomText>
          <div className="flex flex-row gap-[27px] w-[100%] ">
            <UserTypeCard
              icon={PiUserCircleFill}
              title="Individual"
              subtitle="To Sign up as an Individual"
              onCheckboxPress={() => handleSelection("individual")}
              className={`my-custom-styling ${
                selectedUserType === "individual" ? "border-black" : ""
              }`}
              checkboxProps={{
                checked: selectedUserType === "individual",
                className: "custom-checkbox-styling",
              }}
              isSelected={selectedUserType === "individual"}
            />
            <UserTypeCard
              icon={PiPackageFill}
              title="Courier Company"
              subtitle="To Sign up as a transport company"
              onCheckboxPress={() => handleSelection("courier")}
              className={`my-custom-styling ${
                selectedUserType === "courier" ? "border-black" : ""
              }`}
              checkboxProps={{
                checked: selectedUserType === "courier",
                className: "custom-checkbox-styling",
              }}
              isSelected={selectedUserType === "courier"}
            />
          </div>
          {selectedUserType === "individual" && <SignUpIndividual />}
          {selectedUserType === "courier" && <SignUpCourier />}
          <Link href="/login">
            <CustomText variant="textLink">
              Already have an account? <span className="underline">Login</span>
            </CustomText>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
