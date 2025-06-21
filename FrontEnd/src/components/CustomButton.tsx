import React from "react";

// Define types for button variants
type BgVariant = "secondary" | "black" | "success" | "outline" | "default";
type TextVariant = "primary" | "secondary" | "danger" | "success" | "default";

// Define props interface with TypeScript
interface CustomButtonProps {
  onClick?: () => void;
  title: any;
  bgVariant?: BgVariant;
  textVariant?: TextVariant;
  IconLeft?: React.ComponentType;
  IconRight?: React.ComponentType;
  className?: string;
  [key: string]: any; // For spreading additional props
}

const getBgVariantStyle = (variant?: BgVariant): string => {
  switch (variant) {
    case "secondary":
      return "bg-[#0E1E3F]";
    case "black":
      return "bg-black";
    case "success":
      return "bg-[#4891BC]"; // Fixed the color syntax
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-white";
  }
};

const getTextVariantStyle = (variant?: TextVariant): string => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-[#5E5E5E]";
    default:
      return "text-[#0E1E3F]";
  }
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  title,
  bgVariant,
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 flex flex-row justify-center items-center shadow-md ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {/* if there is IconLeft then render IconLeft */}
      {IconLeft && <IconLeft />}
      <span className={`font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </span>
      {IconRight && <IconRight />}
    </button>
  );
};

export default CustomButton;
