"use client";
import React, { useState } from 'react';
import NavLinks from "./NavLinks";
import { IoMenu } from "react-icons/io5";
import DrawerMenu from "./DrawerMenu";
import BlackLogo from './BlackLogo';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center px-[20px] md:px-[40px] xl:px-[160px] py-6 rounded-none z-10 relative">
        <BlackLogo />
        <div className='hidden lg:flex'>
          <NavLinks />

        </div>
        <div className="flex lg:hidden">
          <IoMenu 
            className="text-3xl cursor-pointer" 
            onClick={toggleDrawer}
          />
        </div>
      </div>
      
      <DrawerMenu 
        isOpen={isDrawerOpen} 
        onClose={toggleDrawer} 
      />
    </>
  );
}

export default Navbar;