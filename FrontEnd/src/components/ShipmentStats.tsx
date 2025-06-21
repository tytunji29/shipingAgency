import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { data } from "../datas/sidebarLinks";
import CustomText from "./CustomText";
import SelectField from "./SelectField";

function ShipmentStats() {
  return (
    <div className="w-full max-w-6xl mx-auto p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <CustomText variant="smallTitle">Shipment Statistics</CustomText>

        <div className="relative">
          <SelectField
            containerStyle="border-none bg-[#EEEEEE] "
            className="px-1 border-none bg-[#EEEEEE]  text-black "
            options={[
              { value: "0", label: "Last 6 Months" },
              { value: "1", label: "Last 12 Months" },
              { value: "2", label: "Last Year" },
            ]}
          />
        </div>
      </div>

      <div className="h-[200px] w-[100%] ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
            barGap={5}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
              className="text-xs "
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
              ticks={[0, 2000, 4000, 6000, 8000]}
              tickFormatter={(value) => `${value / 1000}k`}
              className="text-xs"
            />
            <Bar
              dataKey="Shipment"
              fill="#D8D7E1"
              radius={[20, 20, 20, 20]}
              maxBarSize={50}
            />
            <Bar
              dataKey="Delivery"
              fill="#111827"
              radius={[20, 20, 20, 20]}
              maxBarSize={50}
            />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span
                    style={{
                      color: "#000000",
                      fontSize: 12,
                      marginBottom: 20,
                    }}
                  >
                    {value}
                  </span>
                )}
              />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default ShipmentStats;
