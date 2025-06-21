"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Filter, Menu, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const shipments = [
  {
    id: "SHIP12345",
    transporter: "Gokada",
    pickup: "Mushin, Lagos",
    destination: "Sango, Ogun",
    quote: "₦8,500",
    pickupDate: "2025-02-15",
    deliveryDate: "2025-02-18",
    status: "Delivered",
    trackingDetails: {
      shippingId: "SHIP12345",
      status: "Delivered",
      pickup: "Mushin, Lagos",
      destination: "Sango, Ogun state",
      shippedDate: "2025-02-15, 11:30am",
      estimatedArrival: "2025-02-18, 11:30am",
    },
  },
  {
    id: "SHIP12346",
    transporter: "Uber.co",
    pickup: "Lekki, Lagos",
    destination: "Ajah, Lagos",
    quote: "₦11,500",
    pickupDate: "2025-02-16",
    deliveryDate: "2025-02-19",
    status: "Delivered",
    trackingDetails: {
      shippingId: "SHIP12346",
      status: "Delivered",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      shippedDate: "2025-02-16, 11:30am",
      estimatedArrival: "2025-02-19, 11:30am",
    },
  },
  {
    id: "SHIP12347",
    transporter: "Redstar express",
    pickup: "Lekki, Lagos",
    destination: "Ajah, Lagos",
    quote: "₦9,800",
    pickupDate: "2025-02-17",
    deliveryDate: "2025-02-20",
    status: "In-Transit",
    trackingDetails: {
      shippingId: "SHIP12347",
      status: "In-Transit",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      shippedDate: "2025-02-17, 11:30am",
      estimatedArrival: "2025-02-20, 11:30am",
    },
  },
  {
    id: "SHIP12348",
    transporter: "GIG Logistics",
    pickup: "Lekki, Lagos",
    destination: "Ajah, Lagos",
    quote: "₦4,500",
    pickupDate: "2025-02-18",
    deliveryDate: "2025-02-21",
    status: "In-Transit",
    trackingDetails: {
      shippingId: "SHIP12348",
      status: "In-Transit",
      pickup: "Lekki, Lagos",
      destination: "Ajah, Lagos",
      shippedDate: "2025-02-18, 11:30am",
      estimatedArrival: "2025-02-21, 11:30am",
    },
  },
];

export default function ShipmentTracker() {
  const [activeTab, setActiveTab] = useState("All");
  const { allShipments } = useAppContext();
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<
    (typeof shipments)[0] | null
  >(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string | null;
  }>({ key: null, direction: null });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getAllShipments = async () => {
    const result = await allShipments();
    console.log(result);
  };
  useEffect(() => {
    getAllShipments();
  }, []);
  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) {
      return <ChevronDown className="w-4 h-4 opacity-50" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const filteredShipments = shipments.filter((shipment) => {
    if (activeTab === "All") return true;
    return shipment.status === activeTab;
  });

  const openTrackingDetails = (shipment: (typeof shipments)[0]) => {
    setSelectedShipment(shipment);
    setShowTrackingDetails(true);
  };

  return (
    <div className="max-w-6xl mx-auto mb-10 lg:p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl  text-gray-800 font-semibold">My Shipments</h1>

        {/* Mobile Filter Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="flex items-center gap-2 border-[1px] px-2 py-1 rounded-md ">
              <p className="text-[13px]">Filter</p>
              <Filter className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile and Tablet Tabs */}
      <div
        className={`
        ${isMobileFilterOpen ? "block" : "hidden"} 
        md:block mb-6 border-b
      `}
      >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button
            className={`px-4 py-2 w-full md:w-auto ${
              activeTab === "All"
                ? "bg-gray-100 md:border-b-2 border-gray-900"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("All");
              setIsMobileFilterOpen(false);
            }}
          >
            All
          </button>
          <button
            className={`px-4 py-2 w-full md:w-auto ${
              activeTab === "In-Transit"
                ? "bg-gray-100 md:border-b-2 border-gray-900"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("In-Transit");
              setIsMobileFilterOpen(false);
            }}
          >
            In-Transit
          </button>
          <button
            className={`px-4 py-2 w-full md:w-auto ${
              activeTab === "Delivered"
                ? "bg-gray-100 md:border-b-2 border-gray-900"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("Delivered");
              setIsMobileFilterOpen(false);
            }}
          >
            Delivered
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white border rounded-lg p-4 shadow-sm"
            onClick={() => openTrackingDetails(shipment)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{shipment.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  shipment.status === "Delivered"
                    ? "text-green-600 bg-green-50"
                    : "text-amber-600 bg-amber-50"
                }`}
              >
                {shipment.status}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Transporter</span>
                <span className="text-sm font-medium">
                  {shipment.transporter}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Pickup</span>
                <span className="text-sm font-medium">{shipment.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Destination</span>
                <span className="text-sm font-medium">
                  {shipment.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Quote</span>
                <span className="text-sm font-medium">{shipment.quote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Pickup Date</span>
                <span className="text-sm font-medium">
                  {shipment.pickupDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Delivery Date</span>
                <span className="text-sm font-medium">
                  {shipment.deliveryDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("id")}
                >
                  Shipment ID {getSortIcon("id")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("transporter")}
                >
                  Transporter {getSortIcon("transporter")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("pickup")}
                >
                  Pick up {getSortIcon("pickup")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("destination")}
                >
                  Destination {getSortIcon("destination")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("quote")}
                >
                  Quote {getSortIcon("quote")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("pickupDate")}
                >
                  Pickup date {getSortIcon("pickupDate")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("deliveryDate")}
                >
                  Delivery date {getSortIcon("deliveryDate")}
                </button>
              </th>
              <th className="px-2 py-3 text-left text-[13px] font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => openTrackingDetails(shipment)}
              >
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.id}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.transporter}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.pickup}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.destination}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.quote}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.pickupDate}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {shipment.deliveryDate}
                </td>
                <td className="px-2 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      shipment.status === "Delivered"
                        ? "text-green-600 bg-green-50"
                        : "text-amber-600 bg-amber-50"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tracking Details Modal */}
      {showTrackingDetails && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium mb-4">Tracking Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Shipping ID</p>
                <p className="text-sm font-medium">
                  #{selectedShipment.trackingDetails.shippingId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shipping Status</p>
                <p
                  className={`text-sm font-medium ${
                    selectedShipment.status === "Delivered"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {selectedShipment.trackingDetails.status}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="text-sm font-medium">
                  {selectedShipment.trackingDetails.pickup}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="text-sm font-medium">
                  {selectedShipment.trackingDetails.destination}
                </p>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="flex justify-between mb-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full z-10"></div>
              </div>
              <div className="absolute top-2 left-2 right-2 h-0.5 bg-blue-600"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Package Shipped</p>
                <p className="text-sm font-medium">
                  {selectedShipment.trackingDetails.shippedDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Estimated Package arrival
                </p>
                <p className="text-sm font-medium">
                  {selectedShipment.trackingDetails.estimatedArrival}
                </p>
              </div>
            </div>
            <button
              className="w-full bg-blue-900 text-white py-2 rounded-md"
              onClick={() => setShowTrackingDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
