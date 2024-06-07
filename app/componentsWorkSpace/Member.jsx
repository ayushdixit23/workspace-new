import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import MemorizedDontHave from "./DontHave";
import Prem from "./Prem";

const Member = ({ state, data, memberships }) => {
  const { totalmembers, stats } = state;
  const [more, setMore] = useState(false);
  const [mores, setMores] = useState(false);

  return (
    <>
      {data > 0 ? (
        <div className="p-2 text-[#323743] h-auto relative text-sm  dark:text-white flex flex-col font-medium">
          {memberships === "Free" ? <Prem height="sm:h-[250px]" buttontext={"Unlock Members"} text={"See who's active, purchasing, unique, and more. Tailor your strategies!"} bgimage={"dark:bg-communitymemberdark bg-communitymemberlight"} />
            :
            <>
              <div className="flex justify-between border-b border-[#323d4e] items-center group  overflow-hidden py-1 px-2 w-full">
                <div className="font-medium">Joined Members</div>
                <div className="flex justify-center items-center gap-2">
                  <div>{totalmembers}</div>
                  {/* <div

                    className="text-[#688ffc] -mr-20 group-hover:mr-0 group-hover:duration-1000 hover:text-[#5572c0]"
                  >
                    more info
                  </div> */}
                </div>
              </div>
              <div
                className={`mt-3 gap-2 flex flex-col `}
              >
                <div className="flex justify-between items-center pl-3 px-1 w-full">
                  <div>Active Members</div>
                  {/* <div>0</div> */}
                  {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{stats[0]?.activemembers}</div>}

                </div>
                <div className="flex justify-between items-center pl-3 px-1 w-full">
                  <div>Unique Members</div>
                  {/* <div>0</div> */}
                  {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{stats[0]?.newmembers}</div>}
                </div>
                <div className="flex justify-between items-center pl-3 px-1 w-full">
                  <div>Paid Members</div>
                  {/* <div>{paidmember}</div> */}
                  {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{stats[0]?.paidmembers}</div>}
                </div>
              </div>

              <div className="border-dashed border border-[#fff]/10 mt-3"></div>

              <div className="flex justify-between items-center mt-2 border-b border-[#323d4e] overflow-hidden group  py-1 px-2 w-full">
                <div className="font-medium">Visitors</div>

                <div className="flex justify-center items-center gap-2">
                  {" "}
                  <div>{stats[0]?.returningvisitor + stats[0]?.newvisitor}</div>{" "}
                  {/* <div

                    className="text-[#688ffc] -mr-20 group-hover:mr-0 group-hover:duration-1000 hover:text-[#5572c0]"
                  >
                    more info
                  </div> */}
                </div>
              </div>
              <div
                className={`gap-2 mt-3 flex flex-col 
                  `}
              >
                <div className="flex justify-between items-center pl-3 px-1 w-full">
                  <div>Returning visitors</div>
                  {/* <div>0</div> */}
                  {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{stats[0]?.returningvisitor}</div>}
                </div>
                <div className="flex justify-between items-center pl-3 px-1 w-full">
                  <div>New visitors</div>
                  {/* <div>0</div> */}
                  {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{stats[0]?.newvisitor}</div>}
                </div>
              </div>
            </>
          }

        </div>
      ) : (
        <MemorizedDontHave />
      )}
    </>
  );
};

export default Member;
