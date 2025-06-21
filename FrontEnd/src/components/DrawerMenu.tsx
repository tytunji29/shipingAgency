import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomText from "./CustomText";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { sidebarLinks, settings } from "../datas/sidebarLinks";

import { IoClose } from "react-icons/io5";
import Link from "next/link";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [activeSettings, setActiveSettings] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (linkId: number) => {
    setOpenDropdown(openDropdown === linkId ? null : linkId);
  };

  return (
    <div
      className={`
        fixed 
        top-0 
        right-0 
        h-full 
        w-2/3 
        bg-white 
        shadow-lg 
        transform 
        transition-transform 
        duration-300 
        ease-in-out 
        z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="p-6">
        <button onClick={onClose} className="absolute top-7 right-5 text-3xl">
          <IoClose />
        </button>
        <div className="mt-12  ">
          <nav className=" w-full flex flex-col h-[85vh] overflow-hidden">
            <div className="flex-grow overflow-hidden">
              {sidebarLinks.map((link) => (
                <div key={link.id} className="mb-2">
                  <button
                    className={`flex items-center justify-between text-start py-2.5 w-[200px] px-2 rounded-md  ${
                      activeLink === link.id
                        ? "bg-black text-white"
                        : " shadow-sm bg-white"
                    }`}
                    onClick={() => {
                      setActiveLink(link.id);
                      toggleDropdown(link.id);
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <link.icon
                        size={14}
                        className={`text-black ${
                          activeLink === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      />
                      <span
                        className={`text-black text-[12px] ${
                          activeLink === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      >
                        {link.title}
                      </span>
                    </div>
                    {openDropdown === link.id ? (
                      <IoIosArrowUp
                        size={14}
                        className={`text-black text-[14px] ${
                          activeLink === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      />
                    ) : (
                      <IoIosArrowDown
                        size={14}
                        className={`text-black text-[14px] ${
                          activeLink === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      />
                    )}
                  </button>

                  {openDropdown === link.id && (
                    <div className="mt-2 space-y-2 max-h-[200px] overflow-hidden">
                      {link.dropdownItems?.map((item, index) => (
                        <Link
                          key={index}
                          href={item.path}
                          className={`flex items-center justify-between text-[12px] text-start py-2.5 w-[200px] px-2 rounded-md ${
                            activeLink === link.id
                              ? "bg-white text-[#414651]"
                              : " shadow-sm bg-white"
                          }`}
                          onClick={() => {
                            setActiveLink(link.id);
                            toggleDropdown(link.id);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto border-t-[1px] py-3 ">
              {settings.map((link) => (
                <div key={link.id} className="mb-2">
                  <button
                    className={`flex items-center justify-between text-start py-2.5 w-[200px] px-2 rounded-md ${
                      activeSettings === link.id
                        ? "bg-black text-white"
                        : " shadow-sm bg-white"
                    }`}
                    onClick={() => {
                      setActiveSettings(link.id);
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <link.icon
                        size={14}
                        className={`text-black ${
                          activeSettings === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      />
                      <span
                        className={`text-black  text-[12px] ${
                          activeSettings === link.id
                            ? "text-white"
                            : "text-[#414651]"
                        }`}
                      >
                        {link.title}
                      </span>
                    </div>
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center mt-5">
                <img
                  src="/images/Avatar.png"
                  alt="Avatar"
                  className="w-[25px] h-[25px] "
                />
                <div>
                  <CustomText variant="label">
                    Ayobami Olowookere
                  </CustomText>
                  <CustomText variant="subtitle">Example@gmail.com</CustomText>
                </div>
                <FaRegShareFromSquare className="text-black" size={14}/>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default DrawerMenu;
