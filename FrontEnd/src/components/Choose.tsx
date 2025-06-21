import React from "react";
import CustomText from "./CustomText";
import { choose } from "../datas/sidebarLinks";
import Link from "next/link";

function Choose() {
  return (
    <div className="md:my-[2rem] md:mx-[2rem] xl:my-[5rem] xl:mx-[5rem] px-4  md:px-[2rem] xl:px-[10rem] py-[2rem] xl:py-[5rem] bg-[#F9F9F9] text-black rounded-3xl md:flex  justify-center">
      <div className="">
        <CustomText variant="textLink" className="uppercase text-[10px] md:text-[12px] xl:text-[14px] tracking-wider md:tracking-widest ">
          why choose us
        </CustomText>
        <CustomText
          variant="smallHero"
          className="capitalize text-[23px] md:text-[40px] xl:text-[48px] md:-mt-2  "
        >
          Experience Logistics Done Right
        </CustomText>
        <div className="grid grid-cols-2 lg:flex flex-row gap-[14px] lg:gap-[10px] xl:gap-[16px] items-center mt-10 overflow-hidden">
          {choose.map((mode) => (
            <div  key={mode.id}>
              <div className="p-4 md:p-7 xl:p-10 bg-white w-[100%] md:h-[100%] h-[12rem] rounded-xl  flex flex-col justify-center">
                <mode.icons className="text-4xl" />
                <CustomText variant="smallHero" className=" text-[20px] md:text-[25px] font-HankenSemiBold leading-[1.2rem] md:leading-[1.8rem] h-[44px] lg:h-[64px] mt-3 ">
                  {mode.heading}
                </CustomText>
                <CustomText variant="subtitle" className="leading-[1.2rem] ">
                  {mode.text}
                </CustomText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Choose;
