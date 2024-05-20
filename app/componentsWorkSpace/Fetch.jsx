import React from "react";
import Img from "../assets/image/Img.png";
import Image from "next/image";
import NoOrder from "./NoOrder";
import { formatISOStringToDMY } from "../utilsHelper/Useful";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Fetch = ({ data }) => {
  return (
    <>
      {data?.length == 0 ? (
        <NoOrder />
      ) : (
        <div className="w-full p-3">
          {/* <table className="w-full border-collapse bg-white pn:max-sm:hidden border border-gray-300">
            <thead className="bg-[#f1f1f1]">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th colSpan="2" className="py-2 px-4 text-left">
                  Product
                </th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Payment</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    #{d?.orderId?.slice(0, 8)}
                  </td>
                  <td colSpan="2" className="py-2 px-4 text-left">
                    <div className="flex items-center gap-2">
                  
                      <div>
                        <img src={d?.image?.[0]} alt="image" className="max-w-[50px]" />

                      </div>
                      <div className="flex text-sm flex-col">
                        {d?.productId?.map((product, index) => (
                          <div key={index}>
                            {index < 2 ? product?.name : null}
                          </div>
                        ))}
                        {d?.productId?.length > 2 && <span>And more...</span>}
                      </div>
                    </div>
                  </td>

                  <td className="py-2 px-4 text-[#667085] text-sm">
                    {formatISOStringToDMY(d?.createdAt)}
                  </td>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    ${d?.finalprice}
                  </td>
                  <td className="py-2 px-4 font-medium">
                    {d?.buyerId?.fullname}
                  </td>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    {d?.paymentMode}
                  </td>
                  <td className="py-2 px-4 ">{d?.currentStatus}</td>
                </tr>
              ))}
            </tbody >
          </table> */}

          <Table className="bg-white min-w-[900px] overflow-x-scroll no-scrollbar pn:max-sm:hidden dark:bg-[#273142]">
            <TableHeader className="bg-slate-100 dark:bg-[#323d4e]">
              <TableRow>
                <TableHead className="w-[150px]">Order ID</TableHead>
                <TableHead className="text-left">Product</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Customer</TableHead>
                <TableHead className="text-center min-w-[100px]">Payment</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium w-[150px] text-left">
                    #{d?.orderId?.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-2">
                      {/* <div>
                        <Image src={Img} alt="image" className="max-w-[50px]" />
                      </div> */}
                      <div>
                        <img src={d?.image} alt="image" className=" object-contain bg-black w-[60px] h-[60px] rounded-xl " />

                      </div>
                      <div className="flex text-sm flex-col">
                        {/* {d?.productId?.map((product, index) => (
                          <div key={index}>
                            {index < 2 ? product?.name : null}
                          </div>
                        ))}
                        {d?.productId?.length > 2 && <span>And more...</span>} */}
                        {d?.productId?.name?.length > 17 ? `${d?.productId?.name?.slice(0, 17)}...` : d?.productId?.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {formatISOStringToDMY(d?.createdAt)}
                  </TableCell>
                  <TableCell className=" min-w-[100px] text-center">
                    &#8377; {d?.total}
                  </TableCell>
                  <TableCell className="text-center"> {d?.buyerId?.fullname}</TableCell>
                  <TableCell className="text-center "> {d?.paymentMode}</TableCell>
                  <TableCell className="text-center">{d?.currentStatus}</TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <div className="sm:hidden rounded-xl dark:bg-[#273142] bg-white">
            <div>
              <div className="flex justify-between font-semibold p-3 items-center dark:text-white text-[#4A4C56]">
                <div>Recent Orders</div>
                <div>Status</div>
              </div>
              {/* map parent*/}
              <div>
                {/* mapchildren */}
                {data?.map((d, ix) => (
                  <div
                    key={ix}
                    className="flex justify-between p-2 px-4 items-center"
                  >
                    <div className="flex justify-center items-center gap-2 pp:gap-4">
                      <div>
                        <img src={d?.image} alt="image" className="object-contain bg-black w-[60px] h-[60px] rounded-xl 
                        max-w-[100px]" />

                      </div>
                      <div className="flex flex-col">
                        <div className="flex text-sm flex-col">
                          {/* {d?.productId?.map((product, index) => (
                            <div key={index}>
                              {index < 2 ? product?.name : null}
                            </div>
                          ))} */}
                          {/* {d?.productId?.length > 2 && <span>And more...</span>} */}
                          {d?.productId?.name?.length > 12 ? `${d?.productId?.name?.slice(0, 12)}...` : d?.productId?.name}
                        </div>

                        <div className="text-[#667085] text-sm">
                          #{d?.orderId?.slice(0, 8)}
                        </div>
                        <div className="font-semibold text-sm pp:text-base">
                          Total: ₹{d?.total}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-sm pp:text-base bg-[#FDF1E8] text-[#E46A11] rounded-2xl">
                      {d?.currentStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

const MemorizedFetch = React.memo(Fetch)
export default Fetch;
