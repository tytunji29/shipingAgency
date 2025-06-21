"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, ChevronDown } from "lucide-react";
import { sidebarLinks } from "@/datas/sidebarLinks";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function SideNavbar() {
  const { state, logoutUser } = useAppContext();
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    quotes: false,
    payment: false,
    profile: false,
  });

  useEffect(() => {
    const storedType = localStorage.getItem("user_Type");
    setUserType(storedType);
  }, []);

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const filteredLinks = sidebarLinks.filter((link) => {
    if (userType === "Yes") {
      return link.title !== "Create Shipment" && link.title !== "Messages";
    }
    return true;
  });

  return (
    <div className="w-full max-w-[17rem] mx-auto bg-white hidden lg:flex flex-col border-r border-gray-100">
      <div className="p-6">
        <h1 className="text-[15px] font-medium text-gray-500">My Vubids</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1 px-3">
          {filteredLinks.map((link) => (
            <li key={link.id}>
              {!link.dropdownItems ? (
                <Link
                  href={link.url}
                  className={`flex items-center gap-3 px-4 py-3 text-gray-600 rounded-md ${
                    pathname === link.url ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {React.createElement(link.icon, { className: "w-4 h-4" })}
                  <span className="text-[13px]">{link.title}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      toggleExpand(link.title.toLowerCase().replace(/\s+/g, ""))
                    }
                    className={`flex items-center justify-between w-full px-4 py-3 text-gray-600 rounded-md ${
                      pathname.includes(link.url)
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {React.createElement(link.icon, { className: "w-4 h-4" })}
                      <span className="text-[13px]">{link.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems[
                          link.title.toLowerCase().replace(/\s+/g, "")
                        ]
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {expandedItems[
                    link.title.toLowerCase().replace(/\s+/g, "")
                  ] && (
                    <ul className="pl-6 mt-1 space-y-1">
                      {link.dropdownItems.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={item.path}
                            className={`flex items-center px-4 py-2 text-[13px] text-gray-600 rounded-md ${
                              pathname === item.path
                                ? "bg-gray-100"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-gray-200">
        <div className="p-4 flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="/images/avatar.webp"
              alt="Profile picture"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-medium text-gray-800">
              {state.user?.firstName} {state.user?.lastName}
            </h3>
            <p className="text-gray-600 text-[13px]">{state.user?.email}</p>
          </div>
          <button
            onClick={logoutUser}
            className="text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
