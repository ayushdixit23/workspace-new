"use client";
import Image from "next/image";
import React, { useState } from "react";
import c1 from "../../assets/image/c1.png";
import c2 from "../../assets/image/c2.png";
import c3 from "../../assets/image/c3.png";
import Fetch from "@/app/componentsWorkSpace/Fetch";
import { useGetFetchOrderQuery } from "@/app/redux/apiroutes/userLoginAndSetting";
import { getData } from "@/app/utilsHelper/Useful";
import Pagination from "@/app/componentsWorkSpace/Pagination";
import Loader from "@/app/data/Loader";
import { FaTruck } from "react-icons/fa";
import { BiCycling } from "react-icons/bi";

const page = () => {
  const { id } = getData()
  const { data: getorderdata, isLoading } = useGetFetchOrderQuery(
    { id: id },
    { skip: !id }
  )
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;
  const postperData = getorderdata?.mergedOrder?.slice(firstIndex, lastindex);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {/* <div className="flex flex-col justify-center  items-center gap-4">
        <div>
          {[getorderdata]?.map((o, i) => (
            <div key={i}>
              <div>all orders: {o?.allorders}</div>
              <div>completedOrders: {o?.completedOrders?.length}</div>
              <div>customers: {o?.customers}</div>
              <div>damaged orders: {o?.damaged?.length}</div>
              <div>pending orders: {o?.pendingOrders?.length}</div>
              <div>returned orders: {o?.returned?.length}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center">
          {getorderdata?.orders?.map((d, j) => (
            <div key={j}>
              <div>customer name : {d?.buyerId?.fullname}</div>
              <div>Order Date : {d?.createdAt.slice(0, 10)}</div>
              <div>Payment Type : {d?.paymentMode}</div>
              <div>Status : {d?.currentStatus}</div>
              <div>
                routes: A : {d?.routes?.A}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                B:{d?.routes?.B}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                C:{d?.routes?.C}
                <div>!</div>
                <div>!</div>
                <div>!</div>
                D:{d?.routes?.D}
              </div>
              <div>Quantity : {d?.quantity}</div>
              <div>orderId: {d?.orderId}</div>
              <div>Total: {d?.total}</div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="grid grid-cols-1 w-full sm:p-3">
        <div className="text-[#8B8D97] dark:text-white px-2 my-2 text-lg">Track Order</div>
        <div className="grid grid-cols-1 w-full">
          <div className="flex flex-col">
            {/* web */}
            <div className="flex pn:max-sm:hidden justify-center bg-[#FAFAFA] dark:bg-[#1b2431] p-3 w-full items-center gap-2 md:gap-5">
              <div className="flex sm:max-md:text-xs h-full w-full justify-between p-3 py-5 bg-white dark:bg-[#273142]  dark:border dark:border-[#3d4654] rounded-xl gap-4 border ">
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <Image src={c1} alt="p1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Total Orders</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.allorders}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>

                </div>
                <div className="w-full flex justify-end flex-col gap-4">
                  <div>
                    <Image src={c2} alt="p2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Total Balance</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">{getorderdata?.earnings.toFixed(2)}</div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex sm:max-md:text-xs flex-col p-3 py-5 bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] rounded-xl gap-4 border w-full">
                <div>
                  <Image src={c2} alt="p2" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Total Balance</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">{getorderdata?.earnings.toFixed(2)}</div>

                  </div>
                </div>
              </div> */}

              <div className="flex sm:max-md:text-xs h-full w-full justify-between p-3 py-5 bg-white dark:bg-[#273142]  dark:border dark:border-[#3d4654] rounded-xl gap-4 border ">
                <div className="w-full flex flex-col gap-4">
                  <div><BiCycling className="text-[35px]" /></div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Delivery Left <br />(city)</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">{getorderdata?.citydelivery}</div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <FaTruck className="text-[35px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Delivery Left <br />(country)</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.countrydelivery}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-col p-3 sm:max-md:text-xs py-5 bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] rounded-xl gap-4 border w-full">
                <div>
                  <Image src={c3} alt="p2" />
                </div>
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Cancelled</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.cancelled?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Returned</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.returned?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Damaged</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.damaged?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* mobile */}
            <div className="grid grid-cols-2 sm:hidden bg-[#FAFAFA] dark:bg-[#273142] p-3 w-full items-center gap-2 md:gap-7">
              <div className="flex flex-col bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-3 rounded-xl gap-2 border w-full">
                <div>
                  <Image src={c1} alt="p1" />
                </div>
                <div>
                  <div className="font-medium">Total Orders</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">
                      {getorderdata?.allorders}
                    </div>
                    {/* <div className="text-green-700">+0.00%</div> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-3 rounded-xl gap-2 border w-full">
                <div>
                  <Image src={c2} alt="p2" />
                </div>
                <div>
                  <div className="font-medium">Total Balance</div>
                  <div className="flex gap-1 text-xs  items-center">
                    <div className="text-base font-medium">{getorderdata?.earnings.toFixed(2)}</div>
                    {/* <div className="text-green-700">+0.00%</div> */}
                  </div>
                </div>
              </div>

              <div className="flex col-span-2 bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] p-3 rounded-xl gap-3 border w-full">
                <div className="w-full flex flex-col gap-4">
                  <div><BiCycling className="text-[35px]" /></div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Delivery Left <br />(city)</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">{getorderdata?.citydelivery}</div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <FaTruck className="text-[35px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Delivery Left <br />(country)</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.countrydelivery}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex col-span-2 bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] flex-col p-3 rounded-xl gap-3 border w-full">
                <div>
                  <Image src={c3} alt="p2" />
                </div>
                <div className="flex justify-between items-center ">
                  <div>
                    <div className="font-medium">Cancelled</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.cancelled?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Returned</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.returned?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Damaged</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.damaged?.length}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Fetch data={postperData} />
            <div className="pn:max-sm:mb-[64px]">
              {getorderdata?.mergedOrder?.length > postPerPage && <Pagination
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                firstIndex={firstIndex}
                lastindex={lastindex}
                length={getorderdata?.mergedOrder.length}
              />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
