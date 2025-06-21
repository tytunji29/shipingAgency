import React from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";

interface Form {
  transportType: string;
  region: string;
  vehicle: string;
  weight: string;
  rate: string;
  schedule: string;
}

interface ServiceInformationProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

function ServiceInformation({ form, setForm }: ServiceInformationProps) {
  return (
    <div>
      <CustomText variant="subtitle" className="mb-7">
        Step 2/3
      </CustomText>
      <CustomText variant="smallHeader">Service Information</CustomText>
      <CustomText variant="subtitle" className="mt-2">
        Fill in the appropriate details about your company{" "}
      </CustomText>
      <div className="w-[22rem] md:w-[30rem] space-y-7 mt-10">
        <InputField
          label="Types of Transport Services*"
          placeholder="Bikes, Van, Truck"
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.transportType}
          onChange={(e) => setForm({ ...form, transportType: e.target.value })}
        />
        <InputField
          label="Serving Region"
          placeholder="Region"
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Number of Vehicles"
          placeholder="Number of Vehicles"
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.vehicle}
          onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Vehicle Max Loading KG"
          placeholder="0kg"
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Rates/Kilometer"
          placeholder="0.00"
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
          className="mt-10"
        />
        <InputField
          label="Availability Schedule"
          placeholder=""
          borderColor="border-[#6C6C6C]"
          placeholderColor=""
          value={form.schedule}
          onChange={(e) => setForm({ ...form, schedule: e.target.value })}
          className="mt-10"
        />
      </div>
    </div>
  );
}

export default ServiceInformation;