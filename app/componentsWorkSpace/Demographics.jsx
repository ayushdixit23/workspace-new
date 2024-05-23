import React from "react";
import MemorizedDontHave from "./DontHave";
import BlurredComponent from "./Blur";
import Prem from "./Prem";

const Demographics = ({ demo, data, member, ages, memberships }) => {

  return (
    <>
      <div className="w-full sm:h-full">
        {memberships === "Free" ? <div className="w-full pn:max-sm:h-[240px] sm:h-full">
          {/* <BlurredComponent /> */}
          <Prem height="h-full" buttontext={"Unlock Demographics"} text={"Know your community’s members age, gender, and interests to tailor your content perfectly! "}
            bgimage={"bg-customerlight  dark:bg-customerdark "}
          />
        </div> :
          <div className="w-full sm:h-full">

            {data > 0 ? < div className="p-3 border text-sm dark:border-[#3d4654] dark:text-white rounded-xl">

              <div className="flex justify-between items-center text-sm">
                <div>Statistics</div>
                <div>Total:</div>
              </div>

              <div className="flex border-b pb-3 dark:border-[#3d4654] justify-between items-center">
                <div className="font-bold">Age
                  {/* and gender */}
                </div>
                {/* <div className="flex justify-center pn:max-sm:text-sm items-center gap-3">
            <div className="flex justify-center items-center gap-1">
              <div
                className="w-4 h-4 rounded-full bg-[#4A3AFF]
			   border"
              ></div>
              <div>Male</div>
            </div>
            <div className="flex justify-center items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-[#C893FD] border"></div>
              <div>Female</div>
            </div>
          </div> */}
                <div className="font-bold">{member}</div>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:gap-6">
                {ages && ages?.map((d, i) => (
                  <div key={i} className="flex gap-2 justify-between items-center">
                    <div className="text-sm text-[#615E83] dark:text-white min-w-[45px]">{d?.age}</div>
                    <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
                      {/* <div
                  style={{
                    width: `${(demo?.ageof18_24man / demo?.total) * 100}%`,
                  }}
                  className="absolute top-0 left-0 rounded-l-xl z-10 bg-[#4A3AFF] h-full "
                ></div> */}

                      <div
                        style={{
                          width: `${(d?.percent)}%`,
                          // marginLeft: `${(demo?.ageof18_24man / demo?.total) * 100}%`,
                        }}
                        className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#4A3AFF] h-full"
                      ></div>
                    </div>
                    <div className="text-sm  dark:text-white text-[#615E83]">
                      {/* {calculation(demo?.ageof18_24man, demo?.ageof18_24woman)}% */}
                      {`${d?.percent}%`}
                    </div>
                  </div>
                ))}
                {/* <div className="flex gap-2 justify-between items-center">
            <div className="text-sm text-[#615E83] min-w-[40px]">25-34</div>
            <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
              <div
                style={{
                  width: `${(demo?.ageof25_34man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-l-xl z-10 bg-[#4A3AFF] h-full "
              ></div>
              <div
                style={{
                  width: `${(demo?.ageof25_34woman / demo?.total) * 100}%`,
                  marginLeft: `${(demo?.ageof25_34man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#C893FD] h-full"
              ></div>
            </div>
            <div className="text-sm text-[#615E83]">
              {calculation(demo?.ageof25_34man, demo?.ageof25_34woman)}%
            </div>
          </div> */}
                {/* 
          <div className="flex gap-2 justify-between items-center">
            <div className="text-sm text-[#615E83] min-w-[40px]">35-44</div>
            <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
              <div
                style={{
                  width: `${(demo?.ageof35_44man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-l-xl z-10 bg-[#4A3AFF] h-full "
              ></div>
              <div
                style={{
                  width: `${(demo?.ageof35_44woman / demo?.total) * 100}%`,
                  marginLeft: `${(demo?.ageof35_44man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#C893FD] h-full"
              ></div>
            </div>
            <div className="text-sm text-[#615E83]">
              {calculation(demo?.ageof35_44man, demo?.ageof35_44woman)}%
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <div className="text-sm text-[#615E83] min-w-[40px]">45-64</div>
            <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
              <div
                style={{
                  width: `${(demo?.ageof45_64man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-l-xl z-10 bg-[#4A3AFF] h-full "
              ></div>
              <div
                style={{
                  width: `${(demo?.ageof45_64woman / demo?.total) * 100}%`,
                  marginLeft: `${(demo?.ageof45_64man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-r-xl bg-[#C893FD] h-full"
              ></div>
            </div>
            <div className="text-sm text-[#615E83]">
              {calculation(demo?.ageof45_64man, demo?.ageof45_64woman)}%
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <div className="text-sm text-[#615E83] min-w-[40px]">65+</div>
            <div className="w-[80%] h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-3xl">
              <div
                style={{ width: `${(demo?.age65man / demo?.total) * 100}%` }}
                className="absolute top-0 left-0 rounded-l-xl z-10 bg-[#4A3AFF] h-full "
              ></div>
              <div
                style={{
                  width: `${(demo?.age65woman / demo?.total) * 100}%`,
                  marginLeft: `${(demo?.ageof65man / demo?.total) * 100}%`,
                }}
                className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#C893FD] h-full"
              ></div>
            </div>
            <div className="text-sm text-[#615E83]">
              {calculation(demo?.age65man, demo?.age65woman)}%
            </div>
          </div> */}
              </div>
            </div > : <MemorizedDontHave />}
          </div>
        }
      </div>

    </>
  );
};
const MemorizedDemographics = React.memo(Demographics)
export default Demographics;
