import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface CheckboxProps {
  label: string;
  onPress: () => void;
  checked?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onPress,
  checked = false,
  className = '',
}) => {
  return (
    <div
      onClick={onPress}
      className={`flex flex-row items-center cursor-pointer ${className}`}
    >
      <div
        className={`
          w-3 h-3
          md:w-5 md:h-5
          border 
          rounded-full
          mr-2
          flex items-center
          justify-center
          transition-all duration-200
          ${checked 
            ? 'bg-black border-black' 
            : 'bg-white border-black'
          }
        `}
      >
        {checked && (
          <FaCheck className='text-white' />
        )}
      </div>
    </div>
  );
};

export default Checkbox;