"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { MdOutlineNotifications } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import e1 from "../../assets/image/e1.png";
import e2 from "../../assets/image/e2.png";
import Cl from "../../assets/image/Cl.png";
import { BsBank } from "react-icons/bs";
import ads from "../../assets/image/ads.png";
import order from "../../assets/image/earningstore.png";
import rupee from "../../assets/image/rupee.png";
import { MdAdd, MdOutlineNotifications } from "react-icons/md";
import {
  useAddBankMutation,
  useChangeMontentMutation,
  useCreateWithDrawRequestMutation,
  //  useBankRequestMutation,
  useGetEarningStatsQuery,
} from "@/app/redux/apiroutes/payment";
import Loader from "@/app/data/Loader";
import { formatISOStringToDMY, getData } from "@/app/utilsHelper/Useful";
import toast, { Toaster } from "react-hot-toast";
import {
  useFetchCommunityQuery,
  useMonetizationMutation,
} from "@/app/redux/apiroutes/community";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { encryptaes } from "@/app/utilsHelper/security";
import { useRouter } from "next/navigation";
import Selected from "@/app/componentsWorkSpace/Selected";
import Link from "next/link";
import BuiltSelected from "@/app/componentsWorkSpace/BuiltSelected";
import { Switch } from "@/components/ui/switch";
import { RxCross1 } from "react-icons/rx";
import { FcInfo } from "react-icons/fc";
import Hover from "@/app/data/Hover";

