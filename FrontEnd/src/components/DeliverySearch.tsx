import React, { useState } from "react";
import SelectField from "./SelectField";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import { FaSearch } from "react-icons/fa";

function DeliverySearch() {
  const [form, setForm] = useState({
    collectionRoute: "",
    deliveryLocation: "",
  });

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <div className="xl:flex grid grid-cols-1 md:grid-cols-2  items-center md:gap-2  mt-4 w-[100%] ">
        <SelectField
          label="Search Type"
          labelStyle="mt-2"
          containerStyle="border-[#6C6C6C] mt-0 h-[51px] w-[100%]"
          className="text-[#000] "
          options={[
            { value: "", label: "Local Search " },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <InputField
          label="Collection Route"
          containerStyle="border-[#6C6C6C]  w-[100%]"
          placeholder="State, City, Town"
          borderColor=" border-[#6C6C6C]"
          onChange={(e) => setForm({ ...form, collectionRoute: e.target.value })}
          labelStyle="mt-2"
        />
        <InputField
          label="Delivery Route"
          containerStyle="border-[#6C6C6C] w-[100%]"
          placeholder="State, City, Town"
          borderColor=" border-[#6C6C6C]"
          onChange={(e) =>
            setForm({ ...form, deliveryLocation: e.target.value })
          }
          labelStyle="mt-2"
        />
        <SelectField
          containerStyle="border-[#6C6C6C] mt-0 h-[51px] w-[100%]"
          className="text-[#000] "
          options={[
            { value: "", label: "Advance Search " },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <CustomButton
          title="Search"
          IconLeft={FaSearch}
          onClick={handleClick}
          bgVariant="secondary"
          textVariant="primary"
          className="font-DmSansRegular text-white flex items-center rounded-md text-[14px] gap-2 shadow-none h-[51px] mt-2 md:mt-0 xl:mt-2   md:w-[40%]"
        />
      </div>
    </div>
  );
}

export default DeliverySearch;
