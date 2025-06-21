import React, { RefObject } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelStyle?: string;
  LeftIcon?: React.ComponentType<{ size: number; color: string }>;
  rightIcons?: React.ComponentType<{ size: number; color: string }>;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  onRightIconPress?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
  borderColor?: string;
  placeholder?: string;
  placeholderColor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelStyle,
  LeftIcon,
  rightIcons: RightIcon,
  secureTextEntry = false,
  containerStyle = "",
  inputStyle = "",
  iconStyle,
  className,
  onRightIconPress,
  inputRef,
  required,
  borderColor = "#000", // Default border color
  placeholder = "", // Placeholder text
  placeholderColor = "text-black", // Allow custom placeholder color
  ...props
}) => {
  return (
    <div className="w-[100%] relative">
      {label && (
        <label
          className={`text-xs font-DmSansRegular absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 z-10 font-bold ${labelStyle}`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex flex-row text-[#898989] border-[#000] mt-2 justify-start items-center relative bg-netural-100 rounded-md border border-[${borderColor}] focus:border-primary-500 ${containerStyle}`}
      >
        {LeftIcon && (
          <div className={`ml-4 ${iconStyle}`}>
            <LeftIcon size={18} color="#000" />
          </div>
        )}
        <input
          ref={inputRef}
          required={required}
          className={`p-4 font-JakartaSemiBold text-black rounded-2xl outline-none font-DmSansRegular text-[12px] flex-1 placeholder:${placeholderColor} ${inputStyle}`}
          type={secureTextEntry ? "password" : "text"}
          placeholder={placeholder}
          {...props}
        />
        {RightIcon && (
          <div className={`mr-4 ${iconStyle}`} onClick={onRightIconPress}>
            <RightIcon size={18} color="#898989" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
