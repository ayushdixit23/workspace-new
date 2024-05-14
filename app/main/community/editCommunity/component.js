"use client";
import React, { useEffect, useMemo, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCamera, FaChevronDown, FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { decryptaes } from "@/app/utilsHelper/security";
import { Toaster, toast } from "react-hot-toast";
import {
	useCreateTopicMutation,
	useDeleteTopicMutation,
	useFetchTopicQuery,
	useUpdateComMutation,
	useUpdateTopicMutation,
} from "@/app/redux/apiroutes/community";
import { getData } from "@/app/utilsHelper/Useful";
import Image from "next/image";
import Cookies from "js-cookie";

function page() {
	const s = Cookies.get("comedta")
	let data
	try {
		data = JSON.parse(s);
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}
	const { id } = getData()
	const comidCookie = Cookies.get("cmdyd")
	const search = useSearchParams()
	const istopics = search.get("topics")
	const comid = comidCookie ? decryptaes(comidCookie) : null;

	const [editCommunity, setEditCommunity] = useState({
		title: "",
		desc: "",
		selectedCategory: "",
		type: "",
	})
	const [membercount, setMembercount] = useState("")
	const [topics, setTopics] = useState({
		isOpen: false || istopics,
		topicTitle: "",
		type: "free",
		message: "",
		price: "",
		nature: "post",
		topicidForEdit: null
	})
	const [td, setTd] = useState(false)
	const [tdid, setTdid] = useState(false)
	const [by, setBy] = useState(false);
	const [selectImage, setSelectImage] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [leave, setLeave] = useState(false);
	const router = useRouter();
	const [topicdata, setTopicdata] = useState([]);
	const [loading, setLoading] = useState(false);

	const {
		data: fetchtopic, refetch
	} = useFetchTopicQuery({ id, comid }, { skip: !id || !comid });
	const [updatecom] = useUpdateComMutation();
	const [deleteTopics] = useDeleteTopicMutation();
	const [createTopicByMutation] = useCreateTopicMutation();
	const [editTopicByMutation] = useUpdateTopicMutation();
	const handleImageChange = (e) => {
		setSelectImage(URL.createObjectURL(e.target.files[0]));
		setSelectedImage(e.target.files[0]);
	};
	useEffect(() => {
		setEditCommunity({ ...editCommunity, title: data?.title || "", desc: data?.desc || "", selectedCategory: data?.category || "", type: data?.type || "" })
		setSelectImage(data?.dps)
		setMembercount(data?.memberscount)
	}, [])

	useEffect(() => {
		setTopicdata(fetchtopic?.topics);
	}, [fetchtopic]);

	const EditTopicForServer = async () => {
		try {
			const data = {
				title: topics.topicTitle,
				message: topics.message,
				type: topics.type,
				price: topics.price,
				nature: topics.nature
			};

			const res = await editTopicByMutation({
				id,
				topicid: topics.topicidForEdit,
				data,
			});

			const updatedataoftopic = topicdata.map((d) => {
				return d._id === topics.topicidForEdit ? res.data.updatedTopic : d;
			});
			setTopicdata(updatedataoftopic);
			setTopics({ ...topics, isOpen: false, message: "", topicTitle: "", type: "", price: "", topicidForEdit: null, nature: "post" })
		} catch (err) {
			console.log(err);
		}
	};

	const handleSave = async () => {
		if (topics.topicidForEdit == null) {
			if (topics.topicTitle && topics.message) {
				const data = {
					title: topics.topicTitle,
					message: topics.message,
					type: topics.type,
					price: topics.price,
					nature: topics.nature
				};
				const res = await createTopicByMutation({
					id,
					comid,
					data,
				});

				setTopicdata([...topicdata, res.data.topic]);
				if (res.data.success) {
					setTopics({ ...topics, isOpen: false, message: "", topicTitle: "", type: "", price: "", topicidForEdit: null, nature: "post" })
				}
			}
		} else {
			EditTopicForServer();
		}
	};

	const editkrotopicko = (topicid, title, message, type, price, nature) => {
		setTopics({ ...topics, topicTitle: title, isOpen: true, type: type, message: message, topicidForEdit: topicid, price: price, nature: nature })
	};

	const handleEdit = async () => {
		setLoading(true);
		const formDataToSend = new FormData();
		if (selectedImage) {
			formDataToSend.append("image", selectedImage);
		}
		formDataToSend.append("title", editCommunity.title);
		formDataToSend.append("category", editCommunity.selectedCategory);
		formDataToSend.append("desc", editCommunity.desc);
		formDataToSend.append("type", editCommunity.type);
		try {

			const res = await updatecom({
				id,
				comid,
				data: formDataToSend,
			});

			if (res.data.success) {
				toast.success("Changes Saved!");
				router.refresh()
				await refetch()
				clearCookies();
				router.push("/main/community");
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const handlePopstate = () => {
			clearCookies();
			window.location.href = "/main/community";
		};
		window.history.pushState(null, null, window.location.href);
		window.onpopstate = handlePopstate;
		return () => {
			window.onpopstate = null;
		};
	}, []);

	const clearCookies = () => {
		Cookies.remove("comedta")
		Cookies.remove("cmdyd")

	};

	const popDelete = async (tId) => {
		try {
			setTd(true)
			setTdid(tId)
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTopic = async (tId) => {
		try {
			const data = {
				idtosend: comid,
			};
			const filterData = topicdata.filter((d, i) => {
				return d._id !== tId;
			});
			setTopicdata(filterData);
			const response = await deleteTopics({
				id,
				topicId: tId,
				data,
			});
			setTd(false)

		} catch (err) {
			console.log(err);
		}
	};

	const handleChangePhotoClick = () => {
		document.getElementById("inputTag").click()
	}

	const categories = [
		"Movies & Entertainment", "News", "Pet & Animals", "Gaming", "Career & Education", "Anime & Manga",
		"Humor & Memes", "Family & Relationships", "Sports",
		"Science & Learning", "DIY & Crafts", "Music & Podcasts", "Beauty & Fashion", "Health & Fitness", "Food & Cooking", "Business & Finance",
		"Photography", "Travel & Gadgets", "Pop Culture", "Cars", "Motivation & Self-Help"
	]

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
						? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white dark:bg-[#273142] shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
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
							className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
						>
							No, cancel
						</div>
						<Link
							href="/main/community"
							className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
						>
							Yes, Confirm
						</Link>
					</div>
				</div>
			</div>

			<div
				className={`${td
					? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
					: "-z-50 hidden"
					}`}
			>
				<div
					className={`${td
						? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white dark:bg-[#273142] shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
						: "h-0 w-0 duration-100 text-[0px] hidden"
						}`}
				>
					<div className="font-semibold">Sure you want to delete this Topic?</div>
					<div className="text-[12px]">
						This process cannot be undone.
					</div>
					<div className="flex gap-4 mt-4">
						<div
							onClick={() => setTd(false)}
							className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
						>
							No, cancel
						</div>
						<button
							onClick={() => deleteTopic(tdid)}
							className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
						>
							Yes, Confirm
						</button>
					</div>
				</div>
			</div>

			{/* popup 2 */}
			<div
				onClick={() => setBy(false)}
				className={`${by
					? " pn:max-sm:w-full bg-[#cccccc33] z-50 flex fixed w-screen justify-center items-center pn:max-sm:items-end pn:max-sm:justify-end inset-0 duration-100"
					: "h-0 w-0 duration-100 hidden"
					}`}
			>
				<div
					className={`${by
						? "h-[390px] w-full p-6 dark:bg-[#273142] pn:max-sm:text-sm bg-[#fff]  pn:max-sm:bottom-0 gap-2 flex-wrap sm:w-[550px] shadow-md sm:bg-white pn:max-sm:rounded-b-none rounded-3xl  flex duration-100"
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
					<div className="overflow-auto no-scrollbar pn:max-sm:text-sm h-60 font-semibold bg-[#fff] dark:bg-[#273142] gap-2 flex-wrap w-[100%]  sm:bg-white  flex duration-100">
						{categories.map((c, i) => (
							<div
								onClick={() => {
									setEditCommunity({ ...editCommunity, selectedCategory: c })
									setBy(false);
								}}
								key={i}
								className="p-2 px-4 m-1 border border-[#979797] pn:max-sm:text-sm rounded-xl flex gap-2 hover:bg-[#4880FF] hover:text-[#fff]"
							>
								{c}
							</div>
						))}
					</div>
				</div>
			</div>
			{/* popup 3 */}
			{/* <div
        className={`${topics.isOpen
          ? "h-[80vh] sm:h-[90vh]   pn:max-sm:w-full w-[89%] bg-[#cccccc33] z-50 flex items-center justify-center absolute duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${topics.isOpen
            ? "h-[450px] w-96 bg-[#F9F9F9] fixed px-4 pn:max-sm:bottom-0 py-4 sm:bg-white shadow-md rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="flex justify-between px-4 font-semibold w-full  ">
            <div>Add a topic</div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setTopics({ ...topics, isOpen: false });
              }}
            />
          </div>
          <div className=" mt-4 h-80 ">
            <div className="mt-2">
              <div>Enter topic name</div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={topics.topicTitle}
                onChange={(e) => setTopics({ ...topics, topicTitle: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <div>Welcome message </div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={topics.message}
                onChange={(e) => setTopics({ ...topics, message: e.target.value })}
              />
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex justify-between p-0.5 bg-[#f0f0f0] rounded-full items-center">
                <div
                  onClick={handle}
                  className={`${change === 1
                    ? "bg-white px-8 rounded-full py-2"
                    : "bg-transparent px-8 rounded-full py-2"
                    }`}
                >
                  Free
                </div>
                <div
                  onClick={handl}
                  className={`${change === 2
                    ? "bg-white px-8 rounded-full py-2"
                    : "bg-transparent  px-8 rounded-full py-2"
                    }`}
                >
                  Paid
                </div>
              </div>
            </div>
            <div
              className={`${change == 2
                ? "flex bg-slate-50 h-10 rounded-2xl w-full mt-2 items-center "
                : "hidden"
                }`}
            >
              <input
                className="bg-slate-200 h-10 rounded-2xl w-[70%] pl-2"
                value={topics.price}
                onChange={(e) => setTopics({ ...topics, price: e.target.value })}
                placeholder="add price"
              />
              <div className="flex justify-center w-[30%]">monthly </div>
            </div>
            <div className="flex px-4 text-[12px] mt-2">
              <BsInfoCircle className="m-0.5 w-5" />
              <span>
                Please be aware that covering paid topics does not enable
                monetization Click to know more.
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              handleSave();
              setTopics({ ...topics, isOpen: false });
            }}
            className="w-full rounded-xl py-2 bg-[#002eff] flex justify-center text-white font-semibold"
          >
            Save
          </div>
        </div>

      </div> */}

			<div className={`${topics.isOpen ? "fixed inset-0 w-screen z-50 bg-[#cccccc33] h-screen flex justify-center items-center" : "hidden -z-50"}`}>
				<div className="flex justify-center shadow-md items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] p-3 rounded-xl dark:bg-[#273142] bg-white">
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
							<div className="flex mt-2 flex-col gap-1">
								<div className="text-[#606060] dark:text-[#fff] font-medium">Select type of your Topic</div>
								<div className="flex gap-3 items-center">
									<div onClick={() => setTopics({ ...topics, nature: "post" })} className={`p-2 px-4 ${topics.nature === "post" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>Posts</div>
									<div onClick={() => setTopics({ ...topics, nature: "chat" })} className={`p-2 px-4 ${topics.nature === "chat" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>Chat</div>
								</div>
							</div>
							<div className="flex justify-between items-center ">
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
										{/* <div><FaChevronDown /></div> */}
										{/* <div className="absolute top-8 hidden left-0 shadow-md group-hover:block rounded-xl cursor-pointer dark:bg-[#273142] bg-white w-full">
                      <div className="flex flex-col justify-center items-center">
                        <div className="p-2 px-3 font-medium">Monthly</div>
                        <div className="p-2 px-3 font-medium">Yearly</div>
                      </div>
                    </div> */}
									</div>
								</div>
							</div>}
							<div className="flex justify-center gap-3 items-center">
								<button onClick={() => {
									setTopics({ ...topics, isOpen: false });
								}} className="border-[#979797] border font-bold w-full p-2 rounded-lg">Discard</button>
								<button onClick={() => {
									handleSave();
									setTopics({ ...topics, isOpen: false });
								}} className="bg-[#FFD25E] font-bold w-full p-2 rounded-lg">Done</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 
      <div className="overflow-auto overflow-x-hidden no-scrollbar h-full ">
        <div className=" pt-1 pb-20"> */}

			{/* <div className="flex justify-between p-2 my-2 px-4 items-center ">
            <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
              Edit Community
            </div>
            <div className="flex gap-4 pp:gap-8 items-center">
              <div
                className="font-semibold pn:max-pp:hidden"
                onClick={() => setLeave(true)}
              >
                Discard
              </div>
              <div
                onClick={handleEdit}
                className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
              >
                Save
              </div>
            </div>
          </div> */}


			{/* <div className="bg-white w-full h-12 rounded-t-2xl shadow-md sm:hidden fixed bottom-0 z-30 flex justify-between items-center px-6">
            <div
              className="px-10 py-2 hidden font-semibold ring-2 ring-[#3e3e3e] rounded-2xl"
              onClick={() => setLeave(true)}
            >
              Discard
            </div>
            <div
              onClick={handleEdit}
              className="px-10 py-2 font-semibold ring-2 cursor-pointer ring-[#002eff] bg-[#002EFF] text-white rounded-2xl"
            >
              Save
            </div>
          </div> */}
			{/* <div>
        <div className={`sm:flex bg-[#FAFAFA] justify-center gap-4 pt-10 `}>


          <div className=" w-[100%] flex flex-col sm:items-center">
            <div className="vs:max-sm:px-10 w-[95%] min-w-[250px]">
              <div className="bg-white p-4 w-full rounded-2xl">
                <div className="font-semibold pt-4">Community</div>
                <div className="flex flex-col justify-center gap-4 items-center ">
                  <div className="w-[100px] h-[100px] flex justify-center items-center object-cover overflow-hidden rounded-[34px] mt-2 sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#ebedf3]">
                    {selectImage && (
                      <img
                        src={selectImage}
                        className="w-[100px] h-[100px] rounded-3xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0] container"
                        alt="Selected"
                      />
                    )}
                  </div>
                  <div className=" px-6 rounded-2xl font-semibold">
                    <form>
                      <input
                        id="inputTag"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="inputTag"
                        className="relative z-0 inline-block bg-gradient-to-br text-[#002eff] rounded-md px-2 outline-none whitespace-nowrap select-none cursor-pointer text-sm font-semibold "
                      >
                        {selectImage == "" ? (
                          <div>Set Pic</div>
                        ) : (
                          <div>Change Picture</div>
                        )}
                      </label>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="font-semibold pt-4">Community Name</div>
                  <input
                    className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                    type="text"
                    placeholder="Community Name"
                    value={editCommunity.title}
                    onChange={(e) => setEditCommunity({ ...editCommunity, title: e.target.value })}
                  />
                </div>

                <div className="font-semibold pt-4 flex justify-between ">
                  Community Description
                  <p className="font-normal text-[14px]  ">
                    {editCommunity.desc?.length}/ 500
                  </p>
                </div>
                <textarea
                  className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] w-[100%] no-scrollbar resize-y rounded-[25px] h-48 "
                  type="text"
                  placeholder="Describe the product in few words"

                  value={editCommunity.desc}
                  onChange={(e) => setEditCommunity({ ...editCommunity, desc: e.target.value })}
                  maxLength={500}
                />
                <div className="">
                  <div className="font-semibold pt-4">Categories</div>
                  <div
                    className={`"outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"`}
                    onClick={() => setBy(!by)}
                  >
                    {editCommunity.selectedCategory}
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div className=" w-[100%]  max-h-[900px] flex flex-col sm:items-center">
            <div className="vs:max-sm:px-10 p-4 px-7 pb-8 rounded-2xl bg-white w-[95%] min-w-[250px]">
              <div className="text-xl  font-semibold pb-3">
                Community Topics
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between my-2 items-center">
                  <div className="">Topics Names</div>
                  <div className="">Actions</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="p-3 border-2 border-[#f1f1f1] rounded-xl">
                    All
                  </div>
                  <div className="p-3 border-2 border-[#f1f1f1] rounded-xl">
                    Posts
                  </div>
                  {topicdata
                    ?.filter(
                      (f) =>
                        f?.title.toLowerCase() != "posts" &&
                        f?.title.toLowerCase() != "all"
                    )
                    ?.map((d, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-2 border-[#f1f1f1] rounded-xl items-center p-3"
                      >
                        <div className="">{d?.title}</div>
                        <div className="flex justify-center gap-2 items-center">
                          <div
                            onClick={() => {
                              editkrotopicko(
                                d?._id,
                                d?.title,
                                d?.message,
                                d?.type,
                                d?.price
                              );
                            }}
                            className="cursor-pointer"
                            title="Edit"
                          >
                            <MdEdit size={20} />
                          </div>
                          <div
                            onClick={() => deleteTopic(d?._id)}
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
              <div className="mt-6">
                <button className="flex justify-center gap-2 items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl">
                  <div>
                    <FaPlus />
                  </div>
                  <div onClick={() => setTopics({ ...topics, isOpen: true })}>Add Topic</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
			{/* </div>
      </div> */}

			<div className="grid grid-cols-1 pn:max-sm:text-sm p-3 dark:bg-[#273142] dark:text-white bg-white w-full">
				<div className="flex justify-center sm:max-h-[80vh] sm:overflow-y-scroll sm:no-scrollbar w-full items-center ">
					<div className="sm:w-[85%] w-full md:w-[75%]">
						<div className="flex flex-col justify-center items-center">
							<label
								htmlFor="inputTag"
								className="sm:w-[95px] w-[80px] h-[80px] relative overflow-hidden mb-2 bg-[#ECECEE] items-center justify-center sm:h-[90px] rounded-[30px] border-2 flex flex-col"
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
						<div className="w-full pn:max-sm:text-sm grid sm:grid-cols-2 gap-7">
							<div className="flex flex-col w-full gap-5">
								<div className="flex flex-col gap-1">
									<div className="text-[#606060] text-sm pb-1 dark:text-[#fff] font-semibold">Community Name</div>
									<div>
										<input type="text" className="p-2 bg-[#F4F7FE] dark:bg-[#323d4e] outline-none rounded-xl w-full" placeholder="Community Name"
											value={editCommunity.title}
											onChange={(e) => setEditCommunity({ ...editCommunity, title: e.target.value })} />
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<div className="text-[#606060] text-sm pb-1 dark:text-[#fff] font-semibold">Community Description</div>
									<div className="flex flex-col gap-1">

										<textarea
											className="outline-none p-2 bg-[#F4F7FE] dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-xl min-h-32 max-h-48 "
											type="text"
											placeholder="This is just a simple caption text!"
											value={editCommunity.desc}
											onChange={(e) => setEditCommunity({ ...editCommunity, desc: e.target.value })}
											maxLength={500}
										/>

									</div>
								</div>
								{editCommunity.selectedCategory === "Select a Category" ? <div className="flex flex-col gap-1">
									<div className="text-[#606060] dark:text-[#fff] font-semibold">Categories</div>
									<div
										className={`"outline-none flex justify-center p-2 bg-[#F4F7FE] dark:bg-[#323d4e] items-center rounded-xl w-[100%]"`}
										onClick={() => setBy(!by)}
									>
										{editCommunity.selectedCategory}
									</div>
								</div> :

									<div className="flex flex-col gap-1">
										<div className="text-[#606060] text-sm dark:text-[#fff] pb-1 font-semibold">Categories</div>
										<div className="flex gap-3 items-center">
											<div className="bg-[#4880FF] p-2 px-3.5 rounded-full text-white">{editCommunity.selectedCategory}</div>
											<div onClick={() => setBy(!by)} className="p-2 px-3.5 border-[#4880FF] bg-[#F4F7FE] dark:bg-[#323d4e] rounded-full">Change Category</div>
										</div>
									</div>}

							</div>
							<div className=" w-[100%] max-h-[900px] flex flex-col sm:items-center">
								<div className=" rounded-2xl dark:bg-[#273142] bg-white w-[95%] min-w-[250px]">
									<div className="mb-4 flex flex-col gap-1">
										<div className="text-[#606060] text-sm font-semibold pb-1 dark:text-[#fff] ">Select type of your Community</div>
										<div className="flex gap-3 items-center">
											<div onClick={() => setEditCommunity({ ...editCommunity, type: "public" })} className={`p-2 px-4 ${editCommunity.type === "public" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>Public</div>
											<div onClick={() => setEditCommunity({ ...editCommunity, type: "private" })} className={`p-2 px-4 ${editCommunity.type === "private" ? "bg-blue-600 text-white" : "text-black bg-white border-2 "} rounded-xl text-sm  font-semibold `}>Private</div>
										</div>
									</div>
									<div className="flex flex-col  mb-[10%] sm:mb-0 gap-2">
										<div className="flex justify-between items-center">
											<div className="text-sm text-[#606060] font-semibold">Topics Names</div>
											<div className="text-sm font-semibold text-[#606060]">Actions</div>
										</div>
										<div className="flex flex-col gap-4">
											<div className="p-2 border-2 border-[#f1f1f1] dark:border-[#3d4654] rounded-xl">
												All
											</div>
											<div className="p-2 border-2 border-[#f1f1f1] dark:border-[#3d4654] rounded-xl">
												Posts
											</div>
											{topicdata
												?.filter(
													(f) =>
														f?.title.toLowerCase() != "posts" &&
														f?.title.toLowerCase() != "all"
												)
												?.map((d, i) => (
													<div
														key={i}
														className="flex justify-between border-2 border-[#f1f1f1] dark:border-[#3d4654] rounded-xl items-center p-2"
													>
														<div className="">{d?.title}</div>
														<div className="flex justify-center gap-2 items-center">
															<div
																onClick={() => {
																	editkrotopicko(
																		d?._id,
																		d?.title,
																		d?.message,
																		d?.type,
																		d?.price,
																		d?.nature
																	);
																}}
																className="cursor-pointer"
																title="Edit"
															>
																<MdEdit size={20} />
															</div>
															<div
																onClick={() => popDelete(d?._id)}
																// onClick={() => deleteTopic(d?._id)}
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
									{membercount
										>= 150
										&& <div className="my-6">
											<button onClick={() => setTopics({ ...topics, isOpen: true })} className="flex justify-center gap-2 items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl">
												<div>
													<FaPlus />
												</div>
												<div >Add Topic</div>
											</button>
										</div>}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`fixed flex justify-center pn:max-sm:text-sm items-center ${leave ? "-z-50" : "z-40"} h-16 dark:bg-[#273142] dark:border-t dark:border-[#3d4654] bg-white w-full sm:hidden bottom-0 left-0`}>
					<div className="flex justify-center gap-3 w-full px-3 items-center">
						<div onClick={() => setLeave(true)} className="w-full flex justify-center p-2 border border-[#979797] rounded-lg items-center">Discard</div>
						<div className="w-full flex justify-center p-2 bg-[#4880FF] rounded-lg text-white items-center" onClick={handleEdit}>Update</div>
					</div>
				</div>
				<div className="flex justify-center pn:max-sm:hidden mt-5 items-center">
					<button onClick={handleEdit} className="bg-[#4880FF] text-white p-2 px-16 rounded-lg">Update</button>
				</div>
			</div>
		</div >
	);
}

export default page;
