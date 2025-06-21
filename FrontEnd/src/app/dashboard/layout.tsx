"use client";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/components/SideNavbar";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { state } = useAppContext();
  const router = useRouter();
  const showSidebar = true; // or set this based on your logic
  useEffect(() => {
    if (state.isAuthenticated === false) {
      router.push("/");
    }
  }, [state]);
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          {/* <Navbar /> */}

          <div className="flex flex-1 overflow-hidden mx-4 md:mx-10 xl:mx-[6rem] mt-2  ">
            {showSidebar && <SideNavbar />}
            <main
              className={`flex-1 overflow-auto  ${
                showSidebar ? "lg:ml-4 xl:ml-6 px-2" : ""
              }`}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
