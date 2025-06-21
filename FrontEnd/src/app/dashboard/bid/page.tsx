"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, CheckCircle, MapPin, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProgressSidebar from "@/components/progress-sidebar";
import StepOne from "@/components/step-one";
import StepTwo from "@/components/step-two";
import StepThree from "@/components/step-three";
import StepFour from "@/components/step-four";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import router from "next/router";
import { useRouter } from "next/navigation";

export default function DeliveryForm() {
  const { state, createShipment } = useAppContext();
    const router = useRouter();
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    itemsRequest: {
      vehicleTypeId: 0,
      itemCategoryId: 0,
      itemTypeId: 0,
      length: 0,
      weight: 0,
      height: 0,
      quantity: 0,
      imageUrl: "file",
      instructions: "",
    },
    deliveryPickupRequest: {
      pickUpAddress: "",
      deliveryAddress: "",
      pickupDate: "",
      deliveryDate: "",
      pickupLongitude: 0,
      pickupLatitude: 0,
      deliveryLongitude: 0,
      deliveryLatitude: 0,
    },
  });
  const [StartData, setStartData] = useState({});
  useEffect(() => {}, [formData]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;

     try {
      const res = await createShipment(formData);
      console.log("Now Here", res); // Better logging

      if (res != null && res.success) {
        router.push("/dashboard");
      } else {
        console.error("Failed to create shipment:", res?.message);
      }
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 text-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-10">
        {/* Progress Sidebar */}
        <ProgressSidebar step={step} />
        {/* Form Content */}
        <div>
          {/* Step 1: Describe Items */}
          {step === 1 && (
            <StepOne
              formData={formData}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}

          {/* Step 2: Pickup & Delivery Details */}
          {step === 2 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              setStartData={setStartData}
              handleNext={handleNext}
            />
          )}

          {/* Step 3: Additional Information */}
          {step === 3 && (
            <StepThree
              formData={formData}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <StepFour
              formData={formData}
              setStep={setStep}
              submitShipment={handleSubmit}
              loading={state.loading}
            />
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h2 className="text-base font-bold  mb-2">
                Submitted, Awaiting Bids
              </h2>
              <p className="text-gray-500 max-w-md mx-auto text-xs mb-8">
                A transport providers would review your listing and submit
                competitive quotes. you will be notified of new quotes and can
                compare prices, reviews, and services.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="mx-auto text-xs">
                  Go to dashboard home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
