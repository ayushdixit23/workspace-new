"use client";
import { usePathname } from "next/navigation";
import Header from "../componentsWorkSpace/Header";
import NavBar from "../componentsWorkSpace/Navbar";
import { memo } from "react";
import { useSelector } from "react-redux";

export default function MainLayout({ children }) {
  const MemorizedNav = memo(NavBar);
  const MemorizedHeader = memo(Header);
  const path = usePathname();
  const isLoading = useSelector((state) => state.userData.isLoading);

  return (  
    <div className="bg-white dark:bg-[#1b2431] font-nunito duration-75 h-screen w-screen fixed flex pn:max-sm:flex-col ">
      <div
        className={` ${
          path === "/main/community/editCommunity" ||
          path === "/main/community/createCommunity" ||
          path === "/main/store/addproduct" ||
          path === "/main/store/editproduct" ||
          isLoading
            ? "pn:max-sm:hidden "
            : null
        }  `}
      >
        <MemorizedNav />
      </div>
      <div
        className={`sm:hidden top-0 left-0 w-full ${
          isLoading ? "z-20" : "z-10 sticky"
        } `}
      >
        <MemorizedHeader />
      </div>
      <div className="w-full pn:max-sm:h-auto pn:max-sm:overflow-y-auto pn:max-sm:mb-14 no-scrollbar bg-[#eff1f5] dark:bg-[#1b2431] sm:p-4">
        <div
          className={`${
            path === "/main/community" ? "pn:max-sm:bg-white" : null
          } flex flex-col h-full dark:bg-[#1b2431] gap-4`}
        >
          <div className="pn:max-sm:hidden flex h-[10%] justify-center items-center">
            <MemorizedHeader />
          </div>
          <div
            className={`sm:rounded-xl dark:bg-[#1b2431] max-w-full w-full no-scrollbar pn:max-sm:pb-8 ${
              path === "/main/dashboard" ? "":"sm:overflow-y-auto"}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

