import React from "react";
import SideNavbar from "./SideNavbar";
import Navbar from "./Navbar";

import { ReactNode } from "react";

function Layout({ children, showSidebar = true }: { children: ReactNode; showSidebar?: boolean }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden mx-4 md:mx-10 xl:mx-[10rem] mt-2  ">
        {showSidebar && <SideNavbar />}
        <main
          className={`flex-1 overflow-auto  ${
            showSidebar ? "lg:ml-4 xl:ml-10" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
