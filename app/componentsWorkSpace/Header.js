"use client"
import React, { useEffect, useMemo, useState } from "react";
import Workspaceicon from "../assets/icons/Logo";
//import Notify from "../assets/icons/Notify";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getData } from "../utilsHelper/Useful"
import { FaCrown } from "react-icons/fa";;
// import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import NewMembershipPopup from "./NewMembershipPopup";

function Header() {
  const [prof, setProf] = useState(true);
  const [pic, setPic] = useState();
  const [name, setName] = useState()
  const pathname = usePathname()
  const [pop, setPop] = useState(false)
  const { dp, fullname, memberships } = getData()
  const MemoizedWorkspaceIcon = useMemo(() => Workspaceicon, []);
  // const MemoizedNotify = useMemo(() => Notify, [])
  useEffect(() => {
    setName(fullname)
    setPic(dp)
  }, [fullname])

  return (

    <>
      {pop &&
        <div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur'>
          <NewMembershipPopup setPop={setPop} />
          {/* <MembershipPopup setPop={setPop} /> */}
        </div>
      }


      <div className={`flex dark:bg-[#273142] items-center py-3 sm:rounded-2xl bg-white justify-between px-6 ${pathname == "/main/community" ? "" : ""} w-full vs:max-sm:px-4`}>
        <div className="sm:hidden">
          <MemoizedWorkspaceIcon />
        </div>

        <div className="text-[22px] font-semibold vs:max-sm:hidden">
          {pathname == "/main/settings" ? "Settings" : null}
          {pathname == "/main/earnings" ? "Earnings" : null}
          {/* {(pathname.startsWith("/main/dashboard") || pathname.startsWith("/main/community") || pathname.startsWith("/main/store")) && <div className="font-bold">Hey, {name}</div>} */}

          {/* {(pathname.startsWith("/main/dashboard") || pathname.startsWith("/main/community") || pathname.startsWith("/main/store")) && <div className="font-bold">Hey, {name}</div>} */}
          {!(pathname == "/main/settings" || pathname == "/main/earnings") && <div className="font-bold flex justify-center  gap-1.5  items-center">Hey, {name} {(memberships !== null && memberships !== "Free") && < MdVerified className="text-blue-700 hidden sm:block" />}</div>}


        </div>
        <div className="flex justify-center items-center gap-3">

          {/* {memberships == "Premium" &&
            <div className=" border-2 p-2 rounded-full text-white bg-blue-500
          flex justify-center items-center gap-1">
              <FaCrown />
              <div className="font-semibold text-sm">Premium</div>
            </div>

          }
          {memberships == "Plus" &&
            <div className=" border-2 p-2 rounded-full text-white bg-blue-500
          flex justify-center items-center gap-1">
              <FaCrown />
              <div className="font-semibold text-sm">Plus</div>
            </div>

          }
          {memberships == "Pro" &&
            <div className=" border-2 p-2 rounded-full  text-white bg-blue-500
          flex justify-center items-center gap-1">
              <FaCrown />
              <div className="font-semibold text-sm">Pro</div>
            </div>

          } */}
          {/* 
          <div className="flex justify-center
           items-center">

            <ModeToggle />
          </div> */}
          {/* {memberships === "Free" && <div class="relative group">
            <div className="absolute transition-all duration-500 opacity-50 -inset-1 bg-gradient-to-r from-[#44BCFF] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
            </div>
            <button onClick={() => setPop(true)} href="#" title="Get your premium membership now" className="relative inline-flex items-center gap-3 text-sm justify-center px-4 py-3 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none" role="button">
              <FaCrown />
              Premium
            </button>


          </div>} */}

          {memberships === "Free" && < div onClick={() => { setPop(true) }} className="flex justify-center sm:hidden gap-4 bg-premiumM bg-cover bg-center text-white p-2 px-3 rounded-xl items-center">
            <div className="text-xs flex justify-center items-center gap-1 font-semibold">
              <div>Upgrade</div>
              <FaCrown />
            </div>
            {/* <div className="p-1 px-3 bg-[#4880FF] text-white text-sm font-semibold rounded-lg">{memberships === "Free" && "Plus"} {memberships === "Plus" && "Pro"} {memberships === "Pro" && "Premium"}</div> */}
          </div>}

          <div className="sm:hidden h-10 w-10">

            {pic !== null ? (
              <Link href={"/main/settings"} className="relative">
                <Image
                  src={pic}

                  alt="dp"
                  height={100}
                  width={100}
                  className=" w-full h-full object-cover cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
                />
                {(memberships !== null && memberships !== "Free") && <MdVerified className="text-blue-700 absolute -bottom-1 -right-1 text-[17px] sm:hidden block" />}
              </Link>
            ) : (
              <div
                onClick={() => setProf(!prof)}
                className="h-10 w-10  bg-black cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            )}
          </div>
          <div className="pn:max-sm:hidden h-10 w-10">
            {pic !== null ? (
              <Image
                src={pic}
                alt="dp"
                height={100}
                width={100}
                className="w-full h-full object-cover cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            ) : (
              <div
                onClick={() => setProf(!prof)}
                className="h-10 w-10 bg-black cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            )}
          </div>
        </div>
      </div >
    </>

  );
}

export default Header;
