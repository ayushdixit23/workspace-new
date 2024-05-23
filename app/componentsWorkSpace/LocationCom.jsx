import React from "react";
import MemorizedDontHave from "./DontHave";
import BlurredComponent from "./Blur";
import Prem from "./Prem";

const LocationCom = ({ data, state, memberships }) => {
  const { location } = state
  return (
    <div className="w-full h-full">
      {memberships === "Free" ?
        <div className="w-full pn:max-sm:h-[240px] sm:h-full ">
          <Prem height="h-full" buttontext={"Unlock Locations"} text={"Discover where your community members are based to plan local events, target specific regions, and enhance your outreach efforts."} bgimage={"bg-locationlight dark:bg-locationdark"} />
        </div>
        :

        <div className="w-full h-full">
          {data > 0 ? <div className="dark:text-white text-sm">
            {/* {memberships === "Free" && <BlurredComponent />} */}
            <div className="flex justify-between mt-3 px-1 items-center">
              <div className="text-lg font-semibold pb-1">Top Location</div>
              {/* <div className="flex justify-center text-sm p-[5px] rounded-xl gap-1 border px-3 items-center">
            <div>Towns/Cities</div>
            <div>
              <FaAngleDown />
            </div>
          </div> */}
            </div>
            <div className="my-3 flex flex-col gap-4">

              {location && location?.map((d, i) => (
                <div key={i} className="px-2 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="text-xs dark:text-white  text-[#615E83]">{d?.state?.toUpperCase()}</div>
                    <div>{d?.value}%</div>
                  </div>

                  <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                    <div
                      style={{ width: `${d?.value}%` }}
                      className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#5A6ACF] h-full "
                    ></div>
                  </div>
                </div>
              ))}

            </div>
          </div > : <MemorizedDontHave />
          }
        </div>
      }
    </div>
  );
};

export default LocationCom;
