"use client";

import AddPaymentForm from "@/components/add-payment-form";
import PaymentHistory from "@/components/payment-history";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function PaymentPage() {
  const { addPayment } = useAppContext();
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handleAddPayment = async (paymentMethod: any) => {
    const savePaymentMethod = await addPayment(paymentMethod);
    console.log(savePaymentMethod);
    // setPaymentMethods([
    //   ...paymentMethods,
    //   {
    //     id: Math.random().toString(36).substring(2, 9),
    //     ...paymentMethod,
    //   },
    // ]);
    // setShowAddPayment(false);
  };

  const handleRemovePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method: any) => method.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showAddPayment ? (
        <AddPaymentForm
          onSave={handleAddPayment}
          onCancel={() => setShowAddPayment(false)}
        />
      ) : (
        <PaymentHistory
          paymentMethods={paymentMethods}
          onAddPayment={() => setShowAddPayment(true)}
          onRemovePayment={handleRemovePayment}
        />
      )}
    </div>
  );
}
