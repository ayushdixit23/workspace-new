"use client";
import React, { useState } from "react";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaCamera, FaChevronDown, FaPlus } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import {
  useCreateComMutation,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} from "@/app/redux/apiroutes/community";
import { getData } from "@/app/utilsHelper/Useful";
import Image from "next/image"
import { FcInfo } from "react-icons/fc";

function page() {
  const router = useRouter();
  const { id } = getData()
  const [createCommunity, setCreateCommunity] = useState({
    title: "",
    desc: "",
    selectedCategory: "Select a Category",
    type: "public"
  })
  const [topics, setTopics] = useState({
    isOpen: false,
    topicTitle: "",
    type: "free",
    message: "",
    price: "",
    topicidForEdit: null
  })

  const [by, setBy] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [change, setChange] = useState(1);
  const [leave, setLeave] = useState(false);
  const [topicId, setTopicId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createTopicByMutation] = useCreateTopicMutation();
  const [editTopicByMutation] = useUpdateTopicMutation();
  const [createCom] = useCreateComMutation();
  const [deleteTopics] = useDeleteTopicMutation();
  const [dataoftopic, setDataOfTopic] = useState([]);

  const topicskoEditkro = async () => {
    if (topics.topicTitle && topics.message && topics.type) {
      topics.topicidForEdit ? EditTopicForServer() : sendDataToServer();
    }
  };

  const sendDataToServer = async () => {
    try {
      const data = {
        title: topics.topicTitle,
        type: topics.type,
        price: topics.price,
        message: topics.message,
      };
      const res = await createTopicByMutation({
        id,
        data,
      });

      setTopicId([...topicId, res.data.topic._id]);
      setDataOfTopic([...dataoftopic, res.data.topic]);
    } catch (err) {
      console.log(err);
    }
    setTopics({ ...topics, isOpen: false, message: "", topicTitle: "", type: "", price: "", topicidForEdit: null })
  };

  const EditTopicForServer = async () => {
    try {
      const data = {
        title: topics.topicTitle,
        type: topics.type,
        price: topics.price,
        message: topics.message,
      };
      const res = await editTopicByMutation({
        id,
        topicid: topics.topicidForEdit,
        data,
      });
      const updatedataoftopic = dataoftopic.map((d) => {
        return d._id === topics.topicidForEdit ? res.data.updatedTopic : d;
      });
      setDataOfTopic(updatedataoftopic);
      setTopics({ ...topics, isOpen: false, message: "", topicTitle: "", type: "", price: "", topicidForEdit: "" })
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    setSelectImage(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  const appendFormData = (formData, key, value) => {
    formData.append(key, value);
  };

  const handleSubmit = async (e) => {
    if (!selectImage || !createCommunity.title || !createCommunity.desc || !createCommunity.selectedCategory) {
      toast.error("Please Enter All Details")
      return
    }
    setLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();
    appendFormData(formDataToSend, "image", selectedImage);
    appendFormData(formDataToSend, "title", createCommunity.title);
    appendFormData(formDataToSend, "category", createCommunity.selectedCategory);
    appendFormData(formDataToSend, "desc", createCommunity.desc);
    appendFormData(formDataToSend, "type", createCommunity.type);
    if (Array.isArray(topicId) && topicId.length > 0) {
      topicId.forEach((id, i) => {
        appendFormData(formDataToSend, `iddata[${i}]`, id);
      });
    }
    try {
      const response = await createCom({
        id,
        data: formDataToSend,
      });

      if (response.data?.success) {
        router.push("/main/community");
        setTimeout(() => {
          toast.success("Community Created!");
        }, 500)
      } else {
        setTimeout(() => {
          toast.error(response.data.message)
        }, 1500)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const handle = () => {
  //   setTopics({ ...topics, type: "Free" })

  //   setChange(1);
  // };
  // const handl = () => {
  //   setTopics({ ...topics, type: "Paid" })
  //   setChange(2);
  // };

  const deleteTopic = async (tId) => {
    try {
      const uiUpdate = dataoftopic.filter((d, i) => {
        return d._id != tId;
      });
      setDataOfTopic(uiUpdate);

      const response = await deleteTopics({
        id,
        topicId: tId,
        data: undefined,
      });
      if (response.data?.success) {
        const a = topicId.filter((d) => d != tId);
        setTopicId(a);
      }

    } catch (err) {
    }
  };



  const EditTopic = async (tId, title, msg) => {
    setTopics({ ...topics, topicTitle: title, isOpen: true, message: msg, topicidForEdit: tId })
  };

  // const categories = [
  //   "Art",
  //   "Design",
  //   "Photography",
  //   "Fashion",
  //   "Music",
  //   "Writing",
  //   "Film and Video",
  //   "Crafts",
  //   "Cooking and Food",
  //   "Gaming",
  //   "Fitness and Wellness",
  //   "Beauty",
  //   "Technology",
  //   "Travel",
  //   "Education",
  //   "Lifestyle",
  //   "Parenting",
  //   "Sports",
  //   "DIY and Home Improvement",
  //   "Business",
  //   "Entrepreneurship",
  //   "Startups",
  //   "Marketing",
  //   "Sales",
  //   "Business Strategy",
  //   "Finance and Investing",
  //   "Leadership and Management",
  //   "Productivity and Time Management",
  //   "E-commerce",
  //   "Social Media Marketing",
  //   "Personal Branding",
  //   "Business Consulting",
  //   "Business Development",
  //   "Human Resources",
  //   "Negotiation",
  //   "Communication Skills",
  //   "Project Management",
  //   "Business Analytics",
  //   "Retail",
  //   "Merchandising",
  //   "Supply Chain Management",
  //   "Real Estate",
  // ];


  const categories = [
    "Movies & Entertainment", "News", "Pet & Animals", "Gaming", "Career & Education", "Anime & Manga",
    "Humor & Memes", "Family & Relationships", "Sports",
    "Science & Learning", "DIY & Crafts", "Music & Podcasts", "Beauty & Fashion", "Health & Fitness", "Food & Cooking", "Business & Finance",
    "Photography", "Travel & Gadgets", "Pop Culture", "Cars", "Motivation & Self-Help"
  ]

  const handleChangePhotoClick = () => {
    document.getElementById("inputTag").click()
  }



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
    <div>
      <Toaster />
      {/* popup 1 */}

      <div
        className={`${leave
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "-z-50 hidden"
          }`}
      >
        <div
          className={`${leave
            ? "h-48 w-80 bg-[#F9F9F9] px-2 dark:bg-[#273142] sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setLeave(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl "
            >
              No, cancel
            </div>
            <Link
              href="/main/community"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white "
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>
      {/* popup 2 */}
      <div
        onClick={() => setBy(false)}
        className={`${by
          ? "h-screen pn:max-sm:w-full bg-[#cccccc33] z-50 flex fixed w-screen justify-center items-center pn:max-sm:items-end pn:max-sm:justify-end  inset-0 duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${by
            ? "h-[390px] w-full p-6 dark:bg-[#273142] pn:max-sm:text-sm bg-[#fff] pn:max-sm:bottom-0 gap-2 flex-wrap sm:w-[550px] shadow-md sm:bg-white pn:max-sm:rounded-b-none rounded-3xl  flex duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="flex justify-between pn:max-sm:text-sm items-center px-2 w-full">
            <div className="font-semibold ">
              Select Community Category
            </div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setBy(false);
              }}
            />
          </div>
          <div className="overflow-auto no-scrollbar h-60 font-semibold bg-[#fff] pn:max-sm:text-sm gap-2 flex-wrap w-[100%]  sm:bg-white dark:bg-[#273142] flex duration-100">
            {categories.map((c, i) => (
              <div
                onClick={() => {
                  setCreateCommunity({ ...createCommunity, selectedCategory: c })
                  setBy(false);
                }}
                key={i}
                className="p-2 px-4 m-1 border border-[#979797] rounded-xl pn:max-sm:text-sm flex gap-2 hover:bg-[#4880FF] hover:text-[#fff]"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`${topics.isOpen ? "fixed inset-0 w-screen z-50 bg-[#cccccc33] h-screen flex justify-center items-center" : "hidden -z-50"}`}>
        <div className="flex justify-center pn:max-sm:text-sm shadow-md items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
          <div className="w-full flex flex-col gap-2">
            <div className="text-xl text-center mt-2 font-semibold">Create Topics</div>
            <div className="flex flex-col gap-3 p-2">
              <div className="flex flex-col w-full gap-1">
                <div>Topic Name</div>
                <div>
                  <input value={topics.topicTitle}
                    onChange={(e) => setTopics({ ...topics, topicTitle: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Topic Name" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Enter Welcome Message</div>
                <div>
                  <input value={topics.message}
                    onChange={(e) => setTopics({ ...topics, message: e.target.value })} type="text" className="p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Welcome Message" />
                </div>
              </div>
              <div className="flex justify-between items-center my-2">
                <div className="text-xl font-medium">Paid</div>
                <div>
                  {
                    topics.type === "free" ? <LiaToggleOffSolid onClick={() => setTopics({ ...topics, type: "paid" })} className="text-3xl dark:text-white text-[#282828] cursor-pointer" /> : <LiaToggleOnSolid onClick={() => setTopics({ ...topics, type: "free", price: "" })} className="text-3xl text-[#16dbcc] cursor-pointer" />
                  }
                </div>
              </div>
              {topics.type === "paid" && <div className="flex flex-col w-full gap-1">
                <div>Price</div>
                <div className="w-full flex justify-center p-1.5 px-3 bg-[#F4F7FE] dark:bg-[#323d4e] rounded-xl items-center">
                  <input value={topics.price}
                    onChange={(e) => setTopics({ ...topics, price: e.target.value })} type="number" className=" bg-transparent outline-none w-full" placeholder="Price" />
                  <div className="flex p-1.5 px-3 relative group text-sm rounded-xl dark:bg-[#273142] bg-white gap-2 justify-center items-center">
                    <div>Monthly</div>
                    <div><FaChevronDown /></div>
                    <div className="absolute top-8 hidden left-0 shadow-md group-hover:block rounded-xl cursor-pointer dark:bg-[#273142] bg-white w-full">
                      <div className="flex flex-col justify-center items-center">
                        <div className="p-2 px-3 font-medium">Monthly</div>
                        <div className="p-2 px-3 font-medium">Yearly</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
              <div className="flex justify-center gap-3 items-center">
                <button onClick={() => {
                  setTopics({ ...topics, isOpen: false });
                }} className="border-[#979797] border font-bold w-full p-2 rounded-lg">Discard</button>
                <button
                  onClick={topicskoEditkro}
                  className="bg-[#FFD25E] font-bold w-full p-2 rounded-lg">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div suppressHydrationWarning className="grid pn:max-sm:text-sm grid-cols-1 p-3 h-full lg:h-[83vh] dark:bg-[#273142] bg-white w-full">
        <div className="flex justify-center sm:overflow-y-scroll sm:no-scrollbar sm:max-h-[85vh] lg:h-full  w-full items-center ">
          <div className="sm:w-[85%] w-full md:w-[75%]">
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="inputTag"
                className="sm:w-[95px] w-[80px] h-[80px] relative overflow-hidden mb-2 dark:bg-[#323d4e] bg-[#ECECEE] items-center justify-center sm:h-[90px] rounded-[30px] light:border-2 flex flex-col"
              >
                {selectImage != null ? <Image
                  src={selectImage ? selectImage : ""}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                  alt="image"
                /> : (
                  <div
                    className="flex justify-center flex-col items-center"
                  >
                    <FaCamera className="text-2xl" />
                  </div>
                )}

              </label>
              {selectImage == null ? (
                <div
                  onClick={handleChangePhotoClick}
                  className="text-sm pb-2 text-[#0075ff] "
                >
                  Upload Photo
                </div>
              ) : <button
                onClick={handleChangePhotoClick}
                className="text-sm pb-2 text-[#0075ff] "
              >
                Edit Photo
              </button>}

              <input
                id="inputTag"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="w-full grid sm:grid-cols-2 mt-2 gap-7">
              <div className="flex flex-col w-full gap-5">
                <div className="flex flex-col gap-1">
                  <div className="text-[#606060] dark:text-white font-semibold text-sm">Community Name</div>
                  <div>
                    <input type="text" className="p-2 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Community Name"
                      value={createCommunity.title}
                      onChange={(e) => setCreateCommunity({ ...createCommunity, title: e.target.value })} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="text-[#606060] dark:text-white  font-semibold text-sm">Community Description</div>
                    <div>{createCommunity.desc.length}/500</div></div>
                  <div className="flex flex-col gap-1">
                    <textarea
                      className="outline-none p-2 bg-[#F4F7FE] dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-xl min-h-32 max-h-48 "
                      type="text"
                      placeholder="This is just a simple caption text!"
                      value={createCommunity.desc}
                      onChange={(e) => setCreateCommunity({ ...createCommunity, desc: e.target.value })}
                      maxLength={500}
                    />

                  </div>
                </div>
                {createCommunity.selectedCategory === "Select a Category" ? <div className="flex flex-col gap-1">
                  <div className="text-[#606060] dark:text-white font-semibold text-sm">Categories</div>
                  <div
                    className={`"outline-none flex justify-center p-2 bg-[#F4F7FE] dark:bg-[#323d4e] items-center rounded-xl w-[100%]"`}
                    onClick={() => setBy(!by)}
                  >
                    {createCommunity.selectedCategory}
                  </div>
                </div> :

                  <div className="flex flex-col gap-1">
                    <div className="text-[#606060] dark:text-white font-semibold text-sm">Categories</div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-[#4880FF] p-2 px-3.5 rounded-full text-white">{createCommunity.selectedCategory}</div>
                      <div onClick={() => setBy(!by)} className="p-2 px-3.5 border-[#4880FF] bg-[#F4F7FE] dark:bg-[#323d4e] rounded-full">Change Category</div>
                    </div>
                  </div>}

              </div>
              <div className=" w-[100%] max-h-[900px] flex flex-col sm:items-center">
                <div className=" rounded-2xl bg-white dark:bg-[#273142] pp:w-[95%] min-w-[250px]">
                  <div className="mb-4 flex flex-col gap-1">
                    <div className="text-[#606060] dark:text-[#fff] font-semibold text-sm">Select type of your Community</div>
                    <div className="flex gap-3 items-center">

                      <div onClick={() => setCreateCommunity({ ...createCommunity, type: "public" })} className={`p-2 flex items-center gap-1 px-4 ${createCommunity.type === "public" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>

                        <div>Public</div>
                        <div className="relative group cursor-pointer inline-block"><FcInfo />
                          <div className="hidden group-hover:block text-[14px] w-[250px] sm:w-[350px] shadow-lg -left-11 sm:-left-[80px] font-semibold absolute top-0 z-20 mt-[30px] dark:bg-[#323d4e] bg-white  text-black dark:text-white opacity-0 group-hover:opacity-100 transition p-3 rounded-lg">
                            Create a public community where anyone can join. This helps you reach a wider audience and grow your network.
                          </div>
                        </div>
                      </div>
                      <div onClick={() => setCreateCommunity({ ...createCommunity, type: "private" })} className={`p-2 flex items-center gap-1 px-4 ${createCommunity.type === "private" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>
                        <div>Private</div>
                        <div className="relative group cursor-pointer inline-block"><FcInfo />
                          <div className="hidden group-hover:block text-[14px] w-[250px] sm:w-[350px] shadow-lg sm:-left-[80px] -left-[150px] font-semibold absolute top-0 z-20 mt-[30px] dark:bg-[#323d4e] bg-white text-black dark:text-white opacity-0 group-hover:opacity-100 transition p-3 rounded-lg">
                            Build a private community where you personally invite members
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-[10%] sm:mb-0 gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-sm flex items-center gap-1 dark:text-[#fff] text-[#606060]">
                        <div>Topics</div>
                        <div className="relative group cursor-pointer inline-block"><FcInfo />
                          <div className="hidden group-hover:block text-[14px] w-[250px] -left-7 sm:left-0 -top-[190px] shadow-lg font-semibold absolute sm:top-0 z-20 mt-[20px] dark:bg-[#323d4e] bg-white text-black dark:text-white opacity-0 group-hover:opacity-100 transition p-3 rounded-lg">
                            Turn your expertise into income. Create in-depth guides, tutorials, or exclusive content for your community, and charge a fee for access.  Grow your earnings alongside your engaged audience.
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold flex items-center gap-1 text-sm dark:text-[#fff] text-[#606060]">
                        <div>Actions</div>
                        <div className="relative group cursor-pointer inline-block"><FcInfo />
                          <div className="hidden group-hover:block text-[14px] w-[250px] shadow-lg -top-[170px] sm:top-0 -left-[240px] sm:-left-[180px] font-semibold absolute z-20 mt-[30px] dark:bg-[#323d4e] bg-white text-black dark:text-white opacity-0 group-hover:opacity-100 transition p-3 rounded-lg">
                            Manage Your Topics: Edit or delete topics to keep your community organized and focused. This ensures you can maintain a clear and streamlined content flow
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-2 border-2 dark:border-[#3d4654] border-[#f1f1f1] rounded-xl">
                        All
                      </div>
                      <div className="p-2 border-2 dark:border-[#3d4654] border-[#f1f1f1] rounded-xl">
                        Post
                      </div>
                      {dataoftopic.map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-between border-2 dark:border-[#3d4654] border-[#f1f1f1] rounded-xl items-center p-2"
                        >
                          <div className="">{d?.title}</div>
                          <div className="flex justify-center gap-2 items-center">
                            <div
                              onClick={() =>
                                EditTopic(d?._id, d?.title, d?.message)
                              }
                              className="cursor-pointer"
                              title="Edit"
                            >
                              <MdEdit size={20} />
                            </div>
                            <div
                              onClick={() => {
                                deleteTopic(d?._id);
                              }}
                              title="Delete"
                              className="cursor-pointer"
                            >
                              <RiDeleteBin6Line size={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div className="my-6">
                    <button
                      onClick={() => setTopics({ ...topics, isOpen: true })}
                      className="flex justify-center gap-2 items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl"
                    >
                      <div>
                        <FaPlus />
                      </div>
                      <div>Add Topic</div>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`fixed flex justify-center pn:max-sm:text-sm items-center ${leave ? "-z-50" : "z-40"} h-16 bg-white w-full dark:bg-[#273142] dark:border-t dark:border-[#3d4654] sm:hidden bottom-0 left-0`}>
          <div className="flex justify-center gap-3 w-full px-3 items-center">
            <div onClick={() => setLeave(true)} className="w-full flex justify-center p-2 border border-[#979797] rounded-lg items-center">Discard</div>
            <div className="w-full flex justify-center p-2 bg-[#4880FF] rounded-lg text-white items-center" onClick={handleSubmit}>Save</div>
          </div>
        </div>

        <div className="flex justify-center mt-5 pn:max-sm:hidden gap-2 items-center">
          <div onClick={() => setLeave(true)} className=" flex justify-center px-16 p-2 border border-[#979797] rounded-lg items-center">Discard</div>
          <button onClick={handleSubmit} className="bg-[#4880FF] text-white p-2 px-16 rounded-lg">Save</button>
        </div>
      </div >
    </div >
  );
}

export default page;