const page = () => {
  const { id } = getData();
  const router = useRouter();
  const { data, isLoading, refetch } = useGetEarningStatsQuery(
    { id },
    { skip: !id }
  );
  const [addBank] = useAddBankMutation();
  // const [requestbank] = useBankRequestMutation()
  const [load, setLoad] = useState(true);
  const { data: comData } = useFetchCommunityQuery({ id }, { skip: !id });
  const [monetisation] = useMonetizationMutation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeMontentizationCommunity] = useChangeMontentMutation();
  const [withdrawalRequest] = useCreateWithDrawRequestMutation();
  const [bank, setBank] = useState({
    bankname: "",
    branchname: "",
    accountno: "",
    IFSCcode: "",
    personname: "",
    verified: "",
  });
  const [count, setCount] = useState({
    post: 0,
    com: 0,
  });
  const [state1, setState1] = useState({
    id: "",
    name: "",
    dp: "",
    members: "",
    topics: "",
    type: "",
    engagementrate: "",
    category: "",
    desc: "",
    topic: [],
    ismonetized: false,
    earnings: "",
  });
  const [state2, setState2] = useState({
    id: "",
    name: "",
    dp: "",
    members: "",
    topics: "",
    type: "",
    engagementrate: "",
    category: "",
    desc: "",
    topic: [],
    ismonetized: false,
    status: "",
    reason: "",
    impressions: "",
    cpc: "",
    cpm: "",
    reapplydate: "",
  });

  const sendRequestForMontenziation = async (id, comid) => {
    try {
      setLoading(true);
      const res = await monetisation({ id, comid });
      if (res.data.success) {
        toast.success("Request Sent For Community Montenziation!");
      }
      setState2({
        ...state2,
        status: "pending",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeMontentization = async () => {
    try {
      setState2({ ...state2, ismonetized: !state2.ismonetized });
      await changeMontentizationCommunity({
        comid: state2.id,
        ismonetized: !state2.ismonetized,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoad(true);
    if (comData?.communities.length > 0) {
      setLoad(true);
      setCount({
        com: comData?.communities.length,
        post: comData?.communities[0].post,
      });
      setState1({
        id: comData?.communities[0].id,
        name: comData?.communities[0].name,
        topics: comData?.communities[0].topics,
        dp: comData?.communities[0].dps,
        members: comData?.communities[0]?.members,
        engagementrate: comData?.communities[0].engagementrate,
        category: comData?.communities[0].category,
        desc: comData?.communities[0].desc,
        type: comData?.communities[0].type,
        topic: comData?.communities[0].topic,
        ismonetized: comData?.communities[0].ismonetized,
        earnings: comData?.communities[0].topic.reduce(
          (total, item) => total + (item.earnings || 0),
          0
        ),
      });
      setState2({
        id: comData?.communities[0].id,
        name: comData?.communities[0].name,
        topics: comData?.communities[0].topics,
        dp: comData?.communities[0].dps,
        members: comData?.communities[0]?.members,
        type: comData?.communities[0].type,
        engagementrate: comData?.communities[0].engagementrate,
        category: comData?.communities[0].category,
        desc: comData?.communities[0].desc,
        topic: comData?.communities[0].topic,
        ismonetized: comData?.communities[0].ismonetized,
        status: comData?.communities[0].monstatus,
        reason: comData?.communities[0].reason,
        reapplydate: comData?.communities[0].reapplydate,
        impressions: comData?.communities[0].impressions,
        cpc: comData?.communities[0].cpc,
        cpm: comData?.communities[0].cpm,
      });
      setLoad(false);
    }
    setLoad(false);
  }, [comData]);

  const createWithdrawRequest = async () => {
    try {
      const res = await withdrawalRequest({
        id,
        amount: data?.earningStats?.pendingpayments,
      });
      if (
        res.data?.success &&
        res.data?.message === "Withdraw request created successfully!"
      ) {
        toast.success("Withdrawal Request Created!");
      }
      if (res.error) {
        toast.error("Somthing Went Wrong!");
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  const handleBankDetails = async (e) => {
    e.preventDefault();
    if (
      !bank.IFSCcode ||
      !bank.accountno ||
      !bank.bankname ||
      !bank.branchname
    ) {
      toast.error("Please Enter All Details");
      return;
    }
    setLoading(true);
    try {
      const data = {
        bankname: bank.bankname,
        branchname: bank.branchname,
        accountno: bank.accountno,
        IFSCcode: bank.IFSCcode,
        personname: bank.personname,
      };
      const res = await addBank({
        id,
        data,
      });
      await refetch();
      setOpen(false);
      setLoading(false);
      toast.success("Bank Details Saved!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tosetCookie = {
    dps: state1.dp?.trim(),
    title: state1?.name,
    category: state1?.category,
    desc: state1?.desc,
    topics: "",
    type: state1.type,
    memberscount: state1?.members,
  };

  useEffect(() => {
    // const { bankname = "", branchname = "", accountno = "", IFSCcode = "" } = data?.earningStats.bank
    if (
      data?.earningStats.bank.bankname &&
      data?.earningStats.bank.personname &&
      data?.earningStats.bank.branchname &&
      data?.earningStats.bank.accountno &&
      data?.earningStats.bank.IFSCcode
    ) {
      setBank({
        bankname: data?.earningStats.bank.bankname,
        branchname: data?.earningStats.bank.branchname,
        accountno: data?.earningStats.bank.accountno,
        IFSCcode: data?.earningStats.bank.IFSCcode,
        verified: data?.earningStats?.isbankverified,
        personname: data?.earningStats?.bank?.personname,
      });
    } else {
      setBank({
        bankname: "",
        branchname: "",
        accountno: "",
        IFSCcode: "",
        personname: "",
      });
    }
  }, [data]);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (load) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      <div
        className={`${
          open
            ? "fixed inset-0 w-screen z-50 bg-[#cccccc33] h-screen flex justify-center items-center"
            : "hidden -z-50"
        }`}
      >
        <div className="flex justify-center shadow-md items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="w-full flex flex-col gap-2">
            <div className="text-xl mt-2 text-center font-semibold">
              Enter Bank Details
            </div>
            <div className="flex flex-col gap-3 p-2">
              <div className="flex flex-col w-full gap-1">
                <div>Account Holder</div>
                <div>
                  <input
                    value={bank.personname}
                    disabled={bank.verified === "pending"}
                    onChange={(e) =>
                      setBank({ ...bank, personname: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full"
                    placeholder="Bank Name"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Bank Name</div>
                <div>
                  <input
                    value={bank.bankname}
                    disabled={bank.verified === "pending"}
                    onChange={(e) =>
                      setBank({ ...bank, bankname: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full"
                    placeholder="Bank Name"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Branch Name</div>
                <div>
                  <input
                    value={bank.branchname}
                    disabled={bank.verified === "pending"}
                    onChange={(e) =>
                      setBank({ ...bank, branchname: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full"
                    placeholder="Branch Name"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Account Number</div>
                <div>
                  <input
                    value={bank.accountno}
                    disabled={bank.verified === "pending"}
                    onChange={(e) =>
                      setBank({ ...bank, accountno: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full"
                    placeholder="Account Number"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>IFSC Code</div>
                <div>
                  <input
                    value={bank.IFSCcode}
                    disabled={bank.verified === "pending"}
                    onChange={(e) =>
                      setBank({ ...bank, IFSCcode: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full"
                    placeholder="IFSC Code"
                  />
                </div>
              </div>
              {bank.verified === "pending" && (
                <div className="flex gap-1 text-sm my-2 items-center">
                  <div>
                    <CiCircleInfo />
                  </div>
                  <div>Bank Verification is in under process.</div>
                </div>
              )}
              <div className="flex justify-center  gap-3 items-center">
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="border-[#979797] border font-bold w-full p-2 rounded-lg"
                >
                  Discard
                </button>

                {/* <button
                  onClick={() => {
                    createWithdrawRequest();
                  }}
                  className=" bg-blue-600 font-bold w-full p-2 rounded-lg"
                >
                  Withdraw
                </button> */}

                {bank.verified !== "approved" && (
                  <button
                    disabled={bank.verified === "pending"}
                    onClick={handleBankDetails}
                    className="bg-[#FFD25E] font-bold w-full p-2 rounded-lg"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 p-2 w-full">
        <div className="flex justify-between sm:hidden py-2 my-3 px-5 bg-white dark:bg-[#273142] rounded-2xl items-center">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-[#0066FF] sm:leading-snug sm:max-w-[80%] px-3 font-semibold text-xl sm:text-[26px]">
              "Empower Your Community:{" "}
              <a className="text-black dark:text-white">
                Unlock Ads and Stores for Earning Potential!"
              </a>
            </div>
            <div className="flex items-center px-3 pb-3">
              {/* <div className="bg-black dark:bg-[#3d4654] dark:text-white rounded-full gap-2 font-medium text-white p-2 px-3 flex justify-center items-center">
                <div>Notify Me!</div>
                <div className="text-xl bg-white text-black rounded-full flex justify-center items-center w-5 h-5 sm:w-7 sm:h-7">
                
                </div>
              </div> */}
            </div>
          </div>
          <div className="sm:block hidden">
            <Image
              src={e1}
              alt="image"
              className="md:max-w-[500px] max-w-[300px] max-h-[180px]"
            />
          </div>
        </div>
        <div className="grid w-full  grid-cols-1">
          <div className="grid w-full gap-4  grid-cols-1">
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex bg-white dark:bg-[#273142] items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={rupee}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-sm">
                    <Hover
                      text={"Total Earnings"}
                      mobile={"-left-[70px]"}
                      pc={"sm:-left-[70px]"}
                      para={
                        "Overall Earnings: Get a comprehensive view of your total income from both store sales and community monetization (ad revenue & paid topics)."
                      }
                    />
                  </div>
                  <div className="font-semibold">
                    ₹{data?.earningStats?.earnings.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex bg-white dark:bg-[#273142] items-center p-3 sm:px-5 rounded-xl gap-3 w-full">
                <div>
                  <Image
                    src={e2}
                    className="min-w-[20px] min-h-[20px]"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm ">Pending Payments</div>
                  <div className="font-semibold">
                    ₹{data?.earningStats?.pendingpayments}
                  </div>
                </div>
              </div>
              <div className="flex pn:max-sm:col-span-2 flex-col w-full h-full">
                {bank.verified === "pending" ? (
                  <div className="flex h-full w-full pn:max-sm:col-span-2 bg-white dark:bg-[#273142] justify-between items-center p-4 sm:p-3 px-5 font-bold rounded-xl gap-3">
                    Bank Verification Under Process
                  </div>
                ) : (
                  <div
                    onClick={() => setOpen(true)}
                    className="flex h-full w-full pn:max-sm:col-span-2 bg-white dark:bg-[#273142] justify-between items-center p-4 sm:p-3 px-5 rounded-xl gap-3"
                  >
                    <div className="flex justify-center gap-4 items-center">
                      <div>
                        <BsBank className="text-xl" />
                      </div>
                      <div className="sm:text-sm font-semibold">
                        {bank.verified == "approved" ? (
                          "Bank Add Successfully !"
                        ) : (
                          <Hover
                            para={
                              "Add Bank Account: Securely link your bank account for easy withdrawal of your earnings.Once your bank account is linked, you can seamlessly transfer your hard-earned income."
                            }
                            text={"Add Bank"}
                            mobile={"-left-[150px]"}
                            pc={"sm:-left-[80px]"}
                          />
                        )}
                      </div>
                    </div>
                    {bank.verified !== "approved" &&
                      bank.verified !== "pending" && (
                        <div className="w-4 h-4 cursor-pointer rounded-full border flex justify-center items-center border-black">
                          <MdAdd />
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full sm:bg-white mb-[60px] dark:bg-[#273142] sm:mb-0 rounded-xl p-3">
              {/* <div className="flex sm:flex-row  flex-col justify-between items-center">
                <div className="text-[#666666] dark:text-white pn:max-sm:text-center font-medium">
                  You haven't met the criteria to apply for monetisation tool
                  access.
                </div>
              </div> */}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3 ">
                <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] sm:max-h-[310px] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={order}
                        alt="image"
                        className="min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px] object-cover rounded-xl"
                      />
                    </div>
                    <div className="text-lg font-semibold">
                      <Hover
                        text={"Sell Products"}
                        mobile={"-left-[170px]"}
                        pc={"sm:-left-[80px]"}
                        w2={"sm:w-[350px]"}
                        para={
                          "Showcase and sell your own products directly within your community. Whether it's handmade crafts, digital downloads, or exclusive merchandise, the possibilities are endless!"
                        }
                      />
                    </div>
                  </div>
                  {(count.com < 1 || count.post < 1 || !comData.store) && (
                    <div className="text-sm">
                      Interested in selling products? Start by creating a
                      community and posting something!
                    </div>
                  )}
                  {(count.com >= 1 || count.post >= 1) &&
                    comData.store &&
                    data?.length < 0 && (
                      <div className="text-sm">
                        "Congratulations! You can now add products in your
                        Store."
                      </div>
                    )}

                  <div className="flex text-sm flex-col h-full gap-3">
                    {comData?.store && (count.com >= 1 || count.post >= 1) ? (
                      data?.length > 0 ? (
                        <>
                          <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                            <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                              <div>Total Earnings</div>
                              <div>
                                ₹{data?.earningStats?.storeearning.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm">
                            <div className="flex justify-between items-center">
                              <div className="font-semibold text-[17px]">
                                Product Name
                              </div>
                              <div className="font-semibold text-[17px]">
                                sales{" "}
                                <span className="text-sm font-normal">
                                  (by quantity.)
                                </span>
                              </div>
                            </div>
                            <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                            {data?.earningStats?.final.map((d) => (
                              <div className="flex mt-2 justify-between items-center">
                                <div>
                                  {d?.name.length > 10
                                    ? `${d?.name.slice(0, 10)}...`
                                    : d?.name}
                                </div>
                                <div>{d?.itemsold}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col justify-center h-full items-center text-xl px-2 font-bold">
                          <div className="h-full -mt-2 flex justify-center items-center flex-col gap-3">
                            <div>No Products At The Moment!</div>
                            {/* <div className="text-base">
                                Try Creating Products and Start Selling!
                              </div> */}
                          </div>
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => {
                                router.push("/main/store");
                              }}
                              className="bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg"
                            >
                              Create Products!
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                      <>
                        {" "}
                        {!comData?.store && (
                          <div className="flex text-sm flex-col gap-3">
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">
                                  Community
                                </div>
                                <div>{count.com}/1</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{ width: `${(count.com / 1) * 100}%` }}
                                  className={`absolute top-0 left-0 rounded-r-xl  ${
                                    count.com >= 1
                                      ? "bg-[#40CAB0]"
                                      : "bg-[#398faf]"
                                  }  h-full `}
                                ></div>
                              </div>
                            </div>
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">
                                  Post
                                </div>
                                <div className="">{count.post}/1</div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{
                                    width: `${(count.post / 1) * 100}%`,
                                  }}
                                  className={`absolute top-0 left-0 rounded-r-xl  ${
                                    count.post >= 1
                                      ? "bg-[#40CAB0]"
                                      : "bg-[#398faf]"
                                  }  h-full `}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {!comData?.store && (
                          <div className="flex justify-center items-center mt-4">
                            {comData?.communities.length > 0 ? (
                              <button
                                disabled={count.com < 1 || count.post < 1}
                                onClick={() => {
                                  router.push("/main/store");
                                }}
                                className={`${
                                  count.com < 1 || count.post < 1
                                    ? "bg-[#878b8f]"
                                    : "bg-[#2D9AFF]"
                                }   text-white p-2 text-center font-semibold px-5 text-sm rounded-lg`}
                              >
                                Create Store
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  router.push(
                                    "/main/community/createCommunity"
                                  );
                                }}
                                className={` bg-[#2D9AFF] text-white p-2 text-center font-semibold px-5 text-sm rounded-lg`}
                              >
                                Create Community!
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-white sm:max-h-[310px] dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex pp:flex-row flex-col gap-3 justify-between pp:items-center">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={Cl}
                          alt="image"
                          className="min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px] object-cover rounded-xl"
                        />
                      </div>
                      <div className="text-lg font-semibold">
                        <Hover
                          text={"Topics"}
                          mobile={"-left-[120px]"}
                          pc={"sm:-left-[80px]"}
                          w2={"sm:w-[350px]"}
                          para={
                            "Paid Topics (Unlock Topic Creation): After unlocking topic creation, create exclusive, in-depth content (guides, tutorials) and charge a fee for access. This allows you to directly monetize your expertise. (Example: You could offer a premium investment guide for Rs. 50)"
                          }
                        />
                      </div>
                    </div>
                    {comData?.communities?.length > 0 && (
                      <div>
                        <div className="pp:w-[155px] w-full dark:border-[#3d4654] border-[#d1d1d1] border rounded-xl">
                          <BuiltSelected
                            type={"earnings"}
                            data={comData?.communities}
                            state={state1}
                            setState={setState1}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {(state1.members < 150 || state1.engagementrate < 10) && (
                    <div className="text-sm">
                      Need more topics and power to earn? Reach 150+ members and
                      maintain a 10% engagement rate!
                    </div>
                  )}
                  {state1.members > 150 &&
                    state1.engagementrate > 10 &&
                    state1.topics < 3 && (
                      <div className="text-sm">
                        Congratulations🎉, You can now create a new topic
                      </div>
                    )}
                  <div className="flex text-sm flex-col gap-3">
                    {state1.members > 150 &&
                    state1.engagementrate > 10 &&
                    state1.topics > 2 ? (
                      <>
                        <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                          <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                            <div>Total Earnings</div>
                            <div>₹{Number(state1.earnings).toFixed(2)}</div>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="flex justify-between items-center">
                            <div className="font-semibold text-[17px]">
                              Topics
                            </div>
                            <div className="font-semibold text-[17px]">
                              Members
                            </div>
                            <div className="font-semibold text-[17px]">
                              Earnings
                            </div>
                          </div>
                          <div className="h-[1px] w-full dark:bg-[#3d4654]  my-2"></div>
                          {state1.topic.map((d, i) => (
                            <div className="flex mt-1 justify-between items-center">
                              <div>{d?.title}</div>
                              <div>{d?.members}</div>
                              <div>₹{d?.earnings}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {state1.topics < 3 && (
                          <div className="flex text-sm flex-col gap-3">
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">
                                  Members
                                </div>
                                <div>
                                  {state1.members ? state1.members : 0}/150
                                </div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{
                                    width: `${(state1.members / 150) * 100}%`,
                                  }}
                                  className={`absolute top-0 left-0 rounded-r-xl  ${
                                    state1.members >= 150
                                      ? "bg-[#40CAB0]"
                                      : "bg-[#398faf]"
                                  }  h-full `}
                                ></div>
                              </div>
                            </div>
                            <div className="px-2 flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <div className=" dark:text-white text-[#615E83]">
                                  Popularity Rate
                                </div>
                                <div className="">
                                  {state1.engagementrate
                                    ? state1.engagementrate
                                    : 0}
                                  % / 10%
                                </div>
                              </div>
                              <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                                <div
                                  style={{
                                    width: `${
                                      (state1.engagementrate / 10) * 100
                                    }%`,
                                  }}
                                  className={`absolute top-0 left-0 rounded-r-xl  ${
                                    state1.engagementrate >= 10
                                      ? "bg-[#40CAB0]"
                                      : "bg-[#398faf]"
                                  }  h-full `}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {state1.topics < 3 && (
                          <div className="flex justify-center mt-4  items-center">
                            <div className="text-green-400">
                              {state1.topics < 3 && (
                                <button
                                  disabled={
                                    state1.members < 150 ||
                                    state1.engagementrate < 10
                                  }
                                  onClick={() => {
                                    Cookies.set(
                                      "comedta",
                                      JSON.stringify(tosetCookie)
                                    );
                                    Cookies.set("cmdyd", encryptaes(state1.id));
                                    router.push(
                                      "/main/community/editCommunity?topics=true"
                                    );
                                  }}
                                  className={`${
                                    state1.members < 150 ||
                                    state1.engagementrate < 10
                                      ? "bg-[#878b8f]"
                                      : "bg-[#2D9AFF]"
                                  }   text-white p-2 text-center font-semibold px-5 text-sm rounded-lg`}
                                >
                                  Create Topic!
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {state1.topics > 2 && (
                          <>
                            <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                              <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                                <div>Total Earnings</div>
                                <div>₹{Number(state1.earnings).toFixed(2)}</div>
                              </div>
                            </div>

                            <div className="text-sm">
                              <div className="flex justify-between items-center">
                                <div className="font-semibold text-[17px]">
                                  Topics
                                </div>
                                <div className="font-semibold text-[17px]">
                                  Members
                                </div>
                                <div className="font-semibold text-[17px]">
                                  Earnings
                                </div>
                              </div>
                              <div className="h-[1px] w-full dark:bg-[#3d4654]  my-2"></div>
                              {state1.topic.map((d, i) => (
                                <div className="flex mt-1 justify-between items-center">
                                  <div>{d?.title}</div>
                                  <div>{d?.members}</div>
                                  <div>₹{d?.earnings}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-white dark:bg-[#273142] dark:border-[#3d4654] dark:border shadow-sm py-4 px-3 rounded-xl sm:max-w-[450px]">
                  <div className="flex pp:flex-row flex-col gap-3 justify-between pp:items-center">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={ads}
                          alt="image"
                          className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] object-cover rounded-xl"
                        />
                      </div>
                      <div className="text-lg font-semibold">
                        <Hover
                          text={"Ads Revenue"}
                          mobile={"-left-[170px]"}
                          pc={"sm:-left-[180px]"}
                          w2={"sm:w-[350px]"}
                          para={
                            "Community Ads (500+ Members, 10% Popularity): Once your community reaches 500 members and a 25% popularity score, unlock the power of community ads. Display targeted ads relevant to your audience and earn revenue with every impression or click. (Example: You could earn Rs. 0.50 per ad impression)"
                          }
                        />
                      </div>
                    </div>
                    {comData?.communities?.length > 0 && (
                      <div>
                        {/* <Selected setState={setState2} state={state2} data={comData?.communities} /> */}
                        <div className="pp:w-[155px] w-full dark:border-[#3d4654] border-[#d1d1d1] border rounded-xl">
                          <BuiltSelected
                            type={"earnings"}
                            data={comData?.communities}
                            state={state2}
                            setState={setState2}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {(state2.members < 500 ||
                    state2.engagementrate < 10 ||
                    state2.ismonetized === false) &&
                    state2.status !== "approved" && (
                      <div className="text-sm">
                        Make money with ads on your posts! Earn from ads before,
                        during, and after your content.
                      </div>
                    )}

                  {state2.members >= 500 &&
                    state2.engagementrate >= 10 &&
                    state2.status === "approved" && (
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold">
                          Monetization
                        </div>
                        <div>
                          <Switch
                            checked={state2.ismonetized}
                            onCheckedChange={changeMontentization}
                            id="montentization"
                          />
                        </div>
                      </div>
                    )}

                  {state2.ismonetized || state2.status === "approved" ? (
                    <>
                      <div className="bg-[#f1f1f1] rounded-lg dark:bg-[#3d4654]">
                        <div className="flex flex-col py-2 text-[14px] font-semibold gap-1 justify-center items-center">
                          <div>Total Earnings</div>
                          <div className="flex justify-center text-xl font-bold items-center gap-2">
                            <div>
                              ₹{data?.earningStats?.adsearning.toFixed(2)}
                            </div>
                            <div className="flex justify-center items-center gap-1">
                              <RxCross1 />
                              {state2.engagementrate > 0 &&
                                state2.engagementrate <= 25 && <div>1</div>}
                              {state2.engagementrate > 25 &&
                                state2.engagementrate <= 50 && <div>2</div>}
                              {state2.engagementrate > 50 &&
                                state2.engagementrate <= 75 && <div>3</div>}
                              {state2.engagementrate > 75 &&
                                state2.engagementrate <= 100 && <div>4</div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <div className=" dark:text-white text-[#615E83]">
                            Popularity Rate
                          </div>
                          <div className="">
                            {state2.engagementrate ? state2.engagementrate : 0}{" "}
                            %
                          </div>
                        </div>
                        {/* bg-[#ff718b] */}
                        <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                          <div
                            style={{ width: `${state2.engagementrate}%` }}
                            className={`absolute top-0 z-0 left-0  
                            ${state2.engagementrate <= 25 && "bg-[#ff718b]"}
                            ${
                              state2.engagementrate > 25 &&
                              state2.engagementrate <= 50 &&
                              "bg-[#ff8989]"
                            } 
                            ${
                              state2.engagementrate > 50 &&
                              state2.engagementrate <= 75 &&
                              "bg-[#fce83a]"
                            } 
                            ${
                              state2.engagementrate > 75 &&
                              state2.engagementrate <= 100 &&
                              "bg-[#7fe47e]"
                            }
                            h-full`}
                          ></div>
                          <div
                            style={{ width: `${state2.engagementrate}%` }}
                            className={`absolute top-0 z-0 left-0  
                            ${state2.engagementrate <= 25 && "bg-[#ff718b]"}
                            ${
                              state2.engagementrate > 25 &&
                              state2.engagementrate <= 50 &&
                              "bg-[#ff8989]"
                            } 
                            ${
                              state2.engagementrate > 50 &&
                              state2.engagementrate <= 75 &&
                              "bg-[#fce83a]"
                            } 
                            ${
                              state2.engagementrate > 75 &&
                              state2.engagementrate <= 100 &&
                              "bg-[#7fe47e]"
                            }
                            h-full`}
                          ></div>

                          <div
                            className={`absolute top-0 left-0 z-0 w-full bg-transparent  h-full `}
                          >
                            <div className="w-full flex h-full justify-evenly items-center">
                              <div className="h-full w-1 bg-[#ff718b]"></div>
                              <div className="h-full w-1 bg-[#ff8989]"></div>
                              <div className="h-full w-1 bg-[#fce83a]"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-2 gap-2 mb-2 text-sm flex-col">
                        {/* <div>Impressions : {state2.impressions}</div> */}
                        <div>
                          Earning from Views : ₹{state2?.cpm?.toFixed(2)}{" "}
                          (approx.)
                        </div>
                        <div>
                          Earnings from Clicks : ₹{state2?.cpc?.toFixed(2)}{" "}
                          (approx.)
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex text-sm flex-col gap-3">
                      {!state2.ismonetized && state2.status !== "approved" && (
                        <>
                          {" "}
                          <div className="px-2 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <div className=" dark:text-white text-[#615E83]">
                                Members
                              </div>
                              <div>
                                {state2.members ? state2.members : 0}/500
                              </div>
                            </div>
                            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                              <div
                                style={{
                                  width: `${(state2.members / 500) * 100}%`,
                                }}
                                className={`absolute top-0 left-0 rounded-r-xl  ${
                                  state2.members >= 500
                                    ? "bg-[#40CAB0]"
                                    : "bg-[#398faf]"
                                }  h-full `}
                              ></div>
                            </div>
                          </div>
                          <div className="px-2 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <div className=" dark:text-white text-[#615E83]">
                                Popularity Rate
                              </div>
                              <div className="">
                                {state2.engagementrate
                                  ? state2.engagementrate
                                  : 0}{" "}
                                % / 10%
                              </div>
                            </div>
                            <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#F8F8FF] rounded-full">
                              <div
                                style={{
                                  width: `${
                                    (state2.engagementrate / 10) * 100
                                  }%`,
                                }}
                                className={`absolute top-0 left-0 rounded-r-xl  ${
                                  state2.engagementrate >= 10
                                    ? "bg-[#40CAB0]"
                                    : "bg-[#398faf]"
                                }  h-full `}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}

                      {state2.status == "pending" && (
                        <>
                          {" "}
                          {state2.members >= 500 &&
                            state2.engagementrate >= 10 &&
                            !state2.ismonetized && (
                              <div className="flex justify-center mt-4 items-center">
                                <button className="bg-[#878b8f] text-white p-2 px-5 text-sm rounded-lg">
                                  Waiting...
                                </button>
                              </div>
                            )}
                        </>
                      )}

                      {state2.status == "rejected" && (
                        <>
                          {" "}
                          {state2.members >= 500 &&
                            state2.engagementrate >= 10 &&
                            !state2.ismonetized && (
                              <div className="flex justify-center mt-4 items-center">
                                <button
                                  disabled={
                                    state2.status == "rejected" &&
                                    new Date(Date.now()) <=
                                      new Date(state2.reapplydate)
                                  }
                                  onClick={() =>
                                    sendRequestForMontenziation(id, state2.id)
                                  }
                                  className="bg-[#2D9AFF] text-white p-2 px-5 text-sm rounded-lg"
                                >
                                  {state2.status == "rejected" &&
                                  new Date(Date.now()) <=
                                    new Date(state2.reapplydate)
                                    ? "Your Request Has Been Rejected"
                                    : "Apply for Monetization"}
                                </button>
                              </div>
                            )}
                        </>
                      )}

                      {!state2.status && (
                        <>
                          {" "}
                          {!state2.ismonetized && (
                            <div className="flex justify-center mt-4 items-center">
                              <button
                                disabled={
                                  state2.members < 500 ||
                                  state2.engagementrate < 10
                                }
                                onClick={() =>
                                  sendRequestForMontenziation(id, state2.id)
                                }
                                className={`${
                                  state2.members < 500 ||
                                  state2.engagementrate < 10
                                    ? "bg-[#878b8f]"
                                    : "bg-[#2D9AFF]"
                                }  text-white p-2 px-5 text-sm rounded-lg`}
                              >
                                Apply for Monetization
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {state2.status == "rejected" &&
                        new Date(Date.now()) <=
                          new Date(state2.reapplydate) && (
                          <div>
                            <div>Reason: {state2.reason}</div>
                            <div>
                              You can reapply for monetization on{" "}
                              {formatISOStringToDMY(
                                new Date(state2.reapplydate)
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
                {/* } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
