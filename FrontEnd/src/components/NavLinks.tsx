import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import CustomButton from "./CustomButton";
import Link from "next/link";

function NavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-[20px] xl:gap-[32px] text-[15px] text-[#0E1E3F] ">
      <button className="flex items-center text-sm gap-2 font-DmSansRegular">
        Services <IoChevronDownOutline />
      </button>
      <button className="font-DmSansRegular text-sm">Search Deliveries</button>
      <button className="font-DmSansRegular text-sm">How it works</button>
      <button className="font-DmSansRegular text-sm">Help</button>
      <Link href="/login">
        <button className="font-DmSansRegular text-sm">Login</button>
      </Link>
      <div className="flex items-center gap-4">
       <Link href="/transport-sign-up">
          <CustomButton
            title="Transport Company Sign Up"
            className="font-DmSansRegular rounded-md text-[13px] h-[36px] shadow-none  border-[#0E1E3F] border-[1px] "
          />
        </Link>
        <CustomButton
          title="Get Quotes"
          bgVariant="secondary"
          textVariant="primary"
          className="font-DmSansRegular h-[36px] rounded-md text-[13px] shadow-none "
        />
      </div>
    </div>
  );
}

export default NavLinks;
