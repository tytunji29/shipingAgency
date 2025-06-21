import React, { useState } from "react";
import SelectField from "./SelectField";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import { GrTransaction } from "react-icons/gr";
import { MdAddLocation } from "react-icons/md";

function HomePageSearch() {
  const [form, setForm] = useState({
    pickAddress: "",
    deliveryLocation: "",
  });

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="">
      <div className="hidden md:flex items-center gap-1 w-[100%] xl:w-[60%] lg:gap-5 mt-4 ">
        <SelectField
          containerStyle="border-black h-[62px]  "
          className="text-[#000] "
          options={[
            { value: "", label: "Item Type" },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <div className="  h-[62px] flex  items-center rounded-md mt-2 px-2 md:border-[1px] md:border-black">
          <InputField
            containerStyle="border-none "
            placeholder="Your Location"
            LeftIcon={MdAddLocation}
            onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
          />
          <div className="hidden md:flex md:bg-black  w-[30.46px] h-[30.46px] p-2 rounded-md mx-2">
            <GrTransaction className="text-white" />
          </div>

          <InputField
            placeholder="Your Location"
            containerStyle="border-none mr-5"
            inputStyle="text-black"
            LeftIcon={MdAddLocation}
            onChange={(e) =>
              setForm({ ...form, deliveryLocation: e.target.value })
            }
          />
          <CustomButton
            title="Receive Quotes"
            onClick={handleClick}
            bgVariant="secondary"
            textVariant="primary"
            className="font-DmSansRegular text-xs bg-black text-white rounded-md h-[50px] lg:w-[350px] text-[14px] shadow-none w-[100%] "
          />
        </div>
      </div>
      <div className="flex flex-col md:hidden mt-4">
        <SelectField
          containerStyle="border-black h-[50px] mt-0 "
          className="text-[#000] "
          options={[
            { value: "", label: "Item Type" },
            { value: "Item Type1", label: "Item Type 1" },
            { value: "Item Type2", label: "Item Type 2" },
          ]}
        />
        <InputField
            placeholder="Your Location"
            containerStyle="border-black   w-[100%]"
          placeholderColor="text-black"
          LeftIcon={MdAddLocation}
          inputStyle="text-[#000] "
          onChange={(e) => setForm({ ...form, pickAddress: e.target.value })}
        />
        <InputField
            placeholder="Your Location"
            containerStyle="border-black   w-[100%]"
          inputStyle="text-black"
          LeftIcon={MdAddLocation}
          onChange={(e) =>
            setForm({ ...form, deliveryLocation: e.target.value })
          }
        />
        <CustomButton
          title="Receive Quotes"
          onClick={handleClick}
          bgVariant="secondary"
          textVariant="primary"

          className="font-DmSansRegular text-xs rounded-md h-[50px] w-[100%] text-[14px] shadow-none mt-2 "
        />
      </div>
    </div>
  );
}

export default HomePageSearch;
