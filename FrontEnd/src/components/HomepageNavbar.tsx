"use client";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import DrawerMenu from "./DrawerMenu";
import Logo from "./Logo";
import HomepageNavLinks from "./HomepageNavLinks";

function HomepageNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center  py-6 rounded-none z-10 relative">
        <Logo />
        <div className="hidden lg:flex ">
          <HomepageNavLinks />
        </div>
        <div className="flex lg:hidden">
          <IoMenu
            className="text-3xl cursor-pointer text-white"
            onClick={toggleDrawer}
          />
        </div>
      </div>

      <DrawerMenu isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </>
  );
}

export default HomepageNavbar;
