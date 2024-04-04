import React from "react";
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
import { formatDate } from "../utilsHelper/Useful";
import BuiltSelected from "../componentsWorkSpace/BuiltSelected";

const Communitydata = ({ state, analyticsdata, setState }) => {
  const communityData = state.stats && state?.stats?.map((d) => ({
    members: d.Y1 ? Number(d.Y1) : 0,
    X: d.X ? formatDate(d.X) : d.X,
    visitors: d.Y2 ? Number(d.Y2) : 0,
    leave: d.Y3 ? Number(d.Y3) : 0
  }))

  return (
    <div className="h-full">
      <div className="rounded-2xl dark:text-white dark:bg-[#273142] bg-white">
        <div className="flex h-14 justify-between rounded-2xl p-2">
          <div className="w-[155px] ">
          
            <div className="w-[155px] "><BuiltSelected data={analyticsdata?.commerged} state={state} setState={setState} type={"dashboard"} /></div>
          </div>

          {/* <div className="flex pn:max-sm:hidden justify-center items-center gap-1">
            <div className="text-xl">
              <BiUpArrowAlt />
            </div>
            <div className="text-sm">2.1% vs last week</div>
          </div> */}
        </div>



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

        <div className="w-full p-2 h-full flex justify-center items-center z-0">

          {communityData.length === 0 && <div className="h-[250px] w-full flex text-2xl font-semibold justify-center items-center">No Data To Show</div>}

    
          {(communityData.length >= 1) &&
            <Charts data={communityData} />
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
