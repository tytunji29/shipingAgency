import React from "react";
import { shipments } from "../datas/sidebarLinks";
import QuotesSearch from "./QuotesSearch";

function ShippingTable() {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "bid":
        return "text-[#0C1F1F] bg-[#FFACAC]";
      case "pending":
        return "bg-[#FFE3AC] text-[#0C1F1F]";
      case "transit":
        return "bg-green-100 text-[#0C1F1F]";
      case "delivered":
        return "bg-[#12B76A] text-white";
      default:
        return "bg-[#12B76A] text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "bid":
        return "Bid Now";
      case "pending":
        return "Pending";
      case "transit":
        return "In-Transit";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };
  return (
    <div>
        <QuotesSearch />
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                Shipping Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                Route
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-semibold text-gray-900"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td className="whitespace-nowrap px-6 py-4 text-[11px] font-medium text-gray-900">
                  {shipment.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[11px] text-gray-900">
                  {shipment.customerName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[11px] text-gray-900">
                  {shipment.shippingDate}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[11px] text-gray-900">
                  <span>{shipment.route.from}</span>
                  <span className="mx-2">→</span>
                  <span>{shipment.route.to}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[11px] text-gray-900">
                  ₦{shipment.price.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[11px]">
                  <span
                    className={`inline-flex rounded-lg px-3 py-1 text-[11px] font-medium ${getStatusBadgeClass(
                      shipment.status
                    )}`}
                  >
                    {getStatusText(shipment.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ShippingTable;
