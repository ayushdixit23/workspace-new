"use client"
import React, { Suspense } from 'react'
import Loader from "@/app/data/Loader";
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
const Component = dynamic(() => import('./comonent'), { ssr: false })

const page = () => {
	return (
		<>
			<Toaster />
			<Suspense fallback={<Loader />}>
				<Component />
			</Suspense>
		</>
	)
}

export default page

return (
    <div>
      {/* <Toaster /> */}
      <div className="grid grid-cols-1 w-full pn:max-sm:pb-20 h-auto">
        {analyticsdata?.commerged?.length <= 0 && (
          <div className="w-full flex flex-col">
            <div className="flex pn:max-sm:mt-2 sm:sticky px-1 sm:top-0 text-sm mb-2 items-center gap-3">
              <div
                onClick={() => setChange("community")}
                className={`cursor-pointer ${
                  change === "community"
                    ? "bg-white dark:bg-[#323d4e] font-semibold"
                    : "dark:border-[#323d4e] border "
                } p-[6px] rounded-xl px-4`}
              >
                Community
              </div>
              <div
                onClick={() => setChange("store")}
                className={`cursor-pointer ${
                  change === "store"
                    ? "bg-white dark:bg-[#323d4e] font-semibold"
                    : "dark:border-[#323d4e] border"
                }  p-[6px] rounded-xl px-4`}
              >
                Store
              </div>
              {/* <div
                onClick={() => setChange("Prosite")}
                className={`cursor-pointer ${change === "Prosite"
                  ? "bg-white dark:bg-[#323d4e] font-semibold"
                  : "dark:border-[#323d4e] border"
                  }  p-[6px] rounded-xl px-4`}
              >
                Prosite
              </div> */}
            </div>
            {change == "community" && (
              <div className="flex flex-col justify-center items-center w-full h-[50vh] sm:h-[70vh]">
                <div className="sm:w-auto h-full flex flex-col w-[90%] justify-center gap-4">
                  <div className="text-[#70737D] font-semibold">
                    Create Your Community & Start Earning Today!
                  </div>
                  <div className="font-semibold flex flex-col justify-center gap-3">
                    <div>Way To earn with community </div>
                    <div className="flex flex-col justify-center gap-2">
                      <div>👉 Form a community</div>
                      <div>👍 Create Posts </div>
                      <div className="sm:flex justify-center items-center gap-2">
                        👉 Attaining your audience to unlock{" "}
                        <span>
                          <Link href={"/main/earnings"}>
                            <Image
                              src={Monetization}
                              alt="monteziation"
                              className="sm:w-[120px] w-[90px]"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={"/main/community/createCommunity"}
                    className="bg-[#2A85FF] text-sm text-center rounded-xl mt-2 text-white p-2 px-4"
                  >
                    Create community
                  </Link>
                </div>
              </div>
            )}
            {change == "store" && (
              <>
                {getorderdata?.storeexistornot ? (
                  <div
                    className="grid sm:grid-cols-12 w-full
         grid-cols-1 gap-3 px-3 h-full"
                  >
                    <div className="md:col-span-8 sm:col-span-7 flex flex-col h-full w-full  md:max-h-[83vh]">
                      <Storedata
                        sales={analyticsdata?.sales}
                        getorderdata={getorderdata}
                      />
                    </div>

                    <div className="md:col-span-4 sm:col-span-5 h-full sm:mb-0 mb-[64px] sm:max-h-[570px]  xl:max-h-full sticky top-2 w-full rounded-xl dark:bg-[#273142] bg-white overflow-hidden p-[6px]">
                      <div
                        className={`dark:bg-[#273142] w-full flex  flex-col h-full ${
                          change == "store" ? null : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-2  w-full items-center gap-2">
                          <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                            <div>
                              <Image src={p3} alt="p1" />
                            </div>
                            <div>
                              <div className="font-medium">Earnings</div>
                              <div className="flex gap-1 text-xs  items-center">
                                <div className="text-base font-medium">
                                  ₹{getorderdata?.earnings.toFixed(2)}
                                </div>
                                {/* <div className="text-green-700">+0.00%</div> */}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                            <div>
                              <Image src={p1} alt="p2" />
                            </div>
                            <div>
                              <div className="font-medium">Customers</div>
                              <div className="flex gap-1 text-xs  items-center">
                                <div className="text-base font-medium">
                                  {getorderdata?.customers}
                                </div>
                                {/* <div className="text-green-700">+0.00%</div> */}
                              </div>
                            </div>
                          </div>
                          <div className="flex col-span-2 light:bg-white flex-col p-3 rounded-xl gap-3 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                            <div>
                              <Image src={p2} alt="p2" />
                            </div>
                            <div className="flex justify-between items-center ">
                              <div>
                                <div className="font-medium">All Orders</div>
                                <div className="flex gap-1 text-xs  items-center">
                                  <div className="text-base font-medium">
                                    {getorderdata?.allorders}
                                  </div>
                                  {/* <div className="text-green-700">+0.00%</div> */}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">Pending</div>
                                <div className="flex gap-1 text-xs  items-center">
                                  <div className="text-base font-medium">
                                    {getorderdata?.pendingOrders?.length}
                                  </div>
                                  {/* <div className="text-green-700">+0.00%</div> */}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">Completed</div>
                                <div className="flex gap-1 text-xs  items-center">
                                  <div className="text-base font-medium">
                                    {getorderdata?.completedOrders?.length}
                                  </div>
                                  {/* <div className="text-green-700">+0.00%</div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm light:bg-white pn:max-sm:rounded-xl text-[12px] my-1 py-2 items-center gap-2">
                          <div
                            onClick={() => setProchange(1)}
                            className={`rounded-xl p-1 px-3 cursor-pointer ${
                              prochange == 1
                                ? " bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                                : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                            }`}
                          >
                            Top Products
                          </div>
                          <div
                            onClick={() => setProchange(2)}
                            className={`rounded-xl p-1 px-3 cursor-pointer ${
                              prochange == 2
                                ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                                : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                            }`}
                          >
                            Customer
                          </div>
                          <div
                            onClick={() => setProchange(3)}
                            className={`rounded-xl p-1 px-3 cursor-pointer ${
                              prochange == 3
                                ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                                : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                            }`}
                          >
                            Location
                          </div>
                        </div>
                        <div className="sm:max-h-[300px] overflow-y-scroll rounded-xl light:bg-white no-scrollbar">
                          {/* <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl"> */}
                          {prochange == 0 && <DontHave />}
                          {prochange == 1 && (
                            <Products data={analyticsdata?.promerged} />
                          )}
                          {prochange == 2 && (
                            <Customer data={analyticsdata?.pieChart} />
                          )}
                          {prochange == 3 && (
                            <LocationStore
                              data={analyticsdata?.storeLocation}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-[70vh] sm:h-[70vh]">
                    <div className="sm:w-auto h-full flex flex-col w-[90%] justify-center gap-4">
                      <div className="text-[#70737D] font-semibold">
                        Ready to setup your store! Here's Your 3-Step Guide
                      </div>
                      <div className="font-semibold flex max-w-[500px] text-sm flex-col justify-center gap-3">
                        <div>Way To earn with community </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-2 items-center">
                            <div>👉</div>
                            <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] min-w-[300px] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                              <div className="flex text-sm flex-col gap-3">
                                <div>
                                  Qualify & Build Your Community: Make sure you
                                  meet the eligibility criteria, then create a
                                  community and share a post to get things
                                  started.
                                </div>

                                <div className="flex text-sm flex-col gap-3">
                                  <div className="px-2 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                      <div className=" dark:text-white text-[#615E83]">
                                        Community
                                      </div>
                                      <div>0/1</div>
                                    </div>
                                    <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                      <div className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "></div>
                                    </div>
                                  </div>
                                  <div className="px-2 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                      <div className=" dark:text-white text-[#615E83]">
                                        Post
                                      </div>
                                      <div className="">0/1</div>
                                    </div>
                                    <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                      <div className="absolute top-0 left-0 rounded-r-xl  bg-[#40CAB0] h-full "></div>
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="flex justify-center items-center mt-4">
            <button className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg">Create Store</button>
          </div> */}
                              </div>
                            </div>
                          </div>

                          <div>
                            👉 Register Your Store & Get Verified: Enter your
                            store details to register. Once verified, you'll be
                            ready to sell!{" "}
                          </div>
                          <div className="sm:flex items-center gap-2">
                            👉 Create Collections & Add Products: Organize your
                            products into collections and start adding them to
                            your store.
                            <span>
                              {/* <Link href={"/main/earnings"}>
                            <Image
                              src={Monetization}
                              alt="monteziation"
                              className="sm:w-[120px] w-[90px]"
                            />
                          </Link> */}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={"/main/community/createCommunity"}
                        className="bg-[#2A85FF] text-sm rounded-xl flex justify-center items-center text-white p-2 px-4"
                      >
                        Create Store
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {analyticsdata?.commerged?.length > 0   && (
        
        getorderdata.storeexistornot
        ?
          <div className="grid sm:grid-cols-12 grid-cols-1 gap-3 px-3 h-full">
            <div className="md:col-span-8 sm:col-span-7 flex flex-col h-full w-full  md:max-h-[83vh]">
              <div className="flex pn:max-sm:mt-2 sm:sticky px-1 sm:top-0 text-sm mb-2 items-center gap-3">
                <div
                  onClick={() => setChange("community")}
                  className={`cursor-pointer ${
                    change === "community"
                      ? "bg-white dark:bg-[#323d4e] font-semibold"
                      : "dark:border-[#323d4e] border "
                  } p-[6px] rounded-xl px-4`}
                >
                  Community
                </div>
                <div
                  onClick={() => setChange("store")}
                  className={`cursor-pointer ${
                    change === "store"
                      ? "bg-white dark:bg-[#323d4e] font-semibold"
                      : "dark:border-[#323d4e] border"
                  }  p-[6px] rounded-xl px-4`}
                >
                  Store
                </div>
                {/* <div
                onClick={() => setChange("Prosite")}
                className={`cursor-pointer ${change === "Prosite"
                  ? "bg-white dark:bg-[#323d4e] font-semibold"
                  : "dark:border-[#323d4e] border"
                  }  p-[6px] rounded-xl px-4`}
              >
                Prosite
              </div> */}
              </div>
              <div className="sm:overflow-y-auto no-scrollbar">
                <>
                  {change == "community" && (
                    <Communitydata
                      state={state}
                      analyticsdata={analyticsdata}
                      setState={setState}
                    />
                  )}
                </>

                {change == "store" && (
                  <>
                    {getorderdata.storeexistornot && (
                      <Storedata
                        sales={analyticsdata?.sales}
                        getorderdata={getorderdata}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-5 h-full sm:mb-0 mb-[64px] sm:max-h-[570px]  xl:max-h-full sticky top-2 w-full rounded-xl dark:bg-[#273142] bg-white overflow-hidden p-[6px]">
              <div
                className={`h-full flex flex-col ${
                  change == "community" ? null : "hidden"
                }`}
              >
                <MemorizedPopularity state={state} />
                <div className="flex text-sm justify-between light:bg-white py-2 rounded-xl my-1 flex-wrap flex-grow  items-center gap-2">
                  <div
                    onClick={() => setComchange(1)}
                    className={`rounded-xl p-1  px-3 sm:px-5 cursor-pointer ${
                      comchange == 1
                        ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                        : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                    }`}
                  >
                    Members
                  </div>
                  <div
                    onClick={() => setComchange(2)}
                    className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                      comchange == 2
                        ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                        : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                    }`}
                  >
                    Demographics
                  </div>
                  <div
                    onClick={() => setComchange(3)}
                    className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                      comchange == 3
                        ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                        : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e]"
                    }`}
                  >
                    Location
                  </div>
                </div>
                <div className=" h-full bg-white dark:bg-[#273142]  pn:max-sm:mt-4 rounded-xl dark:text-white light:bg-white sm:overflow-y-scroll z-20 sm:no-scrollbar">
                  <div className="rounded-xl dark:text-white w-full light:bg-white">
                    {/* <div className={`${comchange == 0 ? null : "hidden"}`}>
							<DontHave />
						</div> */}
                    <div className={`${comchange == 1 ? null : "hidden"}`}>
                      <Member
                        state={state}
                        memberships={memberships}
                        data={analyticsdata?.commerged?.length}
                      />
                    </div>
                  </div>
                  <div className={` ${comchange == 2 ? " h-full" : "hidden"}`}>
                    <Demographics
                      demo={analyticsdata?.demo}
                      memberships={memberships}
                      member={state.totalmembers}
                      ages={state.age}
                      data={analyticsdata?.commerged.length}
                    />
                  </div>
                  <div
                    className={` ${
                      comchange == 3
                        ? `${
                            memberships === "Free" ? "h-full" : "max-h-[200px]"
                          }`
                        : "hidden"
                    }`}
                  >
                    <LocationCom
                      data={analyticsdata?.commerged?.length}
                      memberships={memberships}
                      state={state}
                    />
                  </div>
                </div>
              </div>
              {getorderdata.storeexistornot && (
                <div
                  className={`dark:bg-[#273142] flex flex-col h-full ${
                    change == "store" ? null : "hidden"
                  }`}
                >
                  <div className="grid grid-cols-2  w-full items-center gap-2">
                    <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                      <div>
                        <Image src={p3} alt="p1" />
                      </div>
                      <div>
                        <div className="font-medium">Earnings</div>
                        <div className="flex gap-1 text-xs  items-center">
                          <div className="text-base font-medium">
                            ₹{getorderdata?.earnings.toFixed(2)}
                          </div>
                          {/* <div className="text-green-700">+0.00%</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                      <div>
                        <Image src={p1} alt="p2" />
                      </div>
                      <div>
                        <div className="font-medium">Customers</div>
                        <div className="flex gap-1 text-xs  items-center">
                          <div className="text-base font-medium">
                            {getorderdata?.customers}
                          </div>
                          {/* <div className="text-green-700">+0.00%</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex col-span-2 light:bg-white flex-col p-3 rounded-xl gap-3 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                      <div>
                        <Image src={p2} alt="p2" />
                      </div>
                      <div className="flex justify-between items-center ">
                        <div>
                          <div className="font-medium">All Orders</div>
                          <div className="flex gap-1 text-xs  items-center">
                            <div className="text-base font-medium">
                              {getorderdata?.allorders}
                            </div>
                            {/* <div className="text-green-700">+0.00%</div> */}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Pending</div>
                          <div className="flex gap-1 text-xs  items-center">
                            <div className="text-base font-medium">
                              {getorderdata?.pendingOrders?.length}
                            </div>
                            {/* <div className="text-green-700">+0.00%</div> */}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Completed</div>
                          <div className="flex gap-1 text-xs  items-center">
                            <div className="text-base font-medium">
                              {getorderdata?.completedOrders?.length}
                            </div>
                            {/* <div className="text-green-700">+0.00%</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm light:bg-white pn:max-sm:rounded-xl text-[12px] my-1 py-2 items-center gap-2">
                    <div
                      onClick={() => setProchange(1)}
                      className={`rounded-xl p-1 px-3 cursor-pointer ${
                        prochange == 1
                          ? " bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                          : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                      }`}
                    >
                      Top Products
                    </div>
                    <div
                      onClick={() => setProchange(2)}
                      className={`rounded-xl p-1 px-3 cursor-pointer ${
                        prochange == 2
                          ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                          : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                      }`}
                    >
                      Customer
                    </div>
                    <div
                      onClick={() => setProchange(3)}
                      className={`rounded-xl p-1 px-3 cursor-pointer ${
                        prochange == 3
                          ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                          : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                      }`}
                    >
                      Location
                    </div>
                  </div>
                  <div className="sm:max-h-[300px] overflow-y-scroll rounded-xl light:bg-white no-scrollbar">
                    {/* <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl"> */}
                    {prochange == 0 && <DontHave />}
                    {prochange == 1 && (
                      <Products data={analyticsdata?.promerged} />
                    )}
                    {prochange == 2 && (
                      <Customer data={analyticsdata?.pieChart} />
                    )}
                    {prochange == 3 && (
                      <LocationStore data={analyticsdata?.storeLocation} />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              className={`h-full flex flex-col ${
                change == "Prosite" ? null : "hidden"
              }`}
            >
              <div className="flex flex-col bg-slate-50 rounded-2xl w-full h-full p-2   ">
                Member
              </div>
            </div>
          </div>
        :
        <div className="grid sm:grid-cols-12 grid-cols-1 gap-3 px-3 h-full">
        <div className="md:col-span-8 sm:col-span-7 flex flex-col h-full w-full  md:max-h-[83vh]">
          <div className="flex pn:max-sm:mt-2 sm:sticky px-1 sm:top-0 text-sm mb-2 items-center gap-3">
            <div
              onClick={() => setChange("community")}
              className={`cursor-pointer ${
                change === "community"
                  ? "bg-white dark:bg-[#323d4e] font-semibold"
                  : "dark:border-[#323d4e] border "
              } p-[6px] rounded-xl px-4`}
            >
              Community
            </div>
            <div
              onClick={() => setChange("store")}
              className={`cursor-pointer ${
                change === "store"
                  ? "bg-white dark:bg-[#323d4e] font-semibold"
                  : "dark:border-[#323d4e] border"
              }  p-[6px] rounded-xl px-4`}
            >
              Store
            </div>
            {/* <div
            onClick={() => setChange("Prosite")}
            className={`cursor-pointer ${change === "Prosite"
              ? "bg-white dark:bg-[#323d4e] font-semibold"
              : "dark:border-[#323d4e] border"
              }  p-[6px] rounded-xl px-4`}
          >
            Prosite
          </div> */}
          </div>
          <div className="sm:overflow-y-auto no-scrollbar">
            <>
              {change == "community" && (
                <Communitydata
                  state={state}
                  analyticsdata={analyticsdata}
                  setState={setState}
                />
              )}
            </>

            {change == "store" && (
              <>
                {getorderdata.storeexistornot && (
                  <Storedata
                    sales={analyticsdata?.sales}
                    getorderdata={getorderdata}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {getorderdata?.storeexistornot && (     <div className="md:col-span-4 sm:col-span-5 h-full sm:mb-0 mb-[64px] sm:max-h-[570px]  xl:max-h-full sticky top-2 w-full rounded-xl dark:bg-[#273142] bg-white overflow-hidden p-[6px]">
          <div
            className={`h-full flex flex-col ${
              change == "community" ? null : "hidden"
            }`}
          >
            <MemorizedPopularity state={state} />
            <div className="flex text-sm justify-between light:bg-white py-2 rounded-xl my-1 flex-wrap flex-grow  items-center gap-2">
              <div
                onClick={() => setComchange(1)}
                className={`rounded-xl p-1  px-3 sm:px-5 cursor-pointer ${
                  comchange == 1
                    ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                    : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                }`}
              >
                Members
              </div>
              <div
                onClick={() => setComchange(2)}
                className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                  comchange == 2
                    ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                    : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] "
                }`}
              >
                Demographics
              </div>
              <div
                onClick={() => setComchange(3)}
                className={`rounded-xl p-1 px-3 sm:px-5 cursor-pointer ${
                  comchange == 3
                    ? "bg-white dark:bg-[#3276ea] font-semibold shadow-def"
                    : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e]"
                }`}
              >
                Location
              </div>
            </div>
            <div className=" h-full bg-white dark:bg-[#273142]  pn:max-sm:mt-4 rounded-xl dark:text-white light:bg-white sm:overflow-y-scroll z-20 sm:no-scrollbar">
              <div className="rounded-xl dark:text-white w-full light:bg-white">
                {/* <div className={`${comchange == 0 ? null : "hidden"}`}>
          <DontHave />
        </div> */}
                <div className={`${comchange == 1 ? null : "hidden"}`}>
                  <Member
                    state={state}
                    memberships={memberships}
                    data={analyticsdata?.commerged?.length}
                  />
                </div>
              </div>
              <div className={` ${comchange == 2 ? " h-full" : "hidden"}`}>
                <Demographics
                  demo={analyticsdata?.demo}
                  memberships={memberships}
                  member={state.totalmembers}
                  ages={state.age}
                  data={analyticsdata?.commerged.length}
                />
              </div>
              <div
                className={` ${
                  comchange == 3
                    ? `${
                        memberships === "Free" ? "h-full" : "max-h-[200px]"
                      }`
                    : "hidden"
                }`}
              >
                <LocationCom
                  data={analyticsdata?.commerged?.length}
                  memberships={memberships}
                  state={state}
                />
              </div>
            </div>
          </div>
          
            <div
              className={`dark:bg-[#273142] flex flex-col h-full ${
                change == "store" ? null : "hidden"
              }`}
            >
              <div className="grid grid-cols-2  w-full items-center gap-2">
                <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                  <div>
                    <Image src={p3} alt="p1" />
                  </div>
                  <div>
                    <div className="font-medium">Earnings</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        ₹{getorderdata?.earnings.toFixed(2)}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col light:bg-white p-3 rounded-xl gap-2 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                  <div>
                    <Image src={p1} alt="p2" />
                  </div>
                  <div>
                    <div className="font-medium">Customers</div>
                    <div className="flex gap-1 text-xs  items-center">
                      <div className="text-base font-medium">
                        {getorderdata?.customers}
                      </div>
                      {/* <div className="text-green-700">+0.00%</div> */}
                    </div>
                  </div>
                </div>
                <div className="flex col-span-2 light:bg-white flex-col p-3 rounded-xl gap-3 border dark:border-[#3d4654] light:border-[#f1f1f1] w-full">
                  <div>
                    <Image src={p2} alt="p2" />
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      <div className="font-medium">All Orders</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.allorders}
                        </div>
                        {/* <div className="text-green-700">+0.00%</div> */}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Pending</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.pendingOrders?.length}
                        </div>
                        {/* <div className="text-green-700">+0.00%</div> */}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Completed</div>
                      <div className="flex gap-1 text-xs  items-center">
                        <div className="text-base font-medium">
                          {getorderdata?.completedOrders?.length}
                        </div>
                        {/* <div className="text-green-700">+0.00%</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm light:bg-white pn:max-sm:rounded-xl text-[12px] my-1 py-2 items-center gap-2">
                <div
                  onClick={() => setProchange(1)}
                  className={`rounded-xl p-1 px-3 cursor-pointer ${
                    prochange == 1
                      ? " bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                      : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                  }`}
                >
                  Top Products
                </div>
                <div
                  onClick={() => setProchange(2)}
                  className={`rounded-xl p-1 px-3 cursor-pointer ${
                    prochange == 2
                      ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                      : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                  }`}
                >
                  Customer
                </div>
                <div
                  onClick={() => setProchange(3)}
                  className={`rounded-xl p-1 px-3 cursor-pointer ${
                    prochange == 3
                      ? "bg-[#f9f9f9] p-3 dark:bg-[#3276ea]  font-semibold shadow-def"
                      : "dark:bg-[#323d4e] dark:border-2 dark:border-[#323d4e] p-3"
                  }`}
                >
                  Location
                </div>
              </div>
              <div className="sm:max-h-[300px] overflow-y-scroll rounded-xl light:bg-white no-scrollbar">
                {/* <div className="sm:max-h-[400px] min-w-full overflow-scroll no-scrollbar bg-white rounded-xl"> */}
                {prochange == 0 && <DontHave />}
                {prochange == 1 && (
                  <Products data={analyticsdata?.promerged} />
                )}
                {prochange == 2 && (
                  <Customer data={analyticsdata?.pieChart} />
                )}
                {prochange == 3 && (
                  <LocationStore data={analyticsdata?.storeLocation} />
                )}
              </div>
            </div>
          {/* // )} */}
        </div>)}
        <div
          className={`h-full flex flex-col ${
            change == "Prosite" ? null : "hidden"
          }`}
        >
          <div className="flex flex-col bg-slate-50 rounded-2xl w-full h-full p-2   ">
            Member
          </div>
        </div>
      </div>
  )
      }
       
      </div>
    </div>
  );