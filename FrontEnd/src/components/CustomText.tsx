import React from 'react';

type Variant = 'default' | 'title' | 'smallTitle' | 'subtitle' | 'label' | 'textLink' | 'smallHeader' | 'smallHero' | 'bigHero';

interface CustomTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = {
    default: 'text-[24px] font-DMSansBold',
    title: 'text-[25px] md:text-[38px] font-DMSansExtraBold18',
    smallTitle: 'text-[14.4px] font-semibold font-DMSansBold text-black',
    subtitle: 'text-[12px] font-DMSansMedium  leading-[15.6px]',
    label: 'text-sm font-DMSansRegular',
    textLink: 'text-black font-DMSansRegular text-[14px]',
    smallHeader: 'text-[24px] font-DMSansRegular font-semibold',
    smallHero: 'text-[16px] font-HankenRegular',
    bigHero: 'text-[38px] md:text-[55px] lg:text-[69.12px]  font-HankenBold'
  };

  return (
    <div 
      className={`${baseStyles[variant]} ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default CustomText;