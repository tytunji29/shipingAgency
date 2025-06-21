import {
  Truck,
  HourglassIcon as HourglassSplit,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatsCardProps {
  title: string;
  value: string;
  percentage: number;
  icon: "truck" | "hourglass" | "check-circle" | "x-circle";
  color?: "blue" | "yellow" | "green" | "red";
  bgColor?: string;
}

export default function StatsCard({
  title,
  value,
  percentage,
  icon,
  color = "blue",
  bgColor = "bg-white",
}: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "truck":
        return <Truck className="h-4 w-4" />;
      case "hourglass":
        return <HourglassSplit className="h-4 w-4" />;
      case "check-circle":
        return <CheckCircle className="h-4 w-4" />;
      case "x-circle":
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100";
      case "yellow":
        return "text-yellow-600 bg-yellow-100";
      case "green":
        return "text-green-600 bg-green-100";
      case "red":
        return "text-red-600 bg-red-100";
    }
  };

  return (
    <div className={`${bgColor} rounded-lg border p-4 relative`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">{getIcon()}</div>
          <span className="text-gray-700 text-xs">{title}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <svg
            width="4"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
              fill="#C5C5C5"
            />
          </svg>
        </Button>
      </div>
      <div className="text-3xl font-bold mb-4">{value}</div>
      <div
        className={`inline-flex items-center px-2 py-1 rounded text-[11px] ${getColorClasses()}`}
      >
        <span className="mr-1">↑</span>
        <p>{percentage}% vs last month</p>
      </div>
    </div>
  );
}
