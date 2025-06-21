import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  PiMotorcycleFill,
  PiCarFill,
  PiVanFill,
  PiTruckFill,
} from "react-icons/pi";
import { useAppContext } from "@/context/AppContext";

interface StepOneProps {
  formData: any;
  setFormData: (value: any) => void;
  handleNext: () => void;
}

function StepOne({ formData, setFormData, handleNext }: StepOneProps) {
  const { itemCategories, itemTypes } = useAppContext();
  const [iCategories, setICategories] = useState<any[]>([]);
  const [iTypes, setITypes] = useState<any[]>([]);
  const { itemsRequest } = formData;

  useEffect(() => {
    const fetchCategories = async () => {
      const icats = await itemCategories();
      if (Array.isArray(icats)) {
        setICategories(icats);
      }
    };
    fetchCategories();
  }, [itemCategories]);

  const getItemTypes = async (categoryId: string) => {
    const res = await itemTypes(categoryId);
    if (Array.isArray(res)) {
      setITypes(res);
    }
  };

  const vehicleIcons = [
    <PiTruckFill className="text-4xl" />,
    <PiVanFill className="text-4xl" />,
    <PiCarFill className="text-4xl" />,
    <PiMotorcycleFill className="text-4xl" />,
  ];
  const vehicleLabels = ["Truck", "Mini-Van", "Cars", "Motorcycles"];

  return (
    <div>
      <div className="grid gap-6">
        {/* Vehicle selection */}
        <div>
          <h2 className="text-base font-medium mb-1">
            Please select vehicle for pickup
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Select a vehicle type from the listed category below
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vehicleLabels.map((label, typeId) => (
              <button
                key={typeId}
                type="button"
                className={`border rounded-lg p-4 flex flex-col items-center justify-center h-28 transition ${
                  itemsRequest.vehicleTypeId === typeId
                    ? "bg-slate-100 border-slate-300"
                    : "hover:bg-slate-50"
                }`}
                onClick={() =>
                  setFormData((prev: any) => ({
                    ...prev,
                    itemsRequest: {
                      ...prev.itemsRequest,
                      vehicleTypeId: typeId,
                    },
                  }))
                }
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  {vehicleIcons[typeId]}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selects */}
        <div className="grid gap-4">
          {/* Item Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Item Category
            </label>
            <Select
              value={itemsRequest.itemCategoryId?.toString() || ""}
              onValueChange={(value) => {
                setFormData((prev: any) => ({
                  ...prev,
                  itemsRequest: {
                    ...prev.itemsRequest,
                    itemCategoryId: value,
                    itemTypeId: "", // reset type when category changes
                  },
                }));
                getItemTypes(value);
              }}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {iCategories.map((item) =>
                  item?.id ? (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Item Type</label>
            <Select
              value={itemsRequest.itemTypeId?.toString() || ""}
              onValueChange={(value) =>
                setFormData((prev: any) => ({
                  ...prev,
                  itemsRequest: {
                    ...prev.itemsRequest,
                    itemTypeId: value,
                  },
                }))
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select type of item" />
              </SelectTrigger>
              <SelectContent>
                {iTypes.map((item) =>
                  item?.id ? (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <div className="grid grid-cols-3 gap-4">
              {/* Length */}
              <Select
                value={itemsRequest.length?.toString() || ""}
                onValueChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    itemsRequest: {
                      ...prev.itemsRequest,
                      length: Number(value),
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70cm</SelectItem>
                  <SelectItem value="100">100cm</SelectItem>
                  <SelectItem value="150">150cm</SelectItem>
                </SelectContent>
              </Select>

              {/* Width */}
              <Select
                value={itemsRequest.weight?.toString() || ""}
                onValueChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    itemsRequest: {
                      ...prev.itemsRequest,
                      weight: Number(value),
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5cm</SelectItem>
                  <SelectItem value="10">10cm</SelectItem>
                  <SelectItem value="15">15cm</SelectItem>
                </SelectContent>
              </Select>

              {/* Height */}
              <Select
                value={itemsRequest.height?.toString() || ""}
                onValueChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    itemsRequest: {
                      ...prev.itemsRequest,
                      height: Number(value),
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="35">35cm</SelectItem>
                  <SelectItem value="40">40cm</SelectItem>
                  <SelectItem value="45">45cm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <Select
              value={itemsRequest.quantity?.toString() || ""}
              onValueChange={(value) =>
                setFormData((prev: any) => ({
                  ...prev,
                  itemsRequest: {
                    ...prev.itemsRequest,
                    quantity: Number(value),
                  },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleNext} className="w-full bg-[#0E1E3F] text-white">
          Next
        </Button>
      </div>
    </div>
  );
}

export default StepOne;
