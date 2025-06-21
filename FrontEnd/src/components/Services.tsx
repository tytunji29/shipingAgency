import React from "react";
import CustomText from "./CustomText";
import { service } from "../datas/sidebarLinks";

function Service() {
  return (
    <div
      className="relative w-full h-[98vh] md:h-screen xl:h-[80vh]  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/8.png")',
      }}
    >
      <div className="absolute  w-[100%] px-[20px] md:px-[40px] xl:px-[100px] mt-[1rem] md:mt-[5rem] ">

        <div className="w-[100%] mt-10 md:mt-0 flex flex-col justify-center items-center">
          <CustomText
            variant="smallHero"
            className=" text-white uppercase text-[9px] md:text-[10px] xl:text-[14px] tracking-wider md:tracking-widest md:text-xs"
          >
            SERVICES WE COVER
          </CustomText>
          <CustomText
            variant="smallHero"
            className="capitalize text-[23px] md:text-[30px] lg:text-[48px] text-white leading-[1.5rem] md:leading-[2.3rem] lg:leading-[3rem] mt-2   "
          >
            Our Service coverage
          </CustomText>
          <div className="mt-5 grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-10">
            {service.map((item) => (
              <div key={item.id} className="bg-white flex flex-col justify-center items-center p-6 rounded-md w-[100px] h-[100px] ">
                <item.icons className="text-4xl" />
                <CustomText variant="subtitle" className="leading-[1.2rem] text-center ">
                  {item.text}
                </CustomText>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
