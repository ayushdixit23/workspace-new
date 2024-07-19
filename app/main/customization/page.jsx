"use client";
import { getData } from "@/app/utilsHelper/Useful";
import Image from "next/image";
import t1 from "../../assets/image/t1.png";
import t2 from "../../assets/image/t2.png";
import t3 from "../../assets/image/t3.png";
import t4 from "../../assets/image/t4.png";
import t5 from "../../assets/image/t5.png";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  useDefaultPrositeMutation,
  useDeleteRecentPrositesMutation,
  useFetchValueQuery,
} from "@/app/redux/apiroutes/prosite";
import Hover from "@/app/data/Hover";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoadThis } from "@/app/redux/slice/userData";
import { useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const { id } = getData();
  const [isChecked, setIsChecked] = useState(false);
  const [defaultProsite] = useDefaultPrositeMutation();
  const dispatch = useDispatch();
  const [deleteRecentProsite] = useDeleteRecentPrositesMutation();
  const { data, refetch } = useFetchValueQuery({ id }, { skip: !id });
  const [prositeId, setPrositeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const changeprosite = async () => {
    try {
      setIsChecked(!isChecked);
      await defaultProsite({
        id,
        checked: isChecked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecentProsites = async () => {
    try {
      setLoading(true);
      const res = await deleteRecentProsite({
        id,
        prositeId,
      });
      if (res.data.success) {
        await refetch();
        toast.success("Changes Saved!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      setPrositeId("");
    }
  };

  useEffect(() => {
    if (data) {
      setIsChecked(!data?.useDefaultProsite);
    }
  }, [data, id]);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 backdrop-blur-md h-screen flex justify-center items-center ">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <div
        className={`${
          showDelete
            ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
            : "hidden -z-50"
        }`}
      >
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] dark:text-white lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
            <div className="flex flex-col gap-3 mt-4 justify-center mb-4 items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                <div>Do you really want to delete this Recent Prosite?</div>
                <div> This process cannot be undone.</div>
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button
                onClick={() => {
                  setShowDelete(false), dispatch(LoadThis(false));
                }}
                className="w-full border-2 dark:border-white p-2 px-5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDelete(false),
                    deleteRecentProsites(),
                    dispatch(LoadThis(false));
                }}
                className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="sm:h-[82vh] h-auto overflow-y-scroll no-scrollbar py-5 bg-white sm:rounded-xl *:
			
			dark:bg-[#273142] flex flex-col"
      >
        <div className="flex justify-between border-b px-4 sm:px-7 dark:border-[#3d4654] items-center w-full">
          <div className=" pb-2 w-full font-medium text-[#4880FF]">
            <Hover
              text={"Prosite Templates"}
              para={
                "Craft Your Online Presence with Ease: Grovyo Prosites offer a selection of pre-made layouts to jumpstart your prosite creation. These layouts provide a foundation of pre-arranged content blocks (text, images, calls to action, backgrounds) that you can easily customize with your own content and branding.  This allows you to quickly build a professional-looking prosite without needing to start from scratch."
              }
              w2={"sm:w-[380px]"}
            />
          </div>
          <div className=" w-full flex justify-end items-center">
            <div>
              <div className="flex items-center space-x-2">
                <Hover
                  text={"Set Live"}
                  para={
                    "Click 'Set Live' to publish your Prosite and showcase your brand or portfolio online!"
                  }
                  mobile="-left-[180px]"
                />

                <Switch checked={isChecked} onCheckedChange={changeprosite} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid pn:max-sm:mb-[3%] grid-cols-1 mt-5 px-5 w-full">
          {data?.recentProsites?.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              <div className="relative top-3 font-semibold">
                Recent Prosite{data?.recentProsites?.length > 1 ? "s" : null}
              </div>
              <div className="flex gap-4 w-full overflow-x-scroll no-scrollbar max-w-full">
                <div className="flex gap-4 w-full my-4">
                  {data?.recentProsites.map((d, i) => {
                    const headline = d?.headline;
                    const description = d?.description;
                    const backgroundColor = d?.backgroundColor;
                    const backgroundImage = d?.backgroundImage;
                    const color = d?.color;
                    const image = d?.image;
                    const button = d?.button;
                    const fonts = d?.fonts;

                    const jsonData = {
                      headline,
                      description,
                      backgroundColor,
                      backgroundImage,
                      color,
                      image,
                      button,
                      fonts,
                    };

                    const url = `https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                      id
                    )}&addData=true&temp=${
                      d?.template
                    }&data=${encodeURIComponent(JSON.stringify(jsonData))}`;

                    return (
                      <div
                        key={i}
                        className="z-0 min-w-[275px] group w-full relative max-w-[300px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      >
                        <Image
                          src={d?.canvasImage}
                          width={500}
                          height={500}
                          className="rounded-t-lg  h-[150px] w-full object-contain dark:bg-black"
                        />
                        <div
                          className="absolute group-hover:block hidden right-0 -top-4 z-20"
                          onClick={() => {
                            setShowDelete(true),
                              dispatch(LoadThis(true)),
                              setPrositeId(d?._id);
                          }}
                        >
                          <FiTrash2 className="text-xl mt-1 cursor-pointer" />
                        </div>
                        <div className="p-2 flex justify-between items-center px-2">
                          <div className="font-semibold text-sm sm:text-base ">
                            Recent #{i + 1}
                          </div>
                          <div className="flex justify-center  items-center gap-2">
                            <a
                              target="_blank"
                              href={url}
                              className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Use
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col mt-4">
            <div className="my-2 font-bold">Templates</div>
            <div className="flex justify-center items-center w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 w-full">
                <div className="pm:max-pp:max-w-[275px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Image
                    className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black"
                    src={t1}
                    alt=""
                  />
                  <div className="p-2 flex pp:flex-row flex-col justify-between items-center px-2">
                    <div className="font-semibold text-sm sm:text-base ">
                      Basic layout
                    </div>

                    <a
                      target="_blank"
                      href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                        id
                      )}&temp=1&addData=false`}
                      className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>

                <div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Image
                    className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black"
                    src={t2}
                    alt=""
                  />

                  <div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
                    <div className="font-semibold text-sm sm:text-base">
                      Panoramic Layout
                    </div>
                    <a
                      target="_blank"
                      href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                        id
                      )}&temp=2&addData=false`}
                      className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>
                <div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Image
                    className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black"
                    src={t3}
                    alt=""
                  />

                  <div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
                    <div className="font-semibold text-sm sm:text-base">
                      L-Basic Layout
                    </div>
                    <a
                      target="_blank"
                      href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                        id
                      )}&temp=3&addData=false`}
                      className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>
                <div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Image
                    className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black"
                    src={t4}
                    alt=""
                  />

                  <div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
                    <div className="font-semibold text-sm sm:text-base">
                      Immersive Layout
                    </div>

                    <a
                      target="_blank"
                      href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                        id
                      )}&temp=4&addData=false`}
                      className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>
                <div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Image
                    className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black"
                    src={t5}
                    alt=""
                  />

                  <div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
                    <div className="font-semibold text-sm sm:text-base">
                      3D Layout
                    </div>
                    <a
                      target="_blank"
                      href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
                        id
                      )}&temp=5&addData=false`}
                      className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* new */}

      {/* new */}
    </>
  );
};

export default page;
