import React from "react";
import { stats } from "../datas/sidebarLinks";
import CustomText from "./CustomText";
import { FaArrowUp } from "react-icons/fa";

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white p-4 rounded-lg shadow-md space-y-2"
        >
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CustomText variant="smallTitle" className="text-xs lg:text-sm">
              {stat.title}
            </CustomText>
          </div>
          <div className="space-y-4">
            <CustomText variant="title" className="text-xl lg:text-2xl font-bold">
              {stat.value}
            </CustomText>
            <div className="flex flex-row items-center justify-between">
              <CustomText
                variant="subtitle"
                className="text-[10px] lg:text-xs "
              >
                vs last month
              </CustomText>
              <CustomText
                variant="subtitle"
                className="text-xs flex flex-row items-center gap-1 p-1 rounded-md"
                style={{ color: stat.textColor, backgroundColor: stat.bgColor }}
              >
                <FaArrowUp style={{ color: stat.iconColor }} />
                {stat.change}
              </CustomText>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
