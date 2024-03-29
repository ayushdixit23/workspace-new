import Link from "next/link";
import React from "react";
import Color from "../assets/icons/color";
import Research from "../assets/icons/Research";
import Research2 from "../assets/icons/Research2";
import Research3 from "../assets/icons/Research3";
import { usePathname, useSearchParams } from "next/navigation"
import Logo from "../assets/Logo";

function CustomNav() {
  const navItems = [
    {
      path: "/custom/edit",
      icon: <Color className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      path: "/custom/photo",
      icon: <Research className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
    {
      path: "/custom/color",
      icon: <Research2 className="sm:h-7 sm:w-7 h-8 w-8" />,
    },

    {
      path: "/custom/theme",
      icon: <Research3 className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
  ];
  const path = usePathname();
  return (
    <div>
      {/*sidebar*/}

      <div className="h-[100vh] bg-white vs:max-sm:hidden ">
        <div className="flex flex-col justify-between pt-10 h-[80vh]">
          <div className="flex items-center justify-center space-x-2 pt-6 md:-ml-4">
            <Logo />
          </div>
          <nav>
            <ul className="flex flex-col justify-between">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 duration-150  ${path === item.path ? "" : "text-black"
                    }`}
                >
                  <div
                    className={` duraction-100 ${path === item.path
                      ? "h-10 w-1 rounded-full bg-black"
                      : "h-0 w-0"
                      }`}
                  ></div>
                  <div>
                    <Link href={item.path} className="flex items-center">
                      <div className="my-4 mx-2">
                        {item.icon}
                      </div>

                      <div
                        className={`p-4 vs:max-md:hidden  ${path === item.path ? "font-bold" : "font-medium"
                          }`}
                      ></div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-2 ">
            <div className="flex space-x-3 h-[60px] items-center">
              {/* <SettingIcon />
          <Link
            href={"main/settings"}
            className="font-medium vs:max-md:hidden "
          >
            Settings
          </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/*Tabbar*/}
      <div className="h-14 sm:hidden bottom-0 border-t-2 border-[#f5f5f5] bg-white fixed w-[100%] ">
        <nav className="">
          <ul className="flex justify-between px-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={` flex-col flex justify-center items-center duration-150  ${path === item.path ? "" : "text-black"
                  }`}
              >
                <div
                  className={`duraction-100 ${path === item.path
                    ? "h-1 w-10 rounded-full bg-black"
                    : "h-0 w-0"
                    }`}
                ></div>
                <div className="h-10 w-10 pt-2">
                  <Link
                    href={item.path}
                    className="flex justify-center items-center"
                  >
                    <div>{item.icon}</div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomNav;
