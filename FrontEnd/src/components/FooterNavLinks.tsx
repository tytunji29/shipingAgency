import React from "react";
import Logo from "./Logo";
import Socials from "./Socials";

function FooterNavLinks() {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-center gap-[20px] xl:gap-[32px] text-[15px] text-white my-10 ">
      <Logo />
      <div className="flex justify-between gap-5 text-[12px]">
        <button className="flex items-center gap-2 font-DmSansRegular">
          Link One
        </button>
        <button className="font-DmSansRegular">Link Two</button>
        <button className="font-DmSansRegular">Link Three</button>
        <button className="font-DmSansRegular">Link Four</button>
        <button className="font-DmSansRegular">Link Five</button>
      </div>
      <Socials />
    </div>
  );
}

export default FooterNavLinks;
