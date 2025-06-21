import React from "react";
import CustomText from "./CustomText";

interface ServiceData {
  transportType?: string;
  region?: string;
  vehicle?: string;
  weight?: string;
  rate?: string;
  schedule?: string;
}

function SummaryInformation({ serviceData }: { serviceData: ServiceData }) {
  return (
    <div>
      <CustomText variant="subtitle" className="mb-7">
        Step 3/3
      </CustomText>
      <CustomText variant="smallHeader">
        Summary of Provided Information
      </CustomText>
      <div className="mt-8 space-y-4">
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Types of Transport Services
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.transportType || "Not provided"}
          </CustomText>
        </div>
        
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Serving Region
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.region || "Not provided"}
          </CustomText>
        </div>
        
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Number of Vehicles
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.vehicle || "Not provided"}
          </CustomText>
        </div>
        
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Vehicle Max Loading
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.weight || "Not provided"}
          </CustomText>
        </div>
        
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Rates per Kilometer
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.rate || "Not provided"}
          </CustomText>
        </div>
        
        <div className="space-y-2">
          <CustomText variant="subtitle">
            Availability Schedule
          </CustomText>
          <CustomText className="text-gray-700">
            {serviceData.schedule || "Not provided"}
          </CustomText>
        </div>
      </div>
    </div>
  );
}

export default SummaryInformation;