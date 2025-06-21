import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import CustomButton from "./CustomButton";
import Link from "next/link";

function HomepageNavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-[20px] xl:gap-[32px] text-[15px] text-white ">
      <button className="flex items-center gap-2 font-DmSansRegular">
        Services <IoChevronDownOutline />
      </button>
      <button className="font-DmSansRegular">Search Deliveries</button>
      <button className="font-DmSansRegular">How it works</button>
      <button className="font-DmSansRegular">Help</button>
      <Link href="/login">
        <button className="font-DmSansRegular">Login</button>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/transport-sign-up">
          <CustomButton
            title="Transport Company Sign Up"
            textVariant="primary"
            bgVariant="outline"
            className="font-DmSansRegular rounded-md text-[14px] shadow-none  border-white border-[1px] "
          />
        </Link>
        <CustomButton
          title="Get Quotes"
          className="font-DmSansRegular  rounded-md text-[14px] shadow-none "
        />
      </div>
    </div>
  );
}

export default HomepageNavLinks;
