import React from "react";
import Navbar from "./Navbar";
import TransportSideNavbar from "./TransportSideNavbar";

import { ReactNode } from "react";

function TransportLayout({ children, showSidebar = true }: { children: ReactNode; showSidebar?: boolean }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden mx-4 md:mx-10 xl:mx-[10rem] mt-2  ">
        {showSidebar && <TransportSideNavbar />}
        <main
          className={`flex-1 overflow-auto  ${
            showSidebar ? "lg:ml-4" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default TransportLayout;
