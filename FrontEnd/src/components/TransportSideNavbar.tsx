import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomText from "./CustomText";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { settings, transportSidebarLinks } from "../datas/sidebarLinks";
import Link from "next/link";

// Define types for the sidebar links and items
interface DropdownItem {
  name: string;
  path: string;
  icon: React.ElementType;
  notification?: number;
}

interface SidebarLink {
  id: number;
  title: string;
  icon: React.ElementType;
  path: string;
  dropdownItems?: DropdownItem[];
}

function TransportSideNavbar() {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [activeSettings, setActiveSettings] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<number, HTMLAnchorElement | null>>({});

  const hasDropdownItems = (link: SidebarLink) => {
    return Array.isArray(link.dropdownItems) && link.dropdownItems.length > 0;
  };

  const toggleDropdown = (linkId: number) => {
    setOpenDropdown(openDropdown === linkId ? null : linkId);
  };

  // Scroll the clicked item into view
  useEffect(() => {
    if (openDropdown && itemRefs.current[openDropdown]) {
      const itemElement = itemRefs.current[openDropdown];
      const navElement = navRef.current;

      if (itemElement && navElement) {
        const itemRect = itemElement.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();

        // Check if the item is below the visible area
        if (itemRect.bottom > navRect.bottom) {
          const scrollOffset = itemRect.bottom - navRect.bottom + 100; // Added padding
          navElement.scrollTop += scrollOffset;
        }
      }
    }
  }, [openDropdown]);

  return (
    <div className=" bg-[#F9F9F9] text-white hidden h-[100vh] xl:h-[705px] lg:flex border-[#6C6C6C] border-[1px] rounded-lg">
      <nav ref={navRef} className="p-4 w-full flex flex-col overflow-y-auto ">
        <div className="flex-grow ">
          {transportSidebarLinks.map((link: SidebarLink) => (
            <Link
              href={link.path}
              key={link.id}
              className="mb-2 "
              ref={(el) => {
                itemRefs.current[link.id] = el;
              }}
            >
              <button
                className={`flex items-center justify-between mb-2 text-start py-4 w-[250px] xl:w-[270px] px-5 rounded-md ${
                  activeLink === link.id
                    ? "bg-black text-white"
                    : " shadow-sm bg-white"
                }`}
                onClick={() => {
                  setActiveLink(link.id);
                  if (hasDropdownItems(link)) {
                    toggleDropdown(link.id);
                  }
                }}
              >
                <div className="flex items-center gap-5">
                  <link.icon
                    size={18}
                    className={`text-black ${
                      activeLink === link.id ? "text-white" : "text-[#414651]"
                    }`}
                  />
                  <span
                    className={`text-black text-[14px] ${
                      activeLink === link.id ? "text-white" : "text-[#414651]"
                    }`}
                  >
                    {link.title}
                  </span>
                </div>
                {hasDropdownItems(link) &&
                  (openDropdown === link.id ? (
                    <IoIosArrowUp
                      size={18}
                      className={`text-black font-mulish text-[14px] ${
                        activeLink === link.id ? "text-white" : "text-[#414651]"
                      }`}
                    />
                  ) : (
                    <IoIosArrowDown
                      size={18}
                      className={`text-black font-mulish text-[14px] ${
                        activeLink === link.id ? "text-white" : "text-[#414651]"
                      }`}
                    />
                  ))}
              </button>

              {hasDropdownItems(link) && openDropdown === link.id && (
                <div className="mt-2 space-y-2">
                  {link.dropdownItems?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`flex items-center justify-between text-start py-4  w-[250px] xl:w-[270px] px-5 rounded-md ${
                        activeLink === link.id
                          ? "bg-white text-[#414651]"
                          : " shadow-sm bg-white"
                      }`}
                      onClick={() => {
                        setActiveLink(link.id);
                        toggleDropdown(link.id);
                      }}
                    >
                      <div className="flex justify-between w-full ">
                        <div className="flex items-center gap-5 pl-3 xl:pl-5">
                          <item.icon
                            size={16}
                            className={`text-black ${
                              activeLink === link.id
                                ? "text-[#414651]"
                                : "text-white"
                            }`}
                          />
                          <span
                            className={`text-black text-[12px] ${
                              activeLink === link.id
                                ? "text-[#414651]"
                                : "text-white"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <div className=" ">
                          {item.notification && item.notification > 0 && (
                            <span className="bg-[#F5F5F5] text-[#414651] font-semibold text-[10px] rounded-full px-3 py-1">
                              {item.notification}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t-[1px] py-3">
          {settings.map((link: SidebarLink) => (
            <div key={link.id} className="mb-2">
              <button
                className={`flex items-center justify-between text-start py-4  w-[250px] xl:w-[270px] px-5 rounded-md ${
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
                    size={18}
                    className={`text-black ${
                      activeSettings === link.id
                        ? "text-white"
                        : "text-[#414651]"
                    }`}
                  />
                  <span
                    className={`text-black text-[14px] ${
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

          <div className="flex justify-between items-center">
            <img
              src="/images/Avatar.png"
              alt="Avatar"
              className="w-[40px] h-[40px]"
            />
            <div>
              <CustomText variant="smallTitle">Ayobami Olowookere</CustomText>
              <CustomText variant="textLink">Example@gmail.com</CustomText>
            </div>
            <FaRegShareFromSquare className="text-black" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TransportSideNavbar;