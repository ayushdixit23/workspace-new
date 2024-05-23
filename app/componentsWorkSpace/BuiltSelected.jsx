import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const BuiltSelected = ({ data, state, setState, type }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        onClick={() => setToggle(false)}
        className={`fixed inset-0 w-screen ${toggle ? "z-50" : "-z-40"
          } h-screen`}
      ></div>
      {type === "dashboard" && (
        <div className="flex flex-col w-full bg-[#f7f7f7] dark:bg-[#323d4e] rounded-xl">
          <div
            onClick={() => setToggle(!toggle)}
            className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
          >
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={state?.dp}
                  className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                />
              </div>
              <div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
                {state?.name?.length > 8
                  ? `${state?.name?.slice(0, 8)}...`
                  : state?.name}
              </div>
            </div>

            <div className="text-lg ">
              {toggle ? (
                <IoIosArrowUp onClick={() => setToggle(!toggle)} />
              ) : (
                <IoIosArrowDown onClick={() => setToggle(!toggle)} />
              )}
            </div>

            <div
              className={` ${toggle
                ? "top-[45px]"
                : "top-0 border-none text-[0px] w-[0px] h-[0px]"
                } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#323d4e] rounded-xl z-50 w-full`}
            >
              <div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">
                {data?.map((d, i) => (
                  <div
                    onClick={() => {
                      setState({
                        dp: d?.image,
                        name: d?.name,
                        popularity: d?.popularity,
                        stats: d?.stats,
                        totalmembers: d?.totalmembers,
                        visitors: d?.visitors,
                        paidmember: d?.paidmember,
                        id: d?.id,
                        age: d?.agerange,
                        location: d?.location,
                        returningvisitor: d?.returningvisitor,
                        newvisitor: d?.newvisitor,
                        uniquemembers: d?.uniquemembers,
                        activemembers: d?.activemembers,
                        impressions: d?.impressions,
                        cpc: d?.cpc,
                        cpm: d?.cpm,
                      });
                      setToggle(false);
                    }}
                    key={i}
                    className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
                  >
                    <div className="">
                      <img
                        src={d?.image}
                        className={`${toggle
                          ? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                          : "w-0 h-0"
                          } duration-100`}
                        alt="image"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className={`text-xs ${toggle ? "" : " hidden"}`}>
                        {d?.name?.length > 8
                          ? `${d?.name?.slice(0, 8)}...`
                          : d?.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "earnings" && (
        <div className="flex flex-col w-full">
          <div
            onClick={() => setToggle(!toggle)}
            className="flex justify-between cursor-pointer items-center relative p-1.5 h-full gap-2 px-2 w-full text-sm"
          >
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={state?.dp}
                  className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                />
              </div>
              <div className="text-[#0d0d0d]  dark:text-white pp:hidden text-xs font-semibold">
                {state.name}
              </div>
              <div className="text-[#0d0d0d]  dark:text-white pn:max-pp:hidden text-xs font-semibold">
                {state?.name?.length > 8
                  ? `${state?.name?.slice(0, 8)}...`
                  : state?.name}
              </div>
            </div>

            <div className="text-lg">
              {toggle ? (
                <IoIosArrowUp onClick={() => setToggle(!toggle)} />
              ) : (
                <IoIosArrowDown onClick={() => setToggle(!toggle)} />
              )}
            </div>

            <div
              className={` ${toggle
                ? "dark:border-[#3d4654] dark:border top-[45px]"
                : "top-0 border-none text-[0px] w-[0px] h-[0px]"
                } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#273142] rounded-lg z-50 w-full`}
            >
              <div className="flex flex-col gap-3 p-2 max-h-[300px] overflow-y-scroll no-scrollbar">
                {data?.map((d, i) => (
                  <div
                    onClick={() => {
                      setState({
                        id: d?.id,
                        topics: d?.topics,
                        dp: d?.dps,
                        name: d?.name,
                        engagementrate: d?.engagementrate,
                        members: d?.members,
                        category: d?.category,
                        desc: d?.desc,
                        topic: d?.topic || [],
                        ismonetized: d?.ismonetized,
                        type: d?.type || "",
                        status: d?.monstatus || "",
                        reason: d?.reason || "",
                        earnings: d?.topic.reduce(
                          (total, item) => total + (item.earnings || 0),
                          0
                        ),
                        reapplydate: d?.reapplydate || "",
                      });
                      setToggle(false);
                    }}
                    key={i}
                    className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
                  >
                    <div>
                      <img
                        src={d?.dps}
                        className={`${toggle
                          ? "max-w-[30px] rounded-xl min-h-[30px] min-w-[30px] max-h-[30px]"
                          : "w-0 h-0"
                          } duration-100`}
                        alt="image"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={`pp:hidden  text-xs ${toggle ? "" : "text-[0px] hidden"
                          }`}
                      >
                        {d?.name}
                      </div>
                      <div
                        className={`text-xs pn:max-pp:hidden  ${toggle ? "" : "text-[0px] hidden"
                          }`}
                      >
                        {d?.name?.length > 8
                          ? `${d?.name?.slice(0, 8)}...`
                          : d?.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuiltSelected;
