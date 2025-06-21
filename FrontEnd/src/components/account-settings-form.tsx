"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { toastService } from "@/lib/toast";
import { useAppContext } from "@/context/AppContext";
import CustomButton from "./CustomButton";
import Loader from "./Icon/Loader";

export default function AccountSettingsForm() {
  const { state, changePassword } = useAppContext();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      console.log(formData);
      toastService.error("New password doesn't match with confirm password", {
        position: "bottom-center",
      });
    } else {
      const res = await changePassword(formData);
      if (res) {
        console.log(res);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* <div className="space-y-2 w-[100%] flex items-center ">
        <Label htmlFor="picture" className="text-sm font-medium w-[40%]">
          Upload Picture*
        </Label>
        <div className="flex items-center gap-4 w-[60%]">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt="Profile"
            />
            <AvatarFallback className="rounded-full border-[1px] ">CN</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload size={16} />
            Upload
          </Button>
        </div>
      </div> */}

      {/* <div className="space-y-2 w-[100%] flex items-center">
        <Label htmlFor="email" className="text-sm font-medium w-[40%]">
          Email*
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          className="w-[60%] "
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2 w-[100%] flex items-center">
        <Label htmlFor="phone" className="text-sm font-medium w-[40%]">
          Phone Number*
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          className="w-[60%] "
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div> */}

      <div className="space-y-2 w-[100%] flex items-center">
        <Label htmlFor="password" className="text-sm font-medium w-[40%]">
          Current Password
        </Label>
        <Input
          id="password"
          type="password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
        />
      </div>

      <div className="space-y-2 w-[100%] flex items-center">
        <Label htmlFor="password" className="text-sm font-medium w-[40%]">
          New Password
        </Label>
        <Input
          id="password"
          type="password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />
      </div>

      <div className="space-y-2 w-[100%] flex items-center">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium w-[40%]"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          className="w-[60%] "
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <CustomButton
          className="rounded-lg p-1 text-sm w-[100px]"
          type="submit"
          bgVariant="black"
          textVariant="primary"
          disabled={state.loading && true}
          title={state.loading ? <Loader /> : "Update"}
        />
      </div>
    </form>
  );
}
