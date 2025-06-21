"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PaymentDetails from "@/components/payment-details";

// Payment data types
interface Payment {
  id: string;
  date: string;
  amount: string;
  status: "Completed" | "Declined" | "Pending";
}

export default function PaymentHistory() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Sample payment data
  const payments: Payment[] = [
    {
      id: "SHIP12345",
      date: "2025-02-18",
      amount: "₦8,500",
      status: "Completed",
    },
    {
      id: "SHIP12346",
      date: "2025-02-19",
      amount: "₦11,500",
      status: "Declined",
    },
    {
      id: "SHIP12347",
      date: "2025-02-20",
      amount: "₦9,800",
      status: "Pending",
    },
  ];

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-6 bg-background border text-black">
          <TabsTrigger value="All">
            <p className="text-black">All</p>
          </TabsTrigger>
          <TabsTrigger value="Completed">
            <p className="text-black">Completed</p>
          </TabsTrigger>
          <TabsTrigger value="Declined">
            <p className="text-black">Declined</p>
          </TabsTrigger>
          <TabsTrigger value="Pending">
            <p className="text-black">Pending</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="All" className="mt-0">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/50 p-4 grid grid-cols-5 font-medium">
              <div className="flex items-center gap-1 text-sm">
                Payment ID
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Date
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Amount
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm">Status</div>
              <div className="text-sm">Actions</div>
            </div>

            <div className="divide-y">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-5 p-4 items-center text-xs"
                >
                  <div>{payment.id}</div>
                  <div>{payment.date}</div>
                  <div>{payment.amount}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : payment.status === "Declined"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleViewDetails(payment)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would filter the payments based on status */}
        <TabsContent value="Completed" className="mt-0">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/50 p-4 grid grid-cols-5 font-medium">
              <div className="flex items-center gap-1 text-sm">
                Payment ID
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Date
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Amount
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm">Status</div>
              <div className="text-sm">Actions</div>
            </div>

            <div className="divide-y">
              {payments
                .filter((payment) => payment.status === "Completed")
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-5 p-4 items-center text-xs"
                  >
                    <div>{payment.id}</div>
                    <div>{payment.date}</div>
                    <div>{payment.amount}</div>
                    <div>
                      <span className="px-2 py-1 rounded-md text-xs bg-green-100 text-green-600">
                        {payment.status}
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewDetails(payment)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Declined" className="mt-0">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/50 p-4 grid grid-cols-5 font-medium">
              <div className="flex items-center gap-1 text-sm">
                Payment ID
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Date
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Amount
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm">Status</div>
              <div className="text-sm">Actions</div>
            </div>

            <div className="divide-y">
              {payments
                .filter((payment) => payment.status === "Declined")
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-5 p-4 items-center text-xs"
                  >
                    <div>{payment.id}</div>
                    <div>{payment.date}</div>
                    <div>{payment.amount}</div>
                    <div>
                      <span className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-600">
                        {payment.status}
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewDetails(payment)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Pending" className="mt-0">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/50 p-4 grid grid-cols-5 font-medium">
              <div className="flex items-center gap-1 text-sm">
                Payment ID
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Date
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                Amount
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm">Status</div>
              <div className="text-sm">Actions</div>
            </div>

            <div className="divide-y">
              {payments
                .filter((payment) => payment.status === "Pending")
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-5 p-4 items-center text-xs"
                  >
                    <div>{payment.id}</div>
                    <div>{payment.date}</div>
                    <div>{payment.amount}</div>
                    <div>
                      <span className="px-2 py-1 rounded-md text-xs bg-yellow-100 text-yellow-600">
                        {payment.status}
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewDetails(payment)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="p-0 max-w-md">
          <PaymentDetails onClose={() => setIsDetailsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
