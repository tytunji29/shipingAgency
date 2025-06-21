import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Calendar, CheckCircle, Loader, MapPin } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import CustomButton from "./CustomButton";
import { ShipmentDetails } from "@/lib/types"; // adjust path as needed

interface StepFourProps {
  loading: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  submitShipment: () => void;
  formData: ShipmentDetails;
}

function StepFour({ loading, submitShipment, formData }: StepFourProps) {
  const { itemsRequest, deliveryPickupRequest } = formData;
// const selectedCategory = itemCategories.find(
//   (cat) => cat.id === formData?.itemsRequest.itemCategoryId
// )?.name || "N/A";
  return (
    <div className="grid gap-6 mb-10">
      <div className="grid gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Category</label>
          <Select value={String(itemsRequest.itemCategoryId)} disabled>
            <SelectTrigger>
              <SelectValue>{`ID: ${itemsRequest.itemCategoryId}`}</SelectValue>
            </SelectTrigger>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Type</label>
          <Select value={String(itemsRequest.itemTypeId)} disabled>
            <SelectTrigger>
              <SelectValue>{`ID: ${itemsRequest.itemTypeId}`}</SelectValue>
            </SelectTrigger>
          </Select>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <div className="grid grid-cols-3 gap-4">
            <Input value={`${itemsRequest.length} cm`} disabled />
            <Input value={`${itemsRequest.weight} cm`} disabled />
            <Input value={`${itemsRequest.height} cm`} disabled />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <Input value={String(itemsRequest.quantity)} disabled />
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Pickup Address</label>
          <div className="relative">
            <Input value={deliveryPickupRequest.pickUpAddress} disabled />
            <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
              <MapPin className="h-5 w-5 text-navy-blue" />
            </Button>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address</label>
          <div className="relative">
            <Input value={deliveryPickupRequest.deliveryAddress} disabled />
            <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
              <MapPin className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pickup date</label>
            <div className="relative">
              <Input value={deliveryPickupRequest.pickupDate} disabled />
              <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery date</label>
            <div className="relative">
              <Input value={deliveryPickupRequest.deliveryDate} disabled />
              <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload photo of item</label>
          {itemsRequest.imageUrl ? (
            <div className="border rounded-lg p-4 flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <img src={itemsRequest.imageUrl} alt="item" className="w-8 h-8 object-cover rounded" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{itemsRequest.imageUrl.split("/").pop()}</p>
              </div>
              <div className="ml-auto">
                <CheckCircle className="h-5 w-5 text-navy-blue" />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No image uploaded</p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium mb-1">Instruction for transport provider</label>
          <Textarea value={itemsRequest.instructions} className="min-h-[100px]" disabled />
        </div>
      </div>

      {/* Submit Button */}
      <CustomButton
        title={loading ? <Loader /> : "Create Bid"}
        disabled={loading}
        onClick={submitShipment}
        className="w-full bg-[#0E1E3F] text-white"
        bgVariant="secondary"
        textVariant="primary"
      />
    </div>
  );
}

export default StepFour;
