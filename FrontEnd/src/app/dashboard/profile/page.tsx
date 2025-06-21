"use client";

import CustomButton from "@/components/CustomButton";
import { useAppContext } from "@/context/AppContext";
import { Loader } from "lucide-react";

import { useState } from "react";

export default function ProfileSettingsForm() {
  const { state, updateProfile } = useAppContext();

  const { user } = state;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    dateOfBirth: user?.dateOfBirth || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileUpdate = await updateProfile(formData);
    console.log(profileUpdate);
  };

  return (
    <div className=" max-w-2xl p-6">
      <h1 className="text-xl font-semibold text-slate-700 mb-6">
        Profile settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="w-[100%] flex items-center space-y-2 border-y-[1px] py-5 ">
          <label htmlFor="firstName" className="text-xs w-[40%]">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded p-2 w-[60%] text-xs"
            required
          />
        </div>

        <div className="w-[100%] flex items-center space-y-2 border-y-[1px] py-5 ">
          <label htmlFor="lastName" className="text-xs w-[40%]">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded p-2 w-[60%] text-xs"
            required
          />
        </div>

        {/* Email */}
        <div className="w-[100%] flex items-center space-y-2 border-y-[1px] py-5 ">
          <label htmlFor="email" className="text-xs w-[40%]">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded p-2 w-[60%] text-xs"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="w-[100%] flex items-center space-y-2">
          <label htmlFor="phone" className="text-xs w-[40%]">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded p-2 w-[60%] text-xs"
            required
          />
        </div>

        {/* Address */}
        <div className="w-[100%] flex  space-y-2 border-y-[1px] py-5">
          <label htmlFor="address" className="text-xs w-[40%]">
            Address<span className="text-red-500">*</span>
          </label>
          <div className="w-[60%] ">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded p-2 w-[100%] text-xs mb-2"
              required
            />
            {/* <div className="flex gap-4 w-[100%] ">
              <input
                type="text"
                id="aptSuite"
                name="aptSuite"
                placeholder="Apt, Suite, etc (Optional)"
                value={formData.aptSuite}
                onChange={handleChange}
                className="border rounded p-2 w-[100%] text-xs "
              />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded p-2 w-[100%] text-xs"
                required
              />
            </div> */}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="w-[100%] flex items-center space-y-2">
          <label htmlFor="dateOfBirth" className="text-xs w-[40%]">
            Date of Birth<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border rounded p-2 w-[60%] text-xs"
            required
          />
        </div>

        {/* Password */}

        {/* Buttons */}
        <div className="flex w-[100%] gap-5 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 w-[100%] border-[1px] rounded "
          >
            Cancel
          </button>
          <CustomButton
            title={state.loading ? <Loader /> : "Save"}
            disabled={state.loading && true}
            className="font-DmSansRegular rounded-md text-[14px]  border-[1px] w-[100%] "
            bgVariant="secondary"
            textVariant="primary"
          />
        </div>
      </form>
    </div>
  );
}
