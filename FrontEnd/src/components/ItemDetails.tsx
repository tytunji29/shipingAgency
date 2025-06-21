import React, { useState } from "react";
import CustomText from "./CustomText";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUploadField from "./FileUploadField";

function ItemDetails() {
  const [form, setForm] = useState({
    pickAddress: "",
    password: "",
  });


  return (
    <div>
      <CustomText variant="subtitle" className="mb-4">
        Item Details 4/4
      </CustomText>
      <CustomText variant="smallHeader">Item Details</CustomText>
      <CustomText variant="subtitle" className="mt-1">
        Fill in Item Details
      </CustomText>
      <div className="space-y-7 md:space-y-5  mb-[1rem] mt-[1rem] ">
        <SelectField
          label="Choose an option"
          options={[
            { value: "", label: "Category" },
            { value: "Category1", label: "Category 1" },
            { value: "Category2", label: "Category 2" },
          ]}
        />
        <SelectField
          label="Select item"
          options={[
            { value: "", label: "Item" },
            { value: "Item1", label: "Item 1" },
            { value: "Item2", label: "Item 2" },
          ]}
        />
        <SelectField
          label="Select Weight (KG)"
          options={[
            { value: "", label: "Weight" },
            { value: "Weight1", label: "Weight 1" },
            { value: "Weight2", label: "Weight 2" },
          ]}
          labelStyle="top-0"
        />

        <div className="flex gap-6 md:gap-5 flex-col md:flex-row">
          <SelectField
            label="Quantity"
            options={[
              { value: "", label: "Weight" },
              { value: "Weight1", label: "Weight 1" },
              { value: "Weight2", label: "Weight 2" },
            ]}
            labelStyle="top-2"
          />
          <InputField
            label="Item Value"
            placeholder="Value"
            borderColor="border-[#6C6C6C] "
            onChange={(event) => setForm({ ...form, pickAddress: event.target.value })}
            labelStyle="top-2"
          />
        </div>
      </div>
      <FileUploadField
        label="Upload File"
        accept="image/jpeg,image/png"
        maxSize={2 * 1024 * 1024} // 2MB
        onUpload={(file) => {
          console.log("File upload triggered");
          console.log("File details:", file);
        }}
      />{" "}
      {/* <FileUploadField
        accept="image/*"
        maxSize={2 * 1024 * 1024} // 2MB
        onUpload={handleFileUpload}
      /> */}
    </div>
  );
}

export default ItemDetails;
