import React from "react";
import CustomText from "./CustomText";
import { steps } from "../datas/sidebarLinks";
function Steps() {
  return (
    <div
      className="relative w-full h-[135vh] md:h-screen  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/6.png")',
      }}
    >
      <div className="absolute  w-[100%] px-[20px] md:px-[40px] xl:px-[100px] flex flex-col md:flex-row justify-between items-center mt-[2.7rem] ">
        <div className="w-[100%] flex md:hidden ">
          <img src="/images/7.png" alt="delivery guy" />
        </div>

        <div className="w-[100%] mt-10 md:mt-0 ">
          <CustomText
            variant="smallHero"
            className=" text-white uppercase text-[9px] md:text-[10px] xl:text-[14px] tracking-wider md:tracking-widest md:text-xs"
          >
            HOW VUBIDS WORKS
          </CustomText>
          <CustomText
            variant="smallHero"
            className="capitalize text-[23px] md:text-[30px] lg:text-[48px] text-white leading-[1.5rem] md:leading-[2.3rem] lg:leading-[3rem] w-[70%] mt-2   "
          >
            Simple and Easy with just 4 steps
          </CustomText>
          <div className="space-y-[1.8rem] md:space-y-[2.5rem] mt-5">
            {steps.map((step) => (
              <div key={step.id}>
                <div className="flex items-start space-x-5 lg:space-x-10 ">
                  <div className="bg-white p-2 text-[10px] lg:text-base h-[25px] w-[25px] lg:h-[35px] lg:w-[35px] flex justify-center items-center rounded-md">
                    {step.id}.
                  </div>
                  <div className="-mt-1.5">
                    <CustomText
                      variant="smallHero"
                      className="text-[20px] font-HankenMedium text-white "
                    >
                      {step.heading}{" "}
                    </CustomText>
                    <CustomText
                      variant="label"
                      className="text-[12px] md:text-[14px] font-DmSansRegular text-white w-[100%] md:w-[90%] "
                    >
                      {step.text}{" "}
                    </CustomText>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[100%] hidden md:flex ">
          <img src="/images/7.png" alt="delivery guy" />
        </div>
      </div>
    </div>
  );
}

export default Steps;
