import React from "react";
import CustomText from "./CustomText";
import { ServicesForYou } from "../datas/sidebarLinks";
import { GiFlowerPot } from "react-icons/gi";

function ServiceForYou() {
  return (
    <div className="md:my-[2rem] md:mx-[2rem] xl:my-[5rem] xl:mx-[5rem] px-4  md:px-[2rem] xl:px-[10rem] py-[2rem] xl:py-[5rem]  rounded-3xl md:flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center">
        <CustomText variant="textLink" className="uppercase text-[10px] md:text-[12px] xl:text-[14px] tracking-wider md:tracking-widest ">
        Services for you
        </CustomText>
        <CustomText
          variant="smallHero"
          className="capitalize text-[23px] font-bold md:text-[40px] xl:text-[48px] md:-mt-2  "
        >
          Millions of people use Shiply
        </CustomText>
        </div>

        <div className="grid grid-cols-1 md:flex flex-row gap-[14px] lg:gap-[10px] xl:gap-[16px] items-center mt-10 overflow-hidden">
          {ServicesForYou.map((mode) => (
            <div key={mode.id} className="flex justify-center items-center">
              <div className="p-4 md:p-7 xl:p-10 bg-white w-[100%] md:w-[270px] xl:w-[300px] md:h-[200px] h-[12rem] border-[1px] flex flex-col justify-center border-b-[4px] border-black rounded-lg">
                <GiFlowerPot className="text-4xl" />
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
  );
}

export default ServiceForYou;
