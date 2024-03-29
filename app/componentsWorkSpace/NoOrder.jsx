import React from "react";
import order from "../assets/image/order.png";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import Link from "next/link";

const NoOrder = () => {
  return (
    <>
      <div className="w-full h-full p-2">
        <div className="p-2">Recent Orders</div>
        <div className="flex sm:flex-row flex-col gap-3 justify-center w-full items-center h-full">
          <div className="">
            <Image
              src={order}
              className="max-w-[100px] min-w-[95px] min-h-[95px] max-h-[100px]"
              alt="no"
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="text-xl text-center font-semibold">
              No Orders Yet?
            </div>
            <div className="py-2 text-[#8B8D97] max-w-[60%] text-center">
              Add products to your store and start selling to see orders here.
            </div>
            <div>
              <Link href="/main/store" className="bg-[#3E7AD3] text-white p-2 px-4 rounded-xl flex justify-center items-center gap-1">
                <div>
                  <GoPlus />
                </div>
                <div>Add Product</div>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default NoOrder;
