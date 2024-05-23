import React from "react";
import NoOrder from "../componentsWorkSpace/NoOrder";
import { formatDate, formatISOStringToDMY } from "../utilsHelper/Useful";
import ChartsStore from "./ChartsStore";
import verify from "../assets/image/verify.png";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Store from "../assets/image/Store.png";
import { BiCycling } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import Hover from "./Hover";

const Storedata = ({ getorderdata, sales }) => {
  const salesData =
    sales &&
    sales.map((d) => {
      return {
        Sales: d.Sales,
        Dates: formatDate(d.Dates),
      };
    });
  return (
    <div className={`flex flex-col gap-4`}>
      <div className="bg-white dark:text-white dark:bg-[#273142] rounded-xl p-2 px-3">
        {/* <div className="flex items-center px-3 py-2 gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="1" />
            <div>Last 6 days</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="2" />
            <div>Last Week</div>
          </div>
        </div> */}

        {getorderdata?.storeexistornot ? (
          getorderdata?.isStoreVerified ? (
            <>
              <div className="flex pt-2 px-2 text-lg font-semibold items-center gap-1">
                <Hover text={"Sales Analytics"} para={"Sales Trend: Track your daily sales performance over time. See how your sales fluctuate and identify trends to optimize your strategy."}
                  w2={"sm:w-[350px]"} />
              </div>
              <div className="w-full relative -left-10 pp:-left-8 sm:-left-6 top-2">
                {salesData.length > 0 ? (

                  <ChartsStore data={salesData} />

                ) : (
                  // <div className="h-[200px] w-full flex text-2xl text-center font-semibold justify-center items-center">
                  //   Data will be available after 7 days
                  // </div>
                  <div className="h-[200px] w-full flex text-2xl text-center font-semibold justify-center items-center">
                    No Data To Show
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full w-full rounded-xl">
              <div className="flex flex-col justify-center items-center p-3 h-full">
                <div className="text-2xl font-semibold text-center mt-5 pn:max-sm:text-lg px-2 dark:text-white">
                  Verification Process Underway
                </div>
                <Image src={verify} alt="image" className="max-w-[210px]" />
                <div className="text-sm">Status : In review</div>
                <div className="flex flex-col text-center max-w-[85%] text-sm sm:max-w-[50%] pt-9 justify-center items-center">
                  We appreciate your patience as we work to verify your account.
                  It Normally takes upto 24 hours. Thank you for your
                  understanding and cooperation during this process.
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-auto sm:h-[470px] flex flex-col justify-center items-center">
            <div className="sm:h-[300px] h-[80%] sm:w-[400px] my-4 w-[60%]">
              <Image src={Store} className="w-[100%] h-[100%]" />
            </div>
            <div className="py-2 w-full text-[20px] flex sm:text-2xl text-center font-semibold justify-center items-center">
              Get Ready To Create Your Store
            </div>
            <Link
              href={"/main/store"}
              className="bg-[#1554F6] text-white p-2 px-6 rounded-xl"
            >
              Create Now
            </Link>
          </div>
        )}
      </div>

      {
        getorderdata?.mergedOrder.length == 0 ? (
          // <div className="bg-white dark:bg-[#273142] rounded-xl h-[370px] sm:h-[400px]">
          //   <NoOrder />
          // </div>
          <></>
        ) : (
          <div

            className="w-full rounded-xl dark:bg-[#273142] bg-white sm:max-h-[200px] max-w-full overflow-y-scroll no-scrollbar sm:min-h-[200px] "
          >
            <div className="flex justify-end sm:justify-between items-center">
              <div className="text-lg font-semibold hidden sm:flex gap-1 items-center  p-2 sm:p-3 dark:text-white text-[#030229]">
                <Hover text={"Recent Orders"} para={"Quickly view and manage your latest orders. This ensures efficient fulfillment and keeps you informed about customer activity."} mobile={"-left-[80px]"} w2={"sm:w-[350px]"} />

              </div>
              {(getorderdata?.citydelivery && getorderdata?.countrydelivery) && <div className="flex sm:mt-0 mt-3 justify-center items-center gap-3 px-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="flex justify-center items-center gap-1">
                    <div><BiCycling /></div>
                    <div>{getorderdata?.citydelivery}</div>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <div><FaTruck />
                    </div>
                    <div>{getorderdata?.countrydelivery}</div>
                  </div>
                </div>
                <div className="text-sm hidden sm:block">View More</div>
              </div>}
            </div>

            <Link href={"/main/order"} className="pn:max-sm:hidden max-w-full min-w-[700px] overflow-scroll no-scrollbar dark:bg-[#273142] p-2 rounded-lg bg-white sm:px-3">
              <Table>
                <TableHeader className="dark:text-[#cfcfcf]">
                  <TableRow>
                    <TableHead className="w-[150px]">Order ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getorderdata?.mergedOrder?.map((d, iw) => (
                    <TableRow key={iw}>
                      <TableCell className="font-medium w-[150px] text-left">
                        #{d?.orderId?.slice(0, 8)}
                      </TableCell>
                      <TableCell className="text-center">
                        {" "}
                        <div className="flex items-center gap-2">
                          <div>
                            <img
                              src={d?.image}
                              alt="image"
                              className="w-[50px] h-[50px] rounded-xl object-cover"
                            />
                          </div>
                          <div className="flex text-sm text-left mb-[1px] flex-col">
                            <div>
                              {d?.productId?.name?.length > 17
                                ? `${d?.productId?.name?.slice(0, 17)}...`
                                : d?.productId?.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableHead>{d?.quantity}</TableHead>

                      <TableCell className="text-center">
                        {" "}
                        &#8377; {d?.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Link>
            <div className="sm:hidden rounded-xl dark:bg-[#273142] bg-white">
              <div>
                <div className="flex justify-between font-semibold p-3 px-4 dark:text-white items-center text-[#4A4C56]">
                  <div className="flex items-center gap-1">
                    <Hover text={"Recent Orders"} para={"Quickly view and manage your latest orders. This ensures efficient fulfillment and keeps you informed about customer activity."} mobile={"-left-[80px]"} w1={"w-[250px]"} w2={"sm:w-[350px]"} />

                  </div>
                  <div className="mr-4 text-sm">Status</div>
                </div>

                <Link href={"/main/order"}>
                  {getorderdata?.mergedOrder?.map((d, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-2 px-4 items-center"
                    >
                      <div className="flex justify-center items-center gap-2 pp:gap-4">
                        <div>
                          <img
                            src={d?.image}
                            alt="image"
                            className="w-[60px] h-[60px] rounded-xl object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex text-sm flex-col">
                            {d?.productId?.name?.length > 12
                              ? `${d?.productId?.name?.slice(0, 12)}...`
                              : d?.productId?.name}
                          </div>
                          <div className="text-[#667085] text-sm">
                            #{d?.orderId?.slice(0, 8)}
                          </div>
                          <div className="font-semibold text-sm pp:text-base">
                            Total: ₹{d?.total}
                          </div>
                        </div>
                      </div>
                      <div className="p-1.5 px-3 text-sm pp:text-base bg-[#FDF1E8] text-[#E46A11] rounded-2xl">
                        {d?.currentStatus}
                      </div>
                    </div>
                  ))}
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

const MemorizedStoredata = React.memo(Storedata);
export default MemorizedStoredata;
