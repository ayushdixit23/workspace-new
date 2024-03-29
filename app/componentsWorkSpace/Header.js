"use client"
import React, { useEffect, useMemo, useState } from "react";
import Workspaceicon from "../assets/icons/Logo";
//import Notify from "../assets/icons/Notify";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getData } from "../utilsHelper/Useful"
import { FaCrown } from "react-icons/fa";;
// import { ModeToggle } from "./ModeToggle";
import MembershipPopup from "./MembershipPopup";
import Link from "next/link";

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


  console.log(memberships, "mem")

  return (

    <>
      {pop &&
        <div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black/50 sm:h-screen'>
          <MembershipPopup setPop={setPop} />
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
          {!(pathname == "/main/settings" || pathname == "/main/earnings") && <div className="font-bold">Hey, {name}</div>}


        </div>
        <div className="flex justify-center items-center gap-3">

          {memberships == "Premium" &&
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

          }
          {/* 
          <div className="flex justify-center
           items-center">

            <ModeToggle />
          </div> */}
          {memberships === "Free" && <div class="relative group">
            <div className="absolute transition-all duration-500 opacity-50 -inset-1 bg-gradient-to-r from-[#44BCFF] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
            </div>
            <button onClick={() => setPop(true)} href="#" title="Get quote now" className="relative inline-flex items-center gap-3 text-sm justify-center px-4 py-3 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none" role="button">
              <FaCrown />
              Premium
            </button>


          </div>}

          <div className="sm:hidden">

            {pic !== null ? (
              <Link href={"/main/settings"}>
                <Image
                  src={pic}

                  alt="dp"
                  height={100}
                  width={100}
                  className="h-10 w-10 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
                />
              </Link>
            ) : (
              <div
                onClick={() => setProf(!prof)}
                className="h-10 w-10 bg-red-600 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            )}
          </div>
          <div className="pn:max-sm:hidden">
            {pic !== null ? (
              <Image
                src={pic}
                alt="dp"
                height={100}
                width={100}
                className="h-10 w-10 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            ) : (
              <div
                onClick={() => setProf(!prof)}
                className="h-10 w-10 bg-red-600 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            )}
          </div>
        </div>
      </div >
    </>

  );
}

export default Header;
