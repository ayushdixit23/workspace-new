import NoPost from "@/app/componentsWorkSpace/NoPost";
import { formatISOStringToDMY, formatNumber } from "@/app/utilsHelper/Useful";
import Link from "next/link";
import React from "react";
import { encryptaes } from "../utilsHelper/security";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BiUpArrowAlt } from "react-icons/bi";


const Postdata = ({ analyticsdata, state }) => {
  return (
    <>
      {/* mobile */}
      <Link href={`/main/post/${encryptaes(state.id)}`} className="bg-white dark:text-white dark:bg-[#273142] my-3 rounded-xl overflow-hidden sm:hidden">
        <div className="pt-3 px-0 font-bold dark:text-white text-[#030229]">Recent Posts</div>
        {!analyticsdata?.postmerged ||
          analyticsdata?.postmerged.length === 0 ||
          analyticsdata?.postmerged.filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
          <NoPost id={encryptaes(state.id)} setOpen={false} />
        ) : (
          <div className="overflow-y-scroll dark:text-white dark:bg-[#273142] rounded-xl bg-white no-scrollbar max-h-[300px] ">
            {analyticsdata?.postmerged?.filter((f) => f?.kind !== "poll")
              ?.filter((w) => w?.community?.title === state.name)
              ?.map((d, i, arr) => (
                <div
                  key={i}
                  className={`${i === arr.length - 1 ? "border-b-0" : null} border-b border-[#eaecf0] px-2 flex flex-col justify-center items-center gap-4 w-full`}
                >
                  <div className="flex justify-between mt-3 px-3 w-full items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div>

                        {d?.video ? <video
                          src={d?.dps}
                          className=" object-contain bg-black h-[50px] w-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                          alt="video"
                        /> : <img
                          src={d?.dps}
                          className="h-12 w-12 object-contain bg-black cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                          alt="image"
                        />}

                      </div>
                      <div className="text-sm font-bold dark:text-white text-[#101828]">{d?.title.length <= 15 ? d?.title : `${d?.title.slice(0, 15)}...`}</div>
                    </div>
                    <div className="text-[#667085] text-sm">
                      {formatISOStringToDMY(d?.createdAt)}
                    </div>
                  </div>
                  <div className="flex justify-evenly dark:text-white text-[#101828] mb-3 w-full items-center">
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{formatNumber(d?.likes)}</div>
                      <div className="pn:max-pp:text-xs">Applauses</div>
                    </div>
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{formatNumber(d?.comments?.length)}</div>
                      <div className="pn:max-pp:text-xs">Comments</div>
                    </div>
                    <div className="flex text-sm flex-col justify-center items-center">
                      <div>{formatNumber(d?.sharescount)}</div>
                      <div className="pn:max-pp:text-xs">Shares</div>
                    </div>
                    <div>
                      <div className="bg-[#ecfdf3] p-1 px-2 flex justify-center items-center rounded-xl">
                        <div><BiUpArrowAlt className="text-[#12b76a]" /></div>

                        <div className="text-[#12b76a]">{`${Math.round(parseInt(d?.engrate))}%`}</div>
                      </div>

                      <div className="hidden">-5</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Link>

      {/* <NoPost /> */}
      {/* {analyticsdata?.postmerged?.length == 0 ? (
        <NoPost />
      ) : (
        <>
          {analyticsdata?.postmerged.filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
            <NoPost />
          ) : (
            <div className="max-h-[300px] overflow-y-scroll no-scrollbar bg-white rounded-xl sm:p-2  w-full">
              <table className="w-full pn:max-sm:hidden sm:max-lg:min-w-[750px] rounded-xl border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      colSpan="2"
                      className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider"
                    >
                      Posts
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Date Uploaded
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider ">
                      Applauses
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Comments
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Shares
                    </th>
                    <th className=" text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
                      Engagement Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="gap-10">
                  {analyticsdata?.postmerged
                    .filter((d) => d?.community?.title === state.name)
                    .map((d, i) => (
                      <tr key={i}>
                        <td
                          colSpan="2"
                          className="text-left text-sm py-2 leading-5 font-medium text-gray-900 col-span-3"
                        >
                          <div className="flex gap-2 items-center">
                            <div>
                              <img
                                src={d?.dps}
                                className="min-w-[30px] min-h-[30px] max-w-[35px] rounded-lg max-h-[35px]"
                                alt="image"
                              />
                            </div>
                            <div className="flex flex-col text-xs font-medium gap-1">
                              {d?.title}
                            </div>
                          </div>
                        </td>
                        <td className="text-xs leading-5 py-2 px-3 text-center">
                          {formatISOStringToDMY(d?.createdAt)}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.likes}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.comments?.length}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          {d?.sharescount}
                        </td>
                        <td className="text-sm leading-5 py-2 px-3 text-center">
                          +5
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )} */}

      {/* web */}
      <Link href={`/main/post/${encryptaes(state.id)}`} className=" pn:max-sm:hidden">
        {!analyticsdata?.postmerged ||
          analyticsdata?.postmerged.length === 0 ||
          analyticsdata?.postmerged?.filter((f) => f?.kind !== "poll").filter(
            (d) => d?.community?.title === state.name
          ).length === 0 ? (
          <NoPost id={encryptaes(state.id)} setOpen={false} />
        ) : (
          // <div className="max-h-[300px] overflow-y-scroll no-scrollbar bg-white rounded-xl sm:p-2  w-full">
          //   <table className="w-full sm:max-lg:min-w-[750px] rounded-xl border-collapse">
          //     <thead>
          //       <tr className="bg-gray-50">
          //         <th
          //           colSpan="2"
          //           className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider"
          //         >
          //           Posts
          //         </th>
          //         <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
          //           Date Uploaded
          //         </th>
          //         <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
          //           Applauses
          //         </th>
          //         <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
          //           Comments
          //         </th>
          //         <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
          //           Shares
          //         </th>
          //         <th className="text-left text-xs leading-4 py-2 px-3 font-medium uppercase tracking-wider">
          //           Engagement Rate
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody className="gap-10">
          //       {analyticsdata?.postmerged
          //         .filter((s) => s?.community?.title === state.name)
          //         .map((d, i) => (
          //           <tr key={i}>
          //             <td
          //               colSpan="2"
          //               className="text-left text-sm py-2 leading-5 font-medium text-gray-900 col-span-3"
          //             >
          //               <div className="flex gap-2 p-1 items-center">
          //                 <div>
          //                   <img
          //                     src={d?.dps}
          //                     className="h-12 w-12 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white "
          //                     alt="image"
          //                   />
          //                 </div>
          //                 <div className="flex flex-col text-xs font-medium gap-1">
          //                   {d?.title.length <= 15 ? d?.title : `${d?.title.slice(0, 15)}...`}
          //                 </div>
          //               </div>
          //             </td>
          //             <td className="text-xs leading-5 py-2 px-3 text-center">
          //               {formatISOStringToDMY(d?.createdAt)}
          //             </td>
          //             <td className="text-sm leading-5 py-2 px-3 text-center">
          //               {d?.likes}
          //             </td>
          //             <td className="text-sm leading-5 py-2 px-3 text-center">
          //               {d?.comments?.length}
          //             </td>
          //             <td className="text-sm leading-5 py-2 px-3 text-center">
          //               {d?.sharescount}
          //             </td>
          //             <td className="text-sm leading-5 py-2 px-3 text-center">
          //               {`${Math.round(parseInt(d?.engrate))}%`}
          //             </td>
          //           </tr>
          //         ))}
          //     </tbody>
          //   </table>
          // </div>
          <div className="max-h-[300px] overflow-y-scroll no-scrollbar dark:text-white dark:bg-[#273142] bg-white rounded-xl sm:p-2  w-full">
            <Table className="text-sm hover:bg-none">
              <TableHeader className="dark:text-white hover:bg-none dark:text-sm">
                <TableRow>
                  <TableHead className="w-[180px]">Posts</TableHead>
                  {/* <TableHead className="text-center">Title</TableHead> */}
                  <TableHead className="text-center">Applauses</TableHead>
                  <TableHead className="text-center">Comments</TableHead>
                  <TableHead className="text-center">Shares</TableHead>
                  <TableHead className="text-center">Engagement Rate</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsdata?.postmerged
                  .filter((s) => s?.community?.title === state.name)
                  .map((d, i) => (

                    <TableRow key={i}>
                      <TableCell className="font-medium w-[180px] text-left">
                        <div className="flex gap-2 p-1 items-center">
                          <div>

                            {d?.video ? <video
                              src={d?.dps}
                              className=" object-contain bg-black h-[50px] w-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                              alt="video"
                            /> : <img
                              src={d?.dps}
                              className="h-12 w-12 object-contain bg-black cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                              alt="image"
                            />}
                          </div>
                          <div className="flex flex-col text-xs font-medium gap-1">
                            {d?.title.length <= 15 ? d?.title : `${d?.title.slice(0, 15)}...`}
                          </div>

                        </div>
                      </TableCell>
                      {/* <TableCell className="text-center">
                        <div className="flex flex-col text-xs font-medium gap-1">
                          {d?.title.length <= 15 ? d?.title : `${d?.title.slice(0, 15)}...`}
                        </div>
                      </TableCell> */}
                      <TableCell className="text-center">{formatNumber(d?.likes)}</TableCell>
                      <TableCell className="text-center">{formatNumber(d?.comments?.length)}</TableCell>
                      <TableCell className="text-center">{formatNumber(d?.sharescount)}</TableCell>
                      <TableCell className="flex justify-center mt-5 items-center">
                        <div className="flex justify-center items-center">
                          <div><BiUpArrowAlt className="text-[#12b76a]" /></div>

                          <div className="text-[#12b76a]">{`${Math.round(parseInt(d?.engrate))}%`}</div>
                        </div>


                      </TableCell>
                      {/* <TableCell className="text-center">{`${Math.round(parseInt(d?.engrate))}%`}</TableCell> */}
                      <TableCell className="text-center w-[120px]">{formatISOStringToDMY(d?.createdAt)}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        )}
      </Link >
    </>
  );
};

const MemorizedPostdata = React.memo(Postdata)
export default MemorizedPostdata;
