"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import { APIURL } from "@/context/Actions";
import Swal from "sweetalert2";

const toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

interface Shipment {
  shipmentId: string;
  transporterId: string;
  from: string;
  to: string;
  quote: string;
  pickupDate: string;
  deliveryDate: string;
  status: string;
  trackingDetails: any;
  timeCreated: string;
  asBidded?: string | boolean;
  item: {
    name: string;
    description: string;
  };
  quotes?: Bid[];
}

interface Bid {
  quoteId: string;
  shipmentId: string;
  transporterId: string;
  amount: string;
  dateSubmitted?: string;
}

export default function QuoteDataTable() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [mainUser, setMainUser] = useState<string | null>(null);

  const pageSize = 10;

  const fetchShipments = async () => {
    try {
      const token = window.localStorage.getItem("vubids_token");
      const auth = `Bearer ${token}`;
      const res = await axios.get(`${APIURL}/Shipments/get-all-shipment-landing`, {
        headers: { Authorization: auth },
      });
      if (res.data.status && Array.isArray(res.data.data)) {
        setShipments(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load shipments");
    }
  };

  useEffect(() => {
    setMainUser(localStorage.getItem("user_Type"));
    fetchShipments();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) return <ChevronDown className="w-4 h-4 opacity-50" />;
    return sortConfig.direction === "ascending" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const sortedShipments = [...shipments].sort((a, b) => {
    const key = sortConfig.key as keyof Shipment;
    if (!key) return 0;
    const aVal = a[key]?.toString().toLowerCase() || "";
    const bVal = b[key]?.toString().toLowerCase() || "";
    return sortConfig.direction === "ascending" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const filteredShipments = sortedShipments.filter((s) => (activeTab === "All" ? true : s.status === activeTab));

  const paginatedShipments = filteredShipments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredShipments.length / pageSize);

  const handleSelectShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

  return (
    <div className="max-w-6xl mx-auto mb-10 lg:p-4 bg-white">
      <Dialog open={!!selectedShipment} onOpenChange={() => setSelectedShipment(null)}>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["ShipmentId", "Transporter", "From", "To", "Quote", "Pickup Date", "Delivery Date", "Created On"].map((key) => (
                  <th key={key} className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                    <button className="flex items-center" onClick={() => handleSort(key)}>
                      {key} {getSortIcon(key)}
                    </button>
                  </th>
                ))}
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedShipments.map((shipment) => {
                const isDisabled =
                  shipment.status === "Accepted" ||
                  (mainUser === "Yes" && (shipment.asBidded === true || shipment.asBidded === "Yes"));

                let actionLabel = "View Bidders";
                if (mainUser === "Yes") {
                  actionLabel = shipment.asBidded === true || shipment.asBidded === "Yes" ? "Already Bidded" : "Bid For This";
                }

                return (
                  <tr
                    key={shipment.shipmentId}
                    className="hover:bg-gray-50 cursor-pointer"
                    // Only open modal on row click if NOT mainUser
                    onClick={() => {
                      if (mainUser !== "Yes") handleSelectShipment(shipment);
                    }}
                  >
                    <td className="px-2 py-4 text-sm text-gray-500">{shipment.shipmentId}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{shipment.transporterId}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{shipment.from}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{shipment.to}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{shipment.quote}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{formatDate(shipment.pickupDate)}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{formatDate(shipment.deliveryDate)}</td>
                    <td className="px-2 py-4 text-sm text-gray-500">{formatDate(shipment.timeCreated)}</td>
                    <td className="px-2 py-4 text-sm">
                      <Badge
                        className={cn("text-xs", {
                          "bg-green-100 text-green-800": shipment.status === "Accepted",
                          "bg-yellow-100 text-yellow-800": shipment.status === "In-Transit",
                          "bg-red-100 text-red-800": shipment.status === "Canceled",
                          "bg-gray-100 text-gray-800": !["Accepted", "In-Transit", "Canceled"].includes(shipment.status),
                        })}
                      >
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-4">
                      <Button
                        variant={mainUser === "Yes" ? "default" : "outline"}
                        size="sm"
                        className={
                          mainUser === "Yes"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "text-blue-700 border-blue-700"
                        }
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleSelectShipment(shipment);
                        }}
                      >
                        {actionLabel}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Dialog>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm pt-1">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
