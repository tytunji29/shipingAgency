import React from "react";
import CustomText from "./CustomText";
import HomePageSearch from "./HomePageSearch";

function HomePageHero() {
  return (
    <div className="px-[20px] md:px-[30px] xl:px-[160px]">
      <div className="w-[100%] md:w-[72%] lg:w-[70%] xl:w-[50%] mt-[3rem] md:mt-[7rem] xl:mt-[5rem] space-y-3 lg:space-y-4 flex flex-col ">
        <CustomText
          variant="smallHero"
          className="text-black text-[9px] md:text-xs"
        >
          SAVE TIME & MONEY - UP TO 75% OFF STANDARD RATES
        </CustomText>
        <CustomText
          variant="bigHero"
          className="text-black leading-[2.7rem] md:leading-[3.4rem] lg:leading-[4.3rem] tracking-tight  "
        >
          Delivery companies bid for your order
        </CustomText>
        <CustomText
          variant="label"
          className="text-black lg:w-[60%] leading-[1.2rem] md:leading-relaxed text-[12px] md:text-sm "
        >
          We connect you with a range of transport providers who bid to handle
          your delivery, offering competitive options and support tailored to
          your needs every step of the way.
        </CustomText>
      </div>
      <HomePageSearch />
    </div>
  );
}

export default HomePageHero;
