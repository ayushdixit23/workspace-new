import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CommunityLight from "../assets/icons/CommunityLight";
import DashboardLight from "../assets/icons/DashboardLight";
import { usePathname, useRouter } from "next/navigation";
import StoreLight from "../assets/icons/StoreLight";
import SettingsLight from "../assets/icons/SettingsLight";
import CustomizationLight from "../assets/icons/CustomizationLight";
import Logo from "../assets/icons/Logo";
import EarningLight from "../assets/icons/MonetizationLight";
import { MdOutlineLogout } from "react-icons/md";
import CustomizationDark from "../assets/icons/CustomizationDark";
import CommunityDark from "../assets/icons/CommunityDark";
import DashboardDark from "../assets/icons/DashboardDark";
import EarningDark from "../assets/icons/MonetizationDark";
import SettingsDark from "../assets/icons/SettingsDark";
import StoreDark from "../assets/icons/StoreDark";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { sendData } from "../redux/slice/userData";
import { getData } from "../utilsHelper/Useful";
import NewMembershipPopup from "./NewMembershipPopup";
import { FaCrown } from "react-icons/fa";

function NavBar() {
  const MemoizedDashIconLight = useMemo(() => DashboardLight, []);
  const MemoizedComIconLight = useMemo(() => CommunityLight, []);
  const MemoizedStoreLight = useMemo(() => StoreLight, []);
  const MemoizedEarningLight = useMemo(() => EarningLight, []);
  const MemoizedSettingsLight = useMemo(() => SettingsLight, []);
  const MemoizedCustomizationLight = useMemo(() => CustomizationLight, []);
  const MemoizedDashIconDark = useMemo(() => DashboardDark, []);
  const MemoizedComIconDark = useMemo(() => CommunityDark, []);
  const MemoizedStoreDark = useMemo(() => StoreDark, []);
  const MemoizedEarningDark = useMemo(() => EarningDark, []);
  const MemoizedSettingsDark = useMemo(() => SettingsDark, []);
  const MemoizedCustomizationDark = useMemo(() => CustomizationDark, []);
  const MemoizedLogo = useMemo(() => Logo, []);
  // const [pop, setPop] = useState(true)
  const [pop, setPop] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { memberships } = getData()
  const path = usePathname();
  const { theme, systemTheme } = useTheme();
  const dispatch = useDispatch()
  const colorToPut = path.split("/").pop().toLowerCase();
  const [location, setLocation] = useState(colorToPut);

  const navItems = [
    {
      label: "Dashboard",
      path: "/main/dashboard",
      lighticon: <MemoizedDashIconLight className="sm:h-10 sm:w-10 h-8 w-8" />,
      darkicon: <MemoizedDashIconDark className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      label: "Community",
      path: "/main/community",
      lighticon: <MemoizedComIconLight className="sm:h-7 sm:w-7 h-8 w-8" />,
      darkicon: <MemoizedComIconDark className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      label: "Store",
      path: "/main/store",
      lighticon: <MemoizedStoreLight className="sm:h-7 sm:w-7 h-8 w-8" />,
      darkicon: <MemoizedStoreDark className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      label: "Earnings",
      path: "/main/earnings",
      lighticon: <MemoizedEarningLight className="sm:h-7 sm:w-7 h-8 w-8" />,
      darkicon: <MemoizedEarningDark className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    // {
    //   label: "Settings",
    //   path: "/main/settings",
    //   lighticon: <MemoizedSettingsLight className="sm:h-7 sm:w-7 h-8 w-8" />,
    //   darkicon: <MemoizedSettingsDark className="sm:h-10 sm:w-10 h-8 w-8" />,
    // },
    {
      label: "Customization",
      path: "/main/customization",
      lighticon: (
        <MemoizedCustomizationLight className="sm:h-7 sm:w-7 h-8 w-8" />
      ),
      darkicon: (
        <MemoizedCustomizationDark className="sm:h-10 sm:w-10 h-8 w-8" />
      ),
    },
  ];

  const ChangeColor = (color) => {
    try {
      if (window != undefined) {
        sessionStorage.setItem("color", color);
        setLocation(color);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      // Cookies.remove(`excktn${sessionId}`)
      // Cookies.remove(`frhktn${sessionId}`)
      Cookies.remove(`excktn`);
      Cookies.remove(`frhktn`);
      // localStorage.removeItem(`excktn`);
      // localStorage.removeItem(`frhktn`);
      setOpen(false);

      router.push("/login");
      setTimeout(() => { dispatch(sendData("")) }, 2500)

    } catch (error) {
    }
  };

  useEffect(() => {
    if (window != undefined) {
      const color = sessionStorage.getItem("color");
      setLocation(color);
    }
  }, [location]);

  useEffect(() => {
    if (window != undefined) {
      const color = sessionStorage.setItem("color", colorToPut);
      setLocation(color);
    }
  }, [path]);

  return (
    <div>
      {/*sidebar*/}

      {pop &&
        <div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur'>
          <NewMembershipPopup setPop={setPop} />
          {/* <MembershipPopup setPop={setPop} /> */}
        </div>
      }

      <div
        className={`${open
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "hidden -z-50"
          }`}
      >
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] rounded-xl p-4 dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-8 mt-2 justify-center items-center w-full">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                Are you sure you want to log out?
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button
                onClick={() => setOpen(false)}
                className="w-full dark:border-[#3d4654] border-2 p-2 px-5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside
        className={`${open ? "-z-30" : null
          } flex flex-col md:w-64 sm:w-[86px] h-screen px-4 pn:max-sm:hidden py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}
      >
        <div className="flex sm:max-md:items-center sm:max-md:justify-center gap-2 pt-3">
          <MemoizedLogo />
          <div className="flex flex-col sm:max-md:hidden">
            <span className="md:text-[24px]  font-bold ">
              <a className="text-[#4880FF]">Work</a>space
            </span>
            <div className="self-end font-medium flex text-[12px]">by Grovyo</div>
          </div>
        </div>

        <div className="flex flex-col sm:max-md:text-sm justify-between flex-1 mt-16">
          <nav>
            <Link
              onClick={() => ChangeColor("dashboard")}
              className={`flex ${open ? "-z-30" : null} ${location == "dashboard"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 dark:text-gray-400 rounded-2xl`}
              href="/main/dashboard"
            >
              {theme === "light" &&
                (location == "dashboard" ? (
                  <MemoizedDashIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedDashIconLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedDashIconDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedDashIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "dashboard" ? (
                  <MemoizedDashIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedDashIconLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Overview
              </span>
            </Link>

            <Link
              onClick={() => ChangeColor("community")}
              className={`flex ${open ? "-z-30" : null} ${location == "community"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 mt-5 dark:text-gray-400 rounded-2xl`}
              href="/main/community"
            >
              {theme === "light" &&
                (location == "community" ? (
                  <MemoizedComIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedComIconLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedComIconDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedComIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "community" ? (
                  <MemoizedComIconDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedComIconLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Community
              </span>
            </Link>

            <Link
              onClick={() => ChangeColor("store")}
              className={`flex ${open ? "-z-30" : null} ${location == "store"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 mt-5 dark:text-gray-400 rounded-2xl`}
              href="/main/store"
            >
              {theme === "light" &&
                (location == "store" ? (
                  <MemoizedStoreDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedStoreLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedStoreDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedStoreDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "store" ? (
                  <MemoizedStoreDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedStoreLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Store
              </span>
            </Link>

            <Link
              onClick={() => ChangeColor("customization")}
              className={`flex ${open ? "-z-30" : null} ${location == "customization"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 mt-5 dark:text-gray-400 rounded-2xl`}
              href="/main/customization"
            >
              {theme === "light" &&
                (location == "customization" ? (
                  <MemoizedCustomizationDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedCustomizationLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedCustomizationDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedCustomizationDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "customization" ? (
                  <MemoizedCustomizationDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedCustomizationLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Prosite
              </span>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            <Link
              onClick={() => ChangeColor("earnings")}
              className={`flex ${open ? "-z-30" : null} ${location == "earnings"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 mt-5 dark:text-gray-400 rounded-2xl`}
              href="/main/earnings"
            >
              {theme === "light" &&
                (location == "earnings" ? (
                  <MemoizedEarningDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedEarningLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedEarningDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedEarningDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "earnings" ? (
                  <MemoizedEarningDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedEarningLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Earnings
              </span>
            </Link>

            <Link
              onClick={() => ChangeColor("settings")}
              className={`flex ${open ? "-z-30" : null} ${location == "settings"
                ? "dark:bg-[#4880ff] dark:text-white bg-[#487fff4b]  text-[#4880ff] ring-1 ring-[#4880ff]"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } items-center px-4 py-2 gap-2 mt-5 dark:text-gray-400 rounded-2xl`}
              href="/main/settings"
            >
              {theme === "light" &&
                (location == "settings" ? (
                  <MemoizedSettingsDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedSettingsLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}

              {theme === "dark" && (
                <MemoizedSettingsDark className="w-5 h-5 sm:max-md:w-11 " />
              )}

              {theme === "system" &&
                (systemTheme === "dark" ? (
                  <MemoizedSettingsDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : location === "settings" ? (
                  <MemoizedSettingsDark className="w-5 h-5 sm:max-md:w-11 " />
                ) : (
                  <MemoizedSettingsLight className="w-5 h-5 sm:max-md:w-11 " />
                ))}
              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">
                Settings
              </span>
            </Link>

          </nav>

          {memberships !== "Free" && <button
            onClick={() => setOpen(true)}
            className="flex items-center px-4"
          >

            <MdOutlineLogout className="text-2xl" />
            <span className="mx-2  sm:max-md:hidden font-medium text-gray-800 dark:text-gray-200">
              Log Out
            </span>
          </button>}

          {memberships === "Free" && < div onClick={() => {
            setPop(true)
          }} className="md:flex justify-center gap-4 bg-premiumM hidden bg-cover bg-center text-white p-2 px-3 rounded-xl items-center">
            <div className="text-xs font-semibold">Upgrade To Premium</div>
            <div className="p-1 px-3 bg-[#4880FF] text-white text-sm font-semibold rounded-lg">{memberships === "Free" && "Plus"} {memberships === "Plus" && "Pro"} {memberships === "Pro" && "Premium"}</div>
          </div>}


          {memberships === "Free" && < div onClick={() => {
            setPop(true)
          }} className="sm:max-md:flex hidden justify-center gap-4 bg-premiumM  bg-cover bg-center text-white p-2 px-3 rounded-xl items-center">

            <FaCrown />
          </div>}
        </div>
      </aside >

      {/*Tabbar*/}
      < div className={`h-14 sm:hidden bottom-0 dark:text-white border-t-2 dark:border-[#3d4654] dark:bg-[#1b2431] ${path == "/main/earnings" ? "z-30" : "z-10"}  border-[#f5f5f5] bg-white fixed w-[100%] `
      }>
        <nav className="z-20">
          <ul className="flex justify-between px-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={` flex-col flex justify-center items-center duration-150 ${path === item.path ? "" : "text-black"
                  }`}
              >
                <div
                  className={`duraction-100 ${path === item.path
                    ? "h-1 w-10 rounded-full dark:bg-white bg-black"
                    : "h-0 w-0"
                    }`}
                ></div>
                <div className="h-10 w-10 pt-2">
                  {theme === "light" && (
                    <Link
                      href={item.path}
                      className="flex justify-center items-center"
                    >
                      <div>{item.lighticon}</div>
                    </Link>
                  )}

                  {theme === "dark" && (
                    <Link
                      href={item.path}
                      className="flex justify-center items-center"
                    >
                      <div>{item.darkicon}</div>
                    </Link>
                  )}

                  {theme === "system" &&
                    (systemTheme === "dark" ? (
                      <Link
                        href={item.path}
                        className="flex justify-center items-center"
                      >
                        <div>{item.darkicon}</div>
                      </Link>
                    ) : (
                      <Link
                        href={item.path}
                        className="flex justify-center items-center"
                      >
                        <div>{item.lighticon}</div>
                      </Link>
                    ))}

                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div >
    </div >
  );
}

export default NavBar;
