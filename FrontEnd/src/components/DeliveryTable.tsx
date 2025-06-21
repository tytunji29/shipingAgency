"use client";
import React from "react";
import { deliveries } from "../datas/sidebarLinks";
import TableButton from "./TableButton";
import CustomButton from "./CustomButton";
import { IoIosArrowForward } from "react-icons/io";
import CustomText from "./CustomText";

// Define the type for the delivery object based on what's in your array
interface Delivery {
  id: string;
  customerName: string;
  estDelivery: string | Date;
  pickupDelivery: string;
  price: number;
  status: string; // Change this to match your actual data type
}

// Update the StatusBadge type to accept string instead of union type
function StatusBadge({ status }: { status: string }) {
  // Create a safer version with default handling
  const styles: Record<string, string> = {
    bid: "bg-[#FFACAC] text-[#0C1F1F] text-xs",
    pending: "bg-yellow-100 text-[#0C1F1F] text-xs",
    transit: "bg-green-100 text-green-800 text-xs",
    delivered: "bg-green-500 text-white text-xs",
    // Add a default style for any unexpected status
    default: "bg-gray-100 text-gray-800 text-xs"
  };

  const labels: Record<string, string> = {
    bid: "Bid Now",
    pending: "Pending",
    transit: "In-Transit",
    delivered: "Delivered",
    // Add a default label for any unexpected status
    default: status
  };

  // Use the style for the status if it exists, otherwise use default
  const styleClass = styles[status] || styles.default;
  const label = labels[status] || labels.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${styleClass}`}
    >
      {label}
    </span>
  );
}

function DeliveryTable() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div className="w-full overflow-x-auto">
      <CustomText variant="smallTitle" className="mt-10 pb-4">Active Bids</CustomText>
      
      <table className="w-full text-xs">
        <thead className="bg-gray-50 ">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Customer Name</th>
            <th className="px-4 py-3 text-left">Est. Delivery</th>
            <th className="px-4 py-3 text-left">Pickup/Delivery</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            <tr key={delivery.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">{delivery.id}</td>
              <td className="px-4 py-4">{delivery.customerName}</td>
              <td className="px-4 py-4">
                {new Date(delivery.estDelivery).toLocaleDateString()}
              </td>
              <td className="px-4 py-4">{delivery.pickupDelivery}</td>
              <td className="px-4 py-4">₦{delivery.price.toLocaleString()}</td>
              <td className="px-4 py-4">
                <StatusBadge status={delivery.status} />
              </td>
              <td className="px-4 py-4">
                <TableButton
                  variant="secondary"
                  size="xs"
                  className="inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Edit
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end p-4">
        <CustomButton
          title="View all"
          onClick={handleClick}
          IconRight={IoIosArrowForward}
          className="font-DmSansRegular rounded-md gap-2 text-[14px] shadow-none border-black border-[1px]"
        />
      </div>
    </div>
  );
}

export default DeliveryTable;