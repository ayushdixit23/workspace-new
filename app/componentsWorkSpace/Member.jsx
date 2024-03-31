import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import MemorizedDontHave from "./DontHave";

const Member = ({ state, data, memberships }) => {
  const { totalmembers, visitors, paidmember, returningvisitor, newvisitor, uniquemembers, activemembers, } = state;
  const [more, setMore] = useState(false);
  const [mores, setMores] = useState(false);
  return (
    <>
      {data > 0 ? (
        <div className="p-2 text-[#323743] pn:max-sm:h-[240px] relative text-sm dark:text-white flex flex-col font-medium">
          {/* {memberships === "Free" && <BlurredComponent />} */}
          <div className="flex justify-between items-center group dark:hover:bg-[#1F2937] hover:bg-[#f9f9f9] py-2 px-2 rounded-xl w-full">
            <div className="font-medium">Joined Members</div>
            <div className="flex justify-center items-center gap-2">
              <div>{totalmembers}</div>
              <div
                onClick={() => {
                  setMore(!more);
                }}
                className="text-[#688ffc] hidden group-hover:block group-hover:duration-1000 hover:text-[#5572c0]"
              >
                more info
              </div>
            </div>
          </div>
          <div
            className={`mt-1 ${more === true ? "gap-2 flex flex-col " : "hidden"}`}
          >
            <div className="flex justify-between items-center pl-3 px-1 w-full">
              <div>Active Members</div>
              {/* <div>0</div> */}
              {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{activemembers}</div>}

            </div>
            <div className="flex justify-between items-center pl-3 px-1 w-full">
              <div>Unique Members</div>
              {/* <div>0</div> */}
              {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{uniquemembers}</div>}
            </div>
            <div className="flex justify-between items-center pl-3 px-1 w-full">
              <div>Paid Members</div>
              {/* <div>{paidmember}</div> */}
              {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{paidmember}</div>}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 group dark:hover:bg-[#1F2937] hover:bg-[#f9f9f9] py-2 px-2 rounded-xl w-full">
            <div className="font-medium">Visitors</div>

            <div className="flex justify-center items-center gap-2">
              {" "}
              <div>{visitors}</div>{" "}
              <div
                onClick={() => {
                  setMores(!mores);
                }}
                className="text-[#688ffc] hidden group-hover:block group-hover:duration-1000 hover:text-[#5572c0]"
              >
                more info
              </div>{" "}
            </div>
          </div>
          <div
            className={`${mores === true ? "gap-2 mt-1 flex flex-col " : "hidden"
              }`}
          >
            <div className="flex justify-between items-center pl-3 px-1 w-full">
              <div>Returning visitors</div>
              {/* <div>0</div> */}
              {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{returningvisitor}</div>}
            </div>
            <div className="flex justify-between items-center pl-3 px-1 w-full">
              <div>New visitors</div>
              {/* <div>0</div> */}
              {memberships === "Free" ? < FaCrown className="bg-[#FFEB33] text-[#323d4e] rounded-full h-[25px] p-1.5 w-[25px] " /> : <div>{newvisitor}</div>}
            </div>
          </div>
        </div>
      ) : (
        <MemorizedDontHave />
      )}
    </>
  );
};

export default Member;
