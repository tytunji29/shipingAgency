import React from 'react'

interface DeliveryItemDetailsProps {
  user: string;
  make: string;
  model: string;
  operable: boolean;
  modeOfTransport: string;
}

function DeliveryItemDetails({ user, make, model, operable, modeOfTransport }: DeliveryItemDetailsProps) {
    return (
        <div className=" bg-white rounded-lg shadow-md">
          <h2 className="text-[15px] font-bold py-2 md:px-4 ">Item Details</h2>
          <div className="space-y-4 border-t-[1px] text-[13px] ">
            <div className="flex items-center gap-4 pt-4 px-4 ">
              <span className="px-4 py-0.5 bg-gray-100  rounded-md">User</span>
              <span >{user}</span>
            </div>
            <div className="flex items-center gap-4 px-4">
              <span className="px-4 py-0.5 bg-gray-100 rounded-md">Make</span>
              <span>{make}</span>
            </div>
            <div className="flex items-center gap-4 px-4">
              <span className="px-4 py-0.5 bg-gray-100 rounded-md">Model</span>
              <span>{model}</span>
            </div>
            <div className="flex items-center gap-4 px-4">
              <span className="px-4 py-0.5 bg-gray-100 rounded-md">Operable</span>
              <span>{operable ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-4 px-4 pb-4">
              <span className="px-4 py-0.5 bg-gray-100 rounded-md">Mode of Transport</span>
              <span>{modeOfTransport}</span>
            </div>
          </div>
        </div>
      )
    }
    
export default DeliveryItemDetails
