import React from 'react'
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import { IoEyeOutline } from "react-icons/io5";
import {
  PiFlagPennant,
  PiCalendarDots,
  PiClockCountdownLight,
  PiPath,
} from "react-icons/pi";
import Arrow from "./Arrow";

interface DeliveryItem {
  pickupLococation: string;
  deliveryLococation: string;
  date: string;
  time: string;
  miles: string;
}

function DeliveryDetails({ deliveryItem }: { deliveryItem: DeliveryItem }) {
  return (
    <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-10  ">
              <img
                src="/images/12.png"
                alt="location"
                className="w-[408px] h-[200px] xl:w-[408px] xl:h-[257px]"
              />
              <div className="pt-2 md:pt-0 md:px-2 flex flex-col justify-between">
                <CustomText
                  variant="smallHeader"
                  className="w-[308px] leading-[1.8rem] "
                >
                  Mercedes-Benz 250X POWER
                </CustomText>
                <div className="flex gap-1 ">
                  <div className="flex items-center gap-2 font-medium">
                    <CustomText variant="subtitle" className="text-[#282828] ">
                      (3.5 stars) • 10 reviews
                    </CustomText>
                  </div>
                  <CustomButton
                    title="Watch"
                    IconLeft={IoEyeOutline}
                    textVariant="success"
                    className="font-DmSansRegular bg-[#F0F0F0] text-black flex items-center gap-1 xl:gap-2 rounded-md text-[12px] shadow-none h-[24px]"
                  />
                  <CustomButton
                    title="Report"
                    IconLeft={PiFlagPennant}
                    textVariant="success"
                    className="font-DmSansRegular bg-[#F0F0F0] text-black flex items-center gap-1 xl:gap-2 rounded-md text-[12px] shadow-none h-[24px]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <CustomText
                    variant="subtitle"
                    className="text-[14px] flex items-center gap-4 lg:gap-1 xl:gap-2 pt-2 md:pt-0"
                  >
                    {deliveryItem.pickupLococation} <Arrow />{" "}
                    {deliveryItem.deliveryLococation}
                  </CustomText>
                </div>
                <div className="flex gap-2 md:gap-1 pt-4">
                  <PiCalendarDots />
                  <div>
                    <CustomText
                      variant="subtitle"
                      className="text-[#282828] text-[12px] font-semibold"
                    >
                      Delivery preferred between: {deliveryItem.date} and{" "}
                      {deliveryItem.date}
                    </CustomText>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-1 pt-4">
                  <PiClockCountdownLight />
                  <div>
                    <CustomText
                      variant="subtitle"
                      className="text-[#282828] text-[12px] font-semibold "
                    >
                      {deliveryItem.time}
                    </CustomText>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-1 pt-4">
                  <PiPath />
                  <div>
                    <CustomText
                      variant="subtitle"
                      className="text-[#282828] text-[12px] font-semibold "
                    >
                      {deliveryItem.miles}
                    </CustomText>
                  </div>
                </div>
              </div>
            </div>

    </div>
  )
}

export default DeliveryDetails
