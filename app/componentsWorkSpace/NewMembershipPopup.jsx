import React from "react";
import { useDispatch } from "react-redux";
import { LoadThis } from "../redux/slice/userData";
import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Link from "next/link";

const NewMembershipPopup = ({ setPop }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex lg:w-[80%] sm:pt-[14px] sm:w-[95%] w-full bg-loginbg dark:bg-[#273142] bg-[#fefefe] h-full md:max-h-[92%] bg-cover z-20 sm:mt-5 sm:rounded-2xl  sm:px-[40px]">
      <div className="min-w-full overflow-y-scroll no-scrollbar p-[10px]">
        <div className="flex justify-between items-center">
          <p className="dark:text-[#fff] text-black text-[20px] leading-[40px] font-semibold">
            Subscription Plans
          </p>
          <div
            onClick={() => {
              setPop(false);
              dispatch(LoadThis(false));
            }}
            className="dark:text-white"
          >
            <RxCross1 />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1 font-medium justify-center items-center">
            <div>Choose a plan that best suits your business.</div>
            <div>
              Start 1-month free trial: no obligation, no activation fee.
            </div>
          </div>
          <div className="mt-[20px]">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5 w-full">
              {/* free */}
              <div className="dark:bg-[#212A35] rounded-2xl light:shadow-sm bg-white flex w-full flex-col gap-5 p-6">
                <div className="font-semibold text-lg">Free</div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-semibold">
                    ₹0 / <span className="text-base">forever</span>
                  </div>
                  <div className="text-xs  text-[#838696]">Forever</div>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    href={"/membership"}
                    className="p-2 px-4 focus:border-2 border flex justify-center items-center font-medium text-sm w-full rounded-lg border-black/80 dark:border-white"
                  >
                    Active
                  </Link>
                </div>
                <div className="border border-dashed my-2 border-black/80 dark:border-white"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Product Listing (5 products)
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">Basic analytics</div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Create Communities 2
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Limited prosite tools
                    </div>
                  </div>
                </div>
              </div>

              {/* plus */}
              <div className="dark:bg-[#1E2840] bg-white border-4 light:shadow-sm border-[#FCCF49] relative rounded-2xl overflow-hidden flex w-full flex-col gap-5 p-6">
                <div class="absolute z-20 left-1/2 text-black  font-medium bg-[#FCCF49] p-1 px-10 rounded-b-full -top-1 transform text-xs -translate-x-1/2">
                  <div className="flex justify-end font-medium items-end">
                    Recommended
                  </div>
                </div>

                <div className="font-semibold text-lg">Plus</div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-semibold">
                    ₹499 /<span className="text-base">month</span>
                  </div>
                  <div className="text-xs  text-[#838696]">Billed monthly</div>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    href={"/membership"}
                    className="p-2 px-4 focus:border-2 flex justify-center items-center border text-sm w-full rounded-lg font-medium border-black/80 dark:border-white"
                  >
                    Getting Started
                  </Link>
                </div>
                <div className="border border-dashed my-2 border-black/80 dark:border-white"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Verification Badge
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Product Listing (5 products)
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Advanced Analytics
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">20% platform Fees</div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Create Communities 3
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Basis tools for prosite
                    </div>
                  </div>
                </div>
              </div>

              {/* pro */}
              <div className="dark:bg-[#212A35] rounded-2xl light:shadow-sm bg-white flex w-full flex-col gap-5 p-6">
                <div className="font-semibold text-lg">Pro</div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-semibold">
                    ₹1999 /<span className="text-base">month</span>
                  </div>
                  <div className="text-xs  text-[#838696]">Billed monthly</div>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    href={"/membership"}
                    className="p-2 px-4 focus:border-2 border flex justify-center items-center text-sm w-full rounded-lg font-medium border-black/80 dark:border-white"
                  >
                    Getting Started
                  </Link>
                </div>
                <div className="border border-dashed my-2 border-black/80 dark:border-white"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Verification Badge
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Product Listing 20 products
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Advanced analytics
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">3% platform Fees</div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Create Communities 5
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Advanced tools for prosite{" "}
                    </div>
                  </div>
                </div>
              </div>

              {/* premium */}
              <div className="dark:bg-[#1E2840] light:shadow-md bg-white rounded-2xl flex w-full flex-col gap-5 p-6">
                <div className="font-semibold text-lg">Premium</div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-semibold">
                    ₹3499 /<span className="text-base">month</span>
                  </div>
                  <div className="text-xs  text-[#838696]">Billed monthly</div>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    href={"/membership"}
                    className="p-2 px-4 focus:border-2 flex justify-center items-center border text-sm w-full rounded-lg font-medium border-black/80 dark:border-white"
                  >
                    Getting Started
                  </Link>
                </div>
                <div className="border border-dashed my-2 border-black/80 dark:border-white"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Verification Badge
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Product Listing 50 products
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Advanced analytics
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">1% platform Fees</div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Create Communities 10
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div>
                      <IoMdCheckmarkCircle />
                    </div>
                    <div className="text-sm font-medium">
                      Advanced tools for prosite{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={"/membership"}
            className="flex justify-center items-center underline text-sm mt-[18px] mb-[10px]"
          >
            Compare all features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewMembershipPopup;
