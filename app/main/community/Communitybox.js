"use client";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { encryptaes } from "@/app/utilsHelper/security";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { LoadThis } from "@/app/redux/slice/userData";
import { formatNumber } from "@/app/utilsHelper/Useful";
import Cookies from "js-cookie";

function Communitybox({ data, id, index, handleDelete }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [comDelete, setComDelete] = useState(false)

  const tosetCookie = {
    dps: data.dps?.trim(),
    title: data?.c?.title,
    category: data?.c?.category,
    desc: data?.c?.desc,
    type: data?.c?.type,
    topics: "",
    memberscount: data?.c?.memberscount
  }

  return (
    <>
      <div className={`${comDelete ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md" : "hidden -z-50"}`}>
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] dark:text-white lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
            <div className="flex flex-col gap-3 mt-4 justify-center mb-4 items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                <div>Do you really want to delete this Community?</div>
                <div> This process cannot be undone.</div>
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button onClick={() => { setComDelete(false), dispatch(LoadThis(false)) }} className="w-full border-2 dark:border-white p-2 px-5 rounded-xl">Cancel</button>
              <button onClick={() => { handleDelete({ dat: data, comid: data?.c?._id, index: index }), setComDelete(false), dispatch(LoadThis(false)) }} className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl">Delete</button>
            </div>
          </div>

        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`${open ? "fixed inset-0 z-10" : "-z-40"}`}
      ></div>
      <div
        className={`px-2 sm:bg-[#ffffff] dark:bg-[#273142] dark:text-white rounded-xl sm:shadow-sm py-2 sm:py-3.5 bg-[#f8f9fa] duration-75 
          `}
      >
        <div className="flex relative items-center w-full justify-between font-semibold ">

          <div className="flex items-center gap-2 sm:gap-4 px-3 w-64 sm:max-md:w-52">
            <img
              src={data?.dps?.trim()}
              alt="dp"
              height={100}
              width={100}
              className="h-14 min-w-14 cursor-pointer border border-[#f1f1f1] object-cover  flex justify-center items-center rounded-[24px] ring-1 ring-white"
            />


            <div>
              <div className="w-64 sm:max-md:w-52 text-[#1d1f2c] dark:text-white font-semibold">
                {data?.c?.title}
              </div>
              <div className="sm:hidden text-[12px] font-medium">
                {"by "}
                {data?.c?.creator?.fullname}
              </div>
            </div>
          </div>
          <div className="vs:max-sm:hidden text-center justify-center flex sm:max-md:w-20 w-36 ">{data?.c?.topics?.length}</div>
          <div className="vs:max-sm:hidden justify-center sm:max-md:w-24 flex w-36 ">
            {data?.c?.posts?.length}
          </div>
          <div className="vs:max-sm:hidden justify-center sm:max-md:w-36 flex w-36">
            {data?.c?.memberscount}
          </div>

          <div className="flex text-center sm:hidden relative mr-3 justify-around items-center">
            <BsThreeDotsVertical onClick={() => setOpen(!open)} />
            <div className={`${open ? "absolute top-5 z-50 -left-20 h-[120px] rounded-lg w-[100px] bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] shadow-lg" : "hidden"} `}>
              <div className="flex flex-col justify-start items-start gap-3 p-3">
                <Link href={"/main/community/editCommunity"} onClick={() => {
                  // setCookie("comedta", JSON.stringify(data))
                  Cookies.set("comedta", JSON.stringify(tosetCookie))
                  Cookies.set("cmdyd", encryptaes(data?.c?._id))

                }}>Edit</Link>
                <button onClick={() => { setComDelete(true), setOpen(false), dispatch(LoadThis(true)) }}>Delete</button>
                <Link onClick={() => {
                  Cookies.set("topic", encryptaes(data?.topicId?.topicid))
                }} href={`/main/post/${encryptaes(data?.c?._id)}`}>Posts</Link>
              </div>
            </div>
          </div>

          <div className="flex justify-around pn:max-sm:hidden items-center w-36 sm:max-md:w-28">
            <div className="flex text-center justify-center items-center">
              {data?.avgeng}%
            </div>
            <div className="flex cursor-pointer relative justify-around items-center">
              <BsThreeDotsVertical onClick={() => setOpen(!open)} />
              <div className={`${open ? "absolute top-5 z-50 -left-20 h-[120px] rounded-lg w-[100px] bg-white dark:bg-[#273142] shadow-lg" : "hidden"} `}>
                <div className="flex flex-col justify-start items-start gap-3 p-3">
                  <Link href={"/main/community/editCommunity"} onClick={() => {
                    // setCookie("comedta", JSON.stringify(data))
                    Cookies.set("comedta", JSON.stringify(tosetCookie))
                    Cookies.set("cmdyd", encryptaes(data?.c?._id))
                  }}>Edit</Link>
                  <button onClick={() => { setComDelete(true); setOpen(false) }}>Delete</button>
                  <Link onClick={() => {
                    Cookies.set("topic", encryptaes(data?.topicId?.topicid))
                  }} href={`/main/post/${encryptaes(data?.c?._id)}`}>Posts</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 mt-2 gap-4 sm:hidden p-2
            `}
        >
          <div
            className={`
              bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-2.5 rounded-xl
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm font-medium pp:text-[16px]`}>
                Topics
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[20px]`}>{data?.c?.topics?.length}</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`

            bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-2.5 rounded-xl
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm font-medium pp:text-[16px]`}>
                Total Posts
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[20px]`}>{data?.c?.posts?.length}</div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`
            bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-2.5 rounded-xl
          
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm font-medium pp:text-[16px]`}>
                Members
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[20px]`}> {formatNumber(data?.c?.memberscount)} </div>
                {/* <div>+00.0%</div> */}
              </div>
            </div>
          </div>
          <div
            className={`
           
            bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-2.5 rounded-xl
              `}
          >
            <div className="w-[100%]">
              <div className={`text-sm font-medium pp:text-[16px]`}>
                Engagement Rate
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className={`text-[20px]`}>{data?.avgeng}%</div>

              </div>
            </div>
          </div>
        </div>

      </div >
    </>
  );
}

export default Communitybox;
