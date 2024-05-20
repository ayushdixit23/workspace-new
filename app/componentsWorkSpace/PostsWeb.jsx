import React, { useState } from "react";
import { formatISOStringToDMY, formatNumber, getData } from "../utilsHelper/Useful";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { LoadThis } from "@/app/redux/slice/userData";
import { BiUpArrowAlt } from "react-icons/bi";

const PostsWeb = ({
  d,
  userid,
  setPostid,
  setOpen,
  open,
  dispatch,
  postDeletion,
}) => {
  const [showing, setShowing] = useState(false);
  const [pop, setPop] = useState(false);
  const { id } = getData()
  const handlePostId = (id) => {
    try {
      setShowing(false);
      dispatch(LoadThis(true));
      setPop(true);
      setPostid(id);
    } catch (error) {
      console.log(error);
    }
  };

  function generateRandomNumber() {
    // Generate a random 10-digit number
    const min = Math.pow(10, 9); // Minimum 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const dataToSave = {
    id: d?.post?._id,
    title: d?.post.title,
    desc: d?.post.desc,
    tags: d?.post.tags,
    post: d?.post.post,
  };
  return (
    <>
      <div
        className={`${pop
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "hidden -z-50"
          }`}
      >
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] dark:text-white lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
            <div className="flex flex-col gap-3 mt-4 justify-center mb-4 items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                <div>Do you really want to Delete this Post?</div>
                <div> This process cannot be undone.</div>
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button
                onClick={() => {
                  setPop(false), dispatch(LoadThis(false));
                }}
                className="w-full border-2 dark:border-white p-2 px-5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  postDeletion(), setPop(false), dispatch(LoadThis(false));
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
        onClick={() => setShowing(false)}
        className={`${showing ? "fixed z-50 w-screen h-screen" : "hidden  -z-30"
          } `}
      ></div>
      <tr className="bg-white pn:max-sm:hidden border-b h-[70px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="font-medium w-[250px]  text-left">
          <div className="flex gap-2 p-2 items-center">
            <div>
              {d?.video ? (
                <video
                  src={d?.dps}
                  className="object-contain bg-black min-w-[50px] w-[50px] h-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white"
                  alt="video"
                />
              ) : (
                <img
                  src={d?.dps}
                  className="object-contain bg-black h-[50px] w-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white"
                  alt="image"
                />
              )}
            </div>
            <div className="flex flex-col text-xs font-medium gap-1">
              {d?.post.title.length <= 15
                ? d?.post.title
                : `${d?.post.title.slice(0, 15)}...`}
            </div>
          </div>
        </td>
        <td className="text-center">{formatNumber(d?.post.likes)}</td>
        <td className="text-center">
          {formatNumber(d?.post.comments?.length)}
        </td>
        <td className="text-center">{formatNumber(d?.post.sharescount)}</td>
        <td className="text-center">
          {formatISOStringToDMY(d?.post.createdAt)}
        </td>
        <td className="text-center">{`${d?.engrate}%`}</td>
        <td className="text-center">
          <div className="flex justify-center gap-3 relative items-center">
            <div>
              {/* <a target='_blank' href={`http://localhost:3001/rederctmg?zray=${userid}&pstiq=${d?.post?._id}&loc=web&path=/createAd?adid=${generateRandomNumber()}&step=1`
              } className='bg-blue-500 text-white p-2 px-4 rounded-2xl'>Promote</a> */}
              <a
                target="_blank"
                href={`https://ads.grovyo.com/rederctmg?zray=${userid}&pstiq=${d?.post?._id}&path=/createAd?adid=${generateRandomNumber()}&step=1`}
                className="bg-blue-500 text-white p-2 px-4 rounded-2xl"
              >
                Promote
              </a>
              {/* <a href={`https://ads.grovyo.com/rederctmg?zray=${userid}&pstiq=${d?.post?._id}&path=/createAd?step=2`} className='bg-blue-500 text-white p-2 px-4 rounded-2xl'>Promote</a> */}
            </div>
            <div className="flex text-center  relative mr-3 justify-around items-center">
              <BsThreeDotsVertical onClick={() => setShowing(!showing)} />
              <div
                className={`${showing
                  ? "absolute top-5 z-50 -left-20 h-[80px] rounded-lg w-[100px] bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] shadow-lg"
                  : "hidden"
                  } `}
              >
                <div className="flex flex-col justify-start items-start gap-3 p-3">
                  <div
                    onClick={() => {
                      setShowing(false);
                      sessionStorage.setItem(
                        "postdata",
                        JSON.stringify(dataToSave)
                      );
                      setOpen(true);
                    }}
                  >
                    Edit
                  </div>
                  <button
                    onClick={() => {
                      setShowing(false);
                      handlePostId(d?.post?._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      {/* mobile */}
      <div
        className={`light:border-b mb-[10%] sm:hidden light:border-[#eaecf0] px-2 flex flex-col justify-center items-center gap-4 w-full`}
      >
        <div className="flex justify-between mt-3 px-3 w-full items-center">
          <div className="flex justify-center items-center gap-2">
            <div>
              {d?.video ? (
                <video
                  src={d?.dps}
                  className="object-contain bg-black h-[50px] w-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                  alt="video"
                />
              ) : (
                <img
                  src={d?.dps}
                  className="object-contain bg-black h-[50px] w-[50px] cursor-pointer flex justify-center items-center rounded-md ring-1 ring-white "
                  alt="image"
                />
              )}
            </div>
            <div className="text-sm font-bold dark:text-white text-[#101828]">
              {d?.post.title.length <= 15
                ? d?.post.title
                : `${d?.post.title.slice(0, 15)}...`}
            </div>
          </div>
          {/* <div className="text-[#667085] dark:text-white text-sm">
						{formatISOStringToDMY(d?.post.createdAt)}
					</div> */}
          <div className="flex text-center  relative mr-3 justify-around items-center">
            <BsThreeDotsVertical onClick={() => setShowing(!showing)} />
            <div
              className={`${showing
                ? "absolute top-5 z-50 -left-20 h-[120px] rounded-lg w-[100px] bg-white dark:bg-[#273142] dark:border dark:border-[#3d4654] shadow-lg"
                : "hidden"
                } `}
            >
              <div className="flex flex-col justify-start items-start gap-3 p-3">
                <Link href={"/main/community/editCommunity"}>Edit</Link>
                <div>
                  {/* <a href='https://ads.grovyo.com' >Promote</a> */}
                  <a
                    target="_blank"
                    href={`https://ads.grovyo.com/rederctmg?zray=${id}&pstiq=${d?.post?._id}&path=/createAd?adid=${generateRandomNumber()}&step=1`}
                    className="rounded-2xl"
                  >
                    Promote
                  </a>
                  {/* <a href={`https://ads.grovyo.com/rederctmg?zray=${userid}&pstiq=${d?.post?._id}&path=/createAd?step=2`} className='bg-blue-500 text-white p-2 px-4 rounded-2xl'>Promote</a> */}
                </div>
                <button onClick={() => handlePostId(d?.post?._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly dark:text-white text-[#101828] mb-3 w-full items-center">
          <div className="flex text-sm flex-col justify-center items-center">
            <div>{formatNumber(d?.post.likes)}</div>
            <div className="pn:max-pp:text-xs">Applauses</div>
          </div>
          <div className="flex text-sm flex-col justify-center items-center">
            <div>{formatNumber(d?.post.comments?.length)}</div>
            <div className="pn:max-pp:text-xs">Comments</div>
          </div>
          <div className="flex text-sm flex-col justify-center items-center">
            <div>{formatNumber(d?.post.sharescount)}</div>
            <div className="pn:max-pp:text-xs">Shares</div>
          </div>
          <div>
            <div className="bg-[#ecfdf3] p-1 px-2 flex justify-center items-center rounded-xl">
              <div>
                <BiUpArrowAlt className="text-[#12b76a]" />
              </div>

              <div className="text-[#12b76a]">{`${d?.engrate}%`}</div>
            </div>

            <div className="hidden">-5</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsWeb;
