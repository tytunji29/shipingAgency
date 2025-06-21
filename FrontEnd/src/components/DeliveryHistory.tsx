// DeliveryHistory.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import Pagination from "./Pagination";
import { deliveryHistory } from "../datas/sidebarLinks";

interface DeliveryItem {
  id: number;
  item: string;
  pickupLococation: string;
  deliveryLococation: string;
  date: string;
  time: string;
  miles: string;
  price: string;
  bidding: string;
}

const DeliveryHistory: React.FC = () => {
  const router = useRouter();

  const handleClick = (deliveryItem: DeliveryItem) => {
    router.push({
      pathname: "/transport-dashboard/delivery-listing",
      query: { data: JSON.stringify(deliveryItem) }
    });
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;
  const totalItems = 500;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Fetching data for page ${page} ${currentPage}`);
  };

  return (
    <div className="mt-10">
      <CustomText variant="subtitle" className="flex justify-end mb-3">
        Showing 1-50 of 500
      </CustomText>
      <div className="overflow-x-auto">
        <table className=" lg:table-base table-xs xl:table-sm bg-[#F9F9F9] rounded-md flex flex-col justify-center items-center">
          <thead>
            <tr className="border-none">
              <th>
                <p className="py-2">Item</p>
              </th>
              <th>Route</th>
              <th>Miles</th>
              <th>Price</th>
              <th>Bidding</th>
              <th>Action</th>
            </tr>
          </thead>
          {deliveryHistory.map((listing: DeliveryItem) => (
            <tbody className="bg-white" key={listing.id}>
              <tr className="border-none">
                <td>
                  <CustomText variant="subtitle">{listing.item}</CustomText>
                </td>
                <td>
                  <div className="flex items-center gap-0.5">
                    <CustomText variant="subtitle">
                      {listing.pickupLococation}
                    </CustomText>
                    <BsArrowRight />
                    <CustomText variant="subtitle">
                      {listing.deliveryLococation}
                    </CustomText>
                  </div>
                </td>
                <td>
                  <CustomText variant="subtitle">{listing.date}</CustomText>
                </td>
                <td>
                  <CustomText variant="subtitle">{listing.price}</CustomText>
                </td>
                <td>
                  <CustomText variant="subtitle">{listing.bidding}</CustomText>
                  <CustomButton
                    title="View"
                    onClick={() => handleClick(listing)}
                    bgVariant="secondary"
                    textVariant="primary"
                    IconLeft={undefined}
                    IconRight={undefined}
                    className="font-DmSansRegular text-white flex items-center rounded-md text-[12px] shadow-none h-[31px]"
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="mt-10">
        {/* <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default DeliveryHistory;