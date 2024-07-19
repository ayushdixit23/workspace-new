import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { encryptaes } from "@/app/utilsHelper/security";
import Cookies from "js-cookie";

function productinformation({ handleDelete, data, userid, collectionid, index }) {
  const [open, setOpen] = useState()
  return (
    <>
      <div className={`${open ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md" : "hidden -z-50"}`}>
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] dark:text-white lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
            <div className="flex flex-col gap-3 mt-4 justify-center mb-4 items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                <div>Do you really want to delete this Product?</div>
                <div> This process cannot be undone.</div>
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button onClick={() => setOpen(false)} className="w-full border-2 dark:border-white p-2 px-5 rounded-xl">
                Cancel
              </button>
              <button onClick={() => { handleDelete(userid, data?._id, collectionid, index); setOpen(false) }} className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-sm">
        <div className=" flex items-center vs:max-sm:px-2  sm:mx-2 sm:px-[1%] sm:rounded-[20px] py-3 justify-between">
          {/** */}
          <div className="flex gap-3 w-64 sm:max-md:w-52 items-center">
            <img
              src={data?.dp}
              alt="url"
              height={140}
              width={140}
              className="h-16 w-16 cursor-pointer flex justify-center items-center rounded-[10px] border border-[#f1f1f1]"
            />

            {/**phone */}
            <div className="">
              <div className=" text-[#1d1f2c] font-semibold dark:text-white">
                {data?.name.length > 20 ? `${data?.name.slice(0, 20)}...` : data?.name}
              </div>
              <div className="text-[12px] font-medium vs:max-sm:hidden">
                Sold by {data?.brandname}
              </div>
              {/* <div className="sm:hidden flex">
                <strike className="text-gray-500 text-[13px] flex items-center">
                  {data?.price}
                </strike>
                <div className="font-semibold text-[18px]">
                  {data?.discountedprice}
                </div>
              </div> */}
              <div className="font-medium sm:hidden">
                &#8377; {data?.isvariant ? data.variants[0].category[0].discountedprice : data?.discountedprice}
              </div>
            </div>
          </div>
          {/*web */}

          <>
            <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
              <div className="space-y-4">
                <div className="vs:max-sm:hidden">{data?.isvariant ? data.variants[0].category[0].quantity : data?.quantity}</div>
              </div>
            </div>
            {/* <div className="vs:max-sm:hidden w-36  flex justify-center ">
              <strike className="text-gray-500 text-[13px]">
                {data?.price}
              </strike>
              <div className="font-semibold text-[18px]">
                {data?.discountedprice}
              </div>
            </div> */}
            <div className=" vs:max-sm:hidden w-36  flex justify-center">
              &#8377; {data?.isvariant ? data.variants[0].category[0].discountedprice : data?.discountedprice}
            </div>
            <div className="vs:max-sm:hidden sm:max-md:w-24 sm:max-md:justify-start w-36 flex justify-center ">
              <div className="space-y-4">
                <div className="vs:max-sm:hidden">{data?.isverified === "in review" && "pending"} </div>
                <div className="vs:max-sm:hidden">{data?.isverified === "verified" && <>{data?.quantity <= 0 ? "Out Of Stock" : "In Stock"}</>} </div>
                <div className="vs:max-sm:hidden">{data?.isverified === "rejected" && "rejected"}</div>
              </div>
            </div>

          </>

          {/* <div className=" justify-center items-center  sm:max-md:pr-10 space-x-1 w-36 mt-2 flex-col flex vs:max-sm:hidden">
          <div
            onClick={() => {
              setChange(!change);
            }}
          >
            <Togglebutton />
          </div>
          <div
            className={`${change === true
              ? "text-green-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            In stock
          </div>
          <div
            className={`${change === false
              ? "text-red-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            out of stock
          </div>
        </div> */}
          <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
            <div className="space-y-4">
              <div className="vs:max-sm:hidden">{data?.isverified}</div>
              {/* <div className="vs:max-sm:hidden">{formatISOStringToDMY(data?.createdAt)}</div> */}
            </div>
          </div>

          <div

            className="flex gap-2 items-center justify-end  md:w-36"
          >
            <Link href={"/main/store/editproduct"} className="cursor-pointer" onClick={() => {
              Cookies.set("pivc", encryptaes(data?._id))
              Cookies.set("clvss", encryptaes(collectionid))

            }} title="Edit">
              <MdEdit size={20} />
            </Link>
            <div title="Delete" onClick={() => setOpen(true)} className="cursor-pointer">
              <RiDeleteBin6Line size={20} />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

const Memorizedproductinformation = React.memo(productinformation)
export default Memorizedproductinformation;
