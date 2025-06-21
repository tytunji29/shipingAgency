import { CheckCircle } from "lucide-react";
import React from "react";

interface ProgressSidebarProps {
  step: number;
}
function ProgressSidebar({ step }: ProgressSidebarProps) {
  return (
    <div>
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>

          <div className="relative z-10 flex mb-12 ml-1">
            <div
              className={`w-8 h-8 rounded-full -mt-2 flex items-center justify-center ${
                step >= 1 ? "bg-primary text-black" : "bg-gray-400"
              }`}
            >
              {step > 1 ? (
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 " />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-black -mt-2 flex justify-center items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="ml-4 -mt-2">
              <h3 className="font-medium text-sm">Describe items</h3>
              <p className="text-xs text-gray-500">
                Fill option below that best describes the item
              </p>
            </div>
          </div>

          <div className="relative z-10 flex mb-12 ml-">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-primary text-white" : ""
              }`}
            >
              {step > 2 ? (
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black " />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-black -mt-2 flex justify-center items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-medium  text-sm">Pickup & Delivery Details</h3>
              <p className="text-xs text-gray-500">
                Fill in full address, city, or postal code.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex mb-12 ml-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-primary text-white" : ""
              }`}
            >
              {step > 3 ? (
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black " />
                  </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-black -mt-2 flex justify-center items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-medium  text-sm">Additional Information</h3>
              <p className="text-xs text-gray-500">
                Add photos, notes or instructions for the transport provider.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex ml-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 4 ? "bg-primary text-white" : ""
              }`}
            >
              {step > 4 ? (
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black " />
                  </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-black -mt-2 flex justify-center items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-sm">Review & Submit</h3>
              <p className="text-xs text-gray-500">
                Review all entered details to ensure accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressSidebar;
