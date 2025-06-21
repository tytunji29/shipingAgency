"use client";

import type React from "react";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "./ui/card";
import CustomButton from "./CustomButton";

interface AddPaymentFormProps {
  onSave: (paymentMethod: any) => void;
  onCancel: () => void;
}

export default function AddPaymentForm({
  onSave,
  onCancel,
}: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Format card number with spaces every 4 digits
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nameOnCard) {
      newErrors.nameOnCard = "Name is required";
    }

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Valid card number is required";
    }

    if (!formData.expiry) {
      newErrors.expiry = "Expiry date is required";
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const cardNumber = formData.cardNumber.replace(/\s/g, "");
      onSave({
        // type: "VISA", // Assuming VISA for simplicity
        cardNumber: cardNumber,
        name: formData.nameOnCard,
        expiry: formData.expiry,
        cvv: formData.cvv,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Payment</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-gray-500 pt-12">
                <CreditCard className="h-12 w-12 mx-auto" />
                <p className="mt-2 text-center">Card</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              placeholder="Ajayi Samuel"
              className={errors.nameOnCard ? "border-red-500" : ""}
            />
            {errors.nameOnCard && (
              <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cvv">Expiry</Label>
              <Input
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="Enter expiry date"
                maxLength={5}
                className={errors.expiry ? "border-red-500" : ""}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                type="password"
                placeholder="***"
                maxLength={4}
                className={errors.cvv ? "border-red-500" : ""}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex align-center justify-between mt-8">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <CustomButton
            title={"Save"}
            // title={state.loading ? <Loader /> : "Save"}
            // disabled={state.loading && true}
            className="font-DmSansRegular rounded-md text-[14px]  border-[1px] w-[30%] "
            bgVariant="secondary"
            textVariant="primary"
          />
        </div>
      </form>
    </div>
  );
}
