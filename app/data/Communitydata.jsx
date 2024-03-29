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
      <div className="rounded-2xl dark:border-2 dark:border-[#313d4f] dark:text-white dark:bg-[#273142] bg-white">
        <div className="flex h-14 justify-between rounded-2xl p-2">
          <div className="w-[155px] ring-[1px] ring-[#d1d1d1] rounded-xl">
            {/* <Select
              style={{
                borderRadius: "20px"
              }}

              className="dark:text-white rounded-2xl dark:bg-[#323b4e] border-none "
              onValueChange={(selectedValue) => {
                const selectedData = analyticsdata?.commerged?.find(
                  (item) => item.id === selectedValue
                );
                if (selectedData) {
                  setState({
                    dp: selectedData.image,
                    name: selectedData.name,
                    popularity: selectedData.popularity,
                    stats: selectedData.stats,
                    totalmembers: selectedData.totalmembers,
                    visitors: selectedData.visitors,
                    paidmember: selectedData.paidmember,
                    id: selectedData.id,
                    age: selectedData.agerange,
                    location: selectedData.location
                  });
                }
              }}
            >
              <SelectTrigger className="w-[155px] dark:text-white dark:bg-[#323b4e] dark:border-none ">
                <SelectValue

                  defaultValue={
                    <div className="flex justify-center gap-2 items-center w-full">
                      <div>
                        <img
                          src={state.dp}
                          className="max-w-[30px] rounded-xl min-h-[30px] min-w-[30px] max-h-[30px]"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs">{state?.name?.length > 8 ? `${state?.name?.slice(0, 8)}...` : state?.name}</div>
                      </div>
                    </div>
                  }
                  // placeholder={state.name}
                  placeholder={
                    <div className="flex justify-center gap-2 items-center w-full">
                      <div>
                        <img
                          src={state.dp}
                          className="max-w-[30px] rounded-xl min-h-[30px] min-w-[30px] max-h-[30px]"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs">{state?.name?.length > 8 ? `${state?.name?.slice(0, 8)}...` : state?.name}</div>
                      </div>
                    </div>
                  }
                  className="dark:text-white dark:bg-[#323b4e] dark:border-none "
                />
              </SelectTrigger>
              <SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
                <SelectGroup aria-disabled className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
                  {analyticsdata?.commerged?.map((d, i) => (
                    <SelectItem

                      value={
                        `${d?.id}`
                      }
                      key={i}
                      className=" "
                    >

                      <div className="flex justify-center gap-2 items-center w-full">
                        <div>
                          <img
                            src={d?.image}
                            className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                            alt="image"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-xs">{d?.name?.length > 8 ? `${d?.name?.slice(0, 8)}...` : d?.name}</div>
                        </div>
                      </div>

                    </SelectItem>
                  ))}

                </SelectGroup>
              </SelectContent>
            </Select> */}

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

          {/* {communityData && communityData.length > 0 && communityData <= 6 && <div className="min-h-full w-full flex text-2xl font-semibold justify-center items-center">Data will be processed and will be displayed after 7 days.</div>} */}

          {communityData && communityData.length > 0 && communityData.length <= 6 && (
            <div className="h-[250px] text-center w-[80%] flex sm:text-2xl font-semibold justify-center items-center">
              Data will be processed and will be displayed after 7 days.
            </div>
          )}

          {(communityData.length > 6) &&
            <Charts data={communityData} />
          }

          {/* {communityData && communityData.length > 0 && communityData < 6 && <div className="h-full w-full flex text-2xl font-semibold justify-center items-center">Data will be processed and will be displayed after 7 days.</div>}

          {communityData && communityData.length > 6 &&
            < Charts data={communityData} />
          } */}
        </div>
      </div >

      <div className="flex flex-col my-3 gap-2 pn:max-sm:hidden dark:text-white dark:border-2 dark:border-[#313d4f]  dark:bg-[#273142] bg-white p-2 px-4 rounded-2xl">
        <div className="font-semibold">Topics</div>
        <div className="flex w-full items-center gap-4">
          {analyticsdata?.commerged
            ?.filter((c) => c?.name == state.name)
            .map((w) =>
              w?.topic.map((d, i) => (
                <div key={i} className="bg-[#fafafa] dark:text-white dark:border-2 dark:border-[#313d4f] dark:bg-[#323b4e] p-1 px-4 rounded-2xl">
                  {d?.title}
                </div>
              ))
            )}
          {/* <div className="bg-[#fafafa] p-1 px-4 rounded-2xl">Post</div> */}
        </div>
      </div>
      <Postdata analyticsdata={analyticsdata} state={state} />
    </div >
  );
};

const MemorizedCommunitydata = React.memo(Communitydata)

export default MemorizedCommunitydata;
