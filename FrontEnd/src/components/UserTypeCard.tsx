// UserTypeCard.js
import React from 'react';
import { PiUserCircleFill } from 'react-icons/pi';
import Checkbox from './Checkbox';

interface UserTypeCardProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  subtitle?: string;
  onCheckboxPress?: () => void;
  className?: string;
  iconClassName?: string;
  checkboxProps?: object;
  isSelected?: boolean;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  icon: Icon = PiUserCircleFill,
  title = 'Individual',
  subtitle = 'To Sign up as an Individual',
  onCheckboxPress = () => {},
  className = '',
  iconClassName = '',
  checkboxProps = {},
  isSelected = false
}) => {
  return (
    <div 
      className={`border-[1px] border-black p-[15px] md:p-[21px] w-[100%] flex flex-col rounded-md 
        ${className} 
        ${isSelected ? 'bg-gray-50' : ''}
        cursor-pointer
        transition-all duration-200`}
      onClick={onCheckboxPress}
    >
      <div className="flex justify-between items-start">
        <div className={`bg-[#EEE] p-2 md:p-4 rounded-md ${iconClassName}`}>
          <Icon className="text-xl md:text-[2rem]" />
        </div>
        <Checkbox
          label={title}
          {...checkboxProps}
          onPress={onCheckboxPress}
        />
      </div>
      <div className="pt-[13px] text-sm md:text-lg font-semibold">
        {title}
      </div>
      <div className="md:w-[70%] pt-[2px] text-xs md:text-sm text-gray-600">
        {subtitle}
      </div>
    </div>
  );
};

export default UserTypeCard;