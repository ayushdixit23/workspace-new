import React from "react";
import { RxCross1 } from "react-icons/rx";
import { getData } from "../utilsHelper/Useful";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { LoadThis } from "../redux/slice/userData";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Flow from "../assets/icons/Flow.json";

const MembershipPopup = ({ setPop }) => {
  const { memberships } = getData();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex md:w-[80%] md:h-[85%] sm:max-h-[650px] h-screen w-[95%] bg-bggg bg-cover  mt-5 overflow-y-scroll no-scrollbar rounded-2xl  pt-[30px] sm:overflow-hidden sm:px-[40px]">
        <div className="min-w-full p-[10px]">
          <div className="flex justify-between items-center">
            <p className="text-[#fff] text-[20px] leading-[40px] font-semibold">
              Your Subscription
            </p>
            <div
              onClick={() => {
                setPop(false);
                dispatch(LoadThis(false));
              }}
              className="text-white"
            >
              <RxCross1 />
            </div>
          </div>
          <div className="mt-[20px] pn:max-sm:pb-[90px] sm:pb-[50px] grid sm:grid-cols-4 gap-[20px]">
            <div
              key="1"
              className="w-full bg-[#fff] sm:hover:scale-105 duration-100 ring-1 ring-red-200 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] p-1"
            >
              <div className="bg-[#f0f0f0] h-[150px] p-2 flex flex-col justify-center items-center rounded-[10px] w-full">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-[#070707] text-[19px] font-bold">Free</p>
                  </div>
                  <p className="text-[#333333] text-[14px] font-medium">
                    Free Membership
                  </p>
                  <p className="text-[#333333] text-[30px]  font-bold">
                    &#8377;0
                  </p>
                </div>
              </div>
              <div className="mt-3 pl-1">
                <div className="flex flex-col gap-3">
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 5 Products
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 2 Communities
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Badge : Not Available
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Access upto 5 templates
                  </p>
                </div>
                {memberships === "Free" && (
                  <div className="mt-[25px] -ml-1">
                    <button
                      disabled
                      className="bg-[#99b5d0] w-full rounded-lg py-[14px] px-[25px] text-[#fff] text-[14px] font-semibold"
                    >
                      Current Plan
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div
              key="2"
              className="w-full bg-[#fff] sm:hover:scale-105 duration-100 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] p-1"
            >
              <div className="bg-[#f0f0f0] h-[150px] p-2 flex flex-col justify-center items-center rounded-[10px] w-full">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-[#070707] text-[19px] font-bold">Plus</p>
                    <div className="bg-[#F6F6F7] dark:bg-[#006EF5] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-white text-[12px] leading-[28px] font-bold">
                        Starter
                      </p>
                    </div>
                  </div>
                  <p className="text-[#333333] text-[14px] font-medium">
                    Unleash Your Creative Power!
                  </p>
                  <p className="text-[#333333] text-[30px]  font-bold">
                    &#8377;499{" "}
                    <span className="text-[#333333] text-[12px] font-medium">
                      .Excluding gst
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pl-1">
                <div className="flex flex-col gap-3">
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 5 Products
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 3 Communities
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Badge: Available
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Access upto 10 templates
                  </p>
                </div>
                <div className="mt-[25px] -ml-1">
                  <button
                    onClick={() => router.push("/membership")}
                    className="bg-[#006EF5] rounded-lg py-[15px] px-[25px] w-full text-[#fff] text-[14px] leading-[17px] font-semibold"
                  >
                    Upgrade +
                  </button>
                </div>
              </div>
            </div>
            <div
              key="3"
              className="w-full bg-[#fff] ring-2 ring-yellow-400 sm:hover:scale-105 duration-100 scale-100 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] p-1"
            >
              <div className="bg-[#f0f0f0] h-[150px] p-2 flex flex-col justify-center items-center rounded-[10px] w-full">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-[#070707] text-[19px] font-bold">Pro</p>
                    <div className="sm:h-[20px] h-[20px] pp:w-[230px] w-[150px] relative flex justify-end  items-center">
                      <Lottie
                        animationData={Flow}
                        className="sm:h-[30px] h-[30px] pp:w-[90px] w-[80px] relative flex justify-center items-center"
                        loop={true}
                      />

                      <div className="px-2 flex justify-center items-center font-medium absolute text-black rounded-xl ">
                        <div className=" rounded-[20px] flex justify-center align-center ">
                          <p className="text-[#00153B] text-[12px] font-bold">
                            Most Popular
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#333333] text-[14px] font-medium">
                    Unleash Your Startup's Potential!
                  </p>
                  <p className="text-[#333333] text-[30px]  font-bold">
                    &#8377;1999{" "}
                    <span className="text-[#333333] text-[12px] font-medium">
                      .Excluding gst
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pl-1">
                <div className="flex flex-col gap-3">
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 10 Products
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 5 Communities
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Badge : Available
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Access upto 15 templates
                  </p>
                </div>
                <div className="mt-[25px] -ml-1">
                  <button
                    onClick={() => router.push("/membership")}
                    className="bg-yellow-400 rounded-lg py-[15px] px-[25px] w-full text-[#fff] text-[14px] leading-[17px] font-semibold"
                  >
                    Upgrade +
                  </button>
                </div>
              </div>
            </div>
            <div
              key="4"
              className="w-full bg-[#fff] sm:hover:scale-105 duration-100 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] p-1"
            >
              <div className="bg-[#f0f0f0] h-[150px] p-2 flex flex-col justify-center items-center rounded-[10px] w-full">
                <div className="w-full">
                  <div className="flex justify-between  w-full">
                    <p className="text-[#070707] w-full text-[19px] font-bold">
                      Premium
                    </p>
                    <div className="sm:h-[20px] h-[20px] pp:w-[230px] w-[100px] relative flex justify-end  items-center">
                      <Lottie
                        animationData={Flow}
                        className="sm:h-[30px] h-[30px] pp:w-[70px] w-[60px] relative flex justify-center items-center"
                        loop={true}
                      />

                      <div className="px-2 flex justify-center items-center w-full max-w-[100px] left-8 font-medium absolute text-black rounded-xl ">
                        <div className=" rounded-[20px] flex justify-center items-center w-full text-center align-center ">
                          <p className="text-[#00153B] text-[12px] font-bold">
                            VIP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#333333] text-[14px] font-medium">
                    Exclusivity Redefined!
                  </p>
                  <p className="text-[#333333] text-[30px]  font-bold">
                    &#8377;3499{" "}
                    <span className="text-[#333333] text-[12px] font-medium">
                      .Excluding gst
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pl-1">
                <div className="flex flex-col gap-3">
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 10 Products
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Create Up-to 10 Communities
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Badge: Available
                  </p>
                  <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                    {">"} Access upto 30 templates
                  </p>
                </div>
                <div className="mt-[25px] -ml-1">
                  <button
                    onClick={() => router.push("/membership")}
                    className="bg-[#006EF5] rounded-lg py-[15px] px-[25px] w-full text-[#fff] text-[14px] leading-[17px] font-semibold"
                  >
                    Upgrade +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => router.push("/membership")}
              className="bg-[#006EF5] sm:-mt-9 flex justify-center items-center gap-1 rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
            >
              Learn More
              <IoIosArrowRoundForward className="text-lg font-semibold text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipPopup;
