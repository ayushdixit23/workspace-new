import React, { useState } from "react";
import Postdata from "./Postdata";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Charts from "./Charts"
import { formatDate, formatISOStringToDate, formatISOStringToMonth } from "../utilsHelper/Useful";
import BuiltSelected from "../componentsWorkSpace/BuiltSelected";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Communitydata = ({ state, analyticsdata, setState, setDateValue, dateValue }) => {
  const [toggle, setToggle] = useState(false)
  const communityData = state.stats && state?.stats?.map((d) => ({
    members: d.Y1 ? Number(d.Y1) : 0,
    X: d?.creation ? formatISOStringToDate(d?.creation) : d?.creation,
    visitors: d.Y2 ? Number(d.Y2) : 0,
    leave: d.Y3 ? Number(d.Y3) : 0,
  }))

  const months = state.stats && state?.stats?.map(data => {
    const month = formatISOStringToMonth(data.creation);
    return month
  });

  const uniqueMonths = [...new Set(months)];


  return (
    <div className="h-full">
      <div className="rounded-2xl dark:text-white dark:bg-[#273142] bg-white">
        <div className="flex h-14 justify-between rounded-2xl p-2">
          <div className="w-[155px] ">

            <div className="w-[155px] "><BuiltSelected data={analyticsdata?.commerged} state={state} setState={setState} type={"dashboard"} /></div>
          </div>

          <div className="flex justify-center items-center gap-1">
            < div onClick={() => setToggle(!toggle)} className='flex flex-col w-full bg-[#f7f7f7] dark:bg-[#323d4e] rounded-xl' >
              <div className='flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm'>
                <div className='flex items-center gap-2'>
                  {dateValue} Days
                </div>

                <div className='text-lg '>{toggle ? <IoIosArrowUp onClick={() => setToggle(!toggle)} /> : <IoIosArrowDown onClick={() => setToggle(!toggle)} />}
                </div>

                <div className={`${toggle ? "top-[45px]" : "top-0 border-none hidden text-[0px] w-[0px] h-[0px]"} absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#323d4e] rounded-xl z-50 w-full`}>
                  <div className='flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar'>
                    <div onClick={() => setDateValue(7)}>7 Days</div>
                    <div onClick={() => setDateValue(30)}>30 Days</div>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </div>




        <div className="w-full p-2 h-full flex justify-center items-center z-0">

          {communityData.length === 0 && <div className="h-[250px] w-full flex text-2xl font-semibold justify-center items-center">No Data To Show</div>}


          {(communityData.length >= 1) &&
            <Charts data={communityData} uniqueMonths={uniqueMonths} />
          }
        </div>

      </div >

      <div className="flex flex-col my-3 gap-2 pn:max-sm:hidden dark:text-white dark:bg-[#273142] bg-white p-2 px-4 rounded-2xl">
        <div className="font-semibold">Topics</div>
        <div className="flex w-full items-center gap-4">
          {analyticsdata?.commerged
            ?.filter((c) => c?.name == state.name)
            .map((w) =>
              w?.topic.map((d, i) => (
                <div key={i} className="bg-[#fafafa] dark:text-white dark:bg-[#323b4e] p-1 px-4 rounded-2xl">
                  {d?.title}
                </div>
              ))
            )}
        </div>
      </div>
      <Postdata analyticsdata={analyticsdata} state={state} />
    </div >
  );
};

const MemorizedCommunitydata = React.memo(Communitydata)

export default MemorizedCommunitydata;
