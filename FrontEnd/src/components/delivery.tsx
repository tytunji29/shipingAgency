import React from "react";
import DeliveryChart from "./delivery-chart";

function Delivery() {
  return (
    <div>
        <div>
      <h2 className="text-sm font-medium text-gray-800 ">Delivery</h2>

        </div>
      <div className="bg-white rounded-lg border p-6 mt-2">
        <div className="flex items-center mb-4">
          <div>
            <p className="text-xs text-gray-500">Monthly Delivery</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">216</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded flex items-center">
                <span className="text-xs">↑</span> 40% vs last month
              </span>
            </div>
          </div>
        </div>
        <DeliveryChart />
      </div>
    </div>
  );
}

export default Delivery;
