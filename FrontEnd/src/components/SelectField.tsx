import React from 'react';

interface SelectFieldProps {
    label?: string;
    labelStyle?: string;
    LeftIcon?: React.ComponentType<{ size: number; color: string }>;
    rightIcons?: React.ComponentType<{ size: number; color: string }>;
    containerStyle?: string;
    iconStyle?: string;
    className?: string;
    options?: { value: string; label: string }[];
    onRightIconPress?: () => void;
    selectRef?: React.Ref<HTMLSelectElement>;
    borderColor?: string;
    [key: string]: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    labelStyle,
    LeftIcon: IconComponent1,
    rightIcons: IconComponent2,
    containerStyle,
    iconStyle,
    className,
    options = [], // New prop for select options
    onRightIconPress,
    selectRef,
    borderColor = "#000", // Add a default border color prop
    ...props
}) => {
    return (
        <div className="w-[100%] relative">
            {label && (
                <label className={`text-xs font-DmSansRegular absolute top-0 left-4 transform -translate-y-1/2 bg-white px-2 z-10 font-bold ${labelStyle}`}>
                    {label}
                </label>
            )}
            <div 
                className={`flex flex-row h-[48px] text-[#898989] bg-white border-[#000] mt-2 justify-start items-center relative bg-netural-100 rounded-md border border-[${borderColor}] focus:border-primary-500 ${containerStyle}`}
            >
                {IconComponent1 && (
                    <div className={`ml-4 ${iconStyle}`}>
                        <IconComponent1 size={18} color="#000" />
                    </div>
                )}
                <select
                    ref={selectRef}
                    className={`px-4  bg-white rounded-2xl outline-none font-DmSansRegular text-[12px] flex-1 ${className}`}
                    {...props}
                >
                    {options.map((option, index) => (
                        <option 
                            key={index} 
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                {IconComponent2 && (
                    <div className={`mr-4 ${iconStyle}`}>
                        <IconComponent2 size={18} color="#898989" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectField;