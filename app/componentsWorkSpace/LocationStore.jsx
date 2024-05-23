import React from "react";
import { FaAngleDown } from "react-icons/fa";
import BlurredComponent from "./Blur";
import Prem from "./Prem";

const LocationStore = ({ data, memberships }) => {

  return (
    <>
      {memberships === "Free" ? <div className="h-[220px] ">
        {/* <BlurredComponent /> */}
        <Prem text={"Pinpoint customer locations for strategic marketing."} bgimage={"bg-locationlight dark:bg-locationdark"} />
      </div> : <div className="overflow-y-scroll dark:text-white sm:max-h-[200px] no-scrollbar">
        <div className="flex justify-between mt-3 px-3 items-center">
          <div className="text-lg font-semibold">Top Location</div>
          {/* <div className="flex justify-center text-sm p-[5px] rounded-xl gap-1 border px-3 items-center">
            <div>Towns/Cities</div>
            <div>
              <FaAngleDown />
            </div>
          </div> */}
        </div>
        <div className="my-3 flex flex-col gap-4">
          {
            data && data.map((d, i) => (
              <div key={i} className="px-2 flex flex-col gap-1">
                <div className="text-sm dark:text-white text-[#615E83]">{d?.state}</div>
                <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                  <div
                    style={{ width: `${d?.value}%` }}
                    className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                  ></div>
                </div>
              </div>
            ))
          }
          {/* <div className="px-2 flex flex-col gap-1">
            <div className="text-sm text-[#615E83]">Lucknow</div>
            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
              <div
                style={{ width: "70%" }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
              ></div>
            </div>
          </div>
          <div className="px-2 flex flex-col gap-1">
            <div className="text-sm text-[#615E83]">Delhi</div>
            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
              <div
                style={{ width: "70%" }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
              ></div>
            </div>
          </div> */}
        </div>
      </div>}
    </>
  );
};

export default LocationStore;
