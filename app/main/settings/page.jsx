"use client";
import { ModeToggle } from "@/app/componentsWorkSpace/ModeToggle";
import Loader from "@/app/data/Loader";
import {
  useGetProfileQuery,
  usePostProfileMutation,
} from "@/app/redux/apiroutes/userLoginAndSetting";
import { storeInSessionStorage } from "@/app/utilsHelper/Tokenwrap";
import { getData } from "@/app/utilsHelper/Useful";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCamera, FaPen } from "react-icons/fa";
import { MdOutlineLogout, MdVerified } from "react-icons/md";
import { sendData } from "@/app/redux/slice/userData";
import { useDispatch } from "react-redux";

const page = () => {
  const { id, memberships } = getData();
  const [profileDetails] = usePostProfileMutation();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    fullname: "",
    username: "",
    date: "",
    image: "",
    email: "",
    phone: "",
    bio: "",
  });
  const { data, isLoading } = useGetProfileQuery({ id: id }, { skip: !id });

  const formatDatetime = (datetimeString) => {
    const datetimeObject = new Date(datetimeString);
    return (
      ("0" + datetimeObject.getDate()).slice(-2) +
      "/" +
      ("0" + (datetimeObject.getMonth() + 1)).slice(-2) +
      "/" +
      datetimeObject.getFullYear()
    );
  };

  const formatDatetimereverse = (datetimeString) => {
    const date = datetimeString?.split("/");
    const revrsedDate = date?.reverse();
    const year = revrsedDate?.[0];
    const month = revrsedDate?.[1];
    const day = revrsedDate?.[2];
    return `${year}-${month}-${day}`;
  };

  const sendDetails = async (e) => {
    e.preventDefault();
    const stringDate = formatDatetime(profile.date);
    try {
      setLoading2(true);
      const data = new FormData();
      data.append("name", profile.fullname);
      data.append("phone", profile.phone);
      data.append("email", profile.email);
      data.append("username", profile.username);
      data.append("date", stringDate);
      data.append("image", profile.image);
      data.append("bio", profile.bio);

      const response = await profileDetails({
        id: id,
        data: data,
      });
      if (response.data?.success) {
        await resetCookies(response.data);
        router.refresh();
        setLoading2(false);
        toast.success("Changes Saved!");
      } else {
        toast.error(response.error.message);
      }
    } catch (e) {
      setLoading2(false);
      console.log(e);
    } finally {
      setLoading2(false);
    }
  };

  const resetCookies = async (data) => {
    try {

      // localStorage.removeItem(`excktn`);
      // localStorage.removeItem(`frhktn`);

      Cookies.remove("excktn")
      Cookies.remove(`frhktn`);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set(`excktn`, data.access_token, { expires: expirationDate });
      Cookies.set(`frhktn`, data.refresh_token, { expires: expirationDate });

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    setProfile({
      ...profile,
      fullname: data?.data?.name,
      phone: data?.data?.phone == "91" ? "" : data?.data?.phone?.substring(2),
      email: data?.data?.email,
      username: data?.data?.username,
      image: data?.data.image,
      date: formatDatetimereverse(data?.data.date.toString()),
      bio: data?.data.bio,
    });
    setLoading(false);
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({
      ...profile,
      image: file,
    });
  };

  const logout = () => {
    try {

      Cookies.remove(`excktn`);
      Cookies.remove(`frhktn`);
      setOpen(false);
      router.push("/login");
      setTimeout(() => { dispatch(sendData("")) }, 2500)
    } catch (error) {
      console.log(error);
    }
  };

  const isProfileChanged = () => {
    return (
      profile.fullname !== data?.data?.name ||
      profile.phone !== data?.data?.phone ||
      profile.email !== data?.data?.email ||
      profile.username !== data?.data?.username ||
      profile.image !== data?.data.image ||
      profile.date !== formatDatetimereverse(data?.data.date?.toString()) ||
      profile.bio !== data?.data.bio
    );
  };

  const isProfileChangedAnswer = isProfileChanged();

  if (isLoading || loading) {
    return <Loader />;
  }

  if (loading2) {
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
    <>
      <div
        className={`${open
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "hidden -z-50"
          }`}
      >
        <div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] lg:w-[30%] rounded-xl p-4 dark:bg-[#273142] bg-white">
          <div className="flex flex-col flex-grow gap-8 mt-2 justify-center items-center w-full">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-2xl font-semibold">Are You Sure?</div>
              <div className="text-center dark:text-white text-[#667085]">
                Are you sure you want to log out?
              </div>
            </div>

            <div className="flex justify-center w-full gap-3 items-center">
              <button
                onClick={() => setOpen(false)}
                className="w-full dark:border-[#3d4654] border-2 p-2 px-5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="md:h-[83vh] flex flex-1 flex-col dark:bg-[#273142] h-full sm:rounded-2xl bg-white">
        <div className="flex justify-between border-b px-2 sm:px-7 py-2 dark:border-[#3d4654] items-center w-full">
          <div className=" w-full font-medium text-[#4880FF]">Edit Profile</div>
          <div className="flex justify-end items-center gap-3 w-full flex-grow">
            <div className="flex justify-center items-center gap-2">
              <div
                className="flex  px-2  justify-center  
           items-center"
              >
                <ModeToggle />
              </div>

              <MdOutlineLogout onClick={() => setOpen(true)} className="text-2xl hidden cursor-pointer sm:block text-red-800" />
            </div>


            {isProfileChangedAnswer ? (
              <button
                onClick={(e) => sendDetails(e)}
                className="bg-[#5570F1] p-2 py-2 vs:max-pp:text-[14px] flex justify-center items-center gap-1 px-4 sm:px-5 font-medium rounded-2xl text-white"
              >
                Save
              </button>
            ) : (
              <button
                disabled
                className="bg-[#a1a8ce] p-2 py-2 vs:max-pp:text-[14px] flex justify-center items-center gap-1 px-4 sm:px-5 font-medium rounded-2xl text-white"
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="grid sm:max-md:grid-cols-4 md:grid-cols-8 lg:grid-cols-7 gap-6 p-2 sm:p-5 w-[95%] h-full">
            <div className="md:col-span-2 sm:max-md:col-span-4 lg:col-span-1 pt-5">
              <div className="flex justify-center items-center">
                {data?.data.image ? (
                  <label
                    htmlFor="settings"
                    className="relative light:border max-h-[130px] sm:z-30 rounded-[30px] max-w-[130px]"
                  >
                    <img
                      className="w-full h-full object-cover min-h-[130px] min-w-[130px] bg-cover rounded-[30px] max-h-[130px] max-w-[130px]"
                      src={
                        typeof profile.image === "string"
                          ? data?.data.image
                          : profile.image
                            ? URL.createObjectURL(profile.image)
                            : ""
                      }
                      alt=""
                    />
                    <div className="absolute -bottom-1 right-1">
                      <div
                        htmlFor="settings"
                        className="w-9 h-9 cursor-pointer text-white flex justify-center items-center rounded-full bg-[#5570F1] "
                      >
                        <FaPen />
                      </div>
                    </div>

                    <input
                      id="settings"
                      name="image"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <>
                    <label
                      htmlFor="settings"
                      className="w-[130px] relative mb-2 dark:bg-[#323d4e] bg-[#ECECEE] items-center justify-center h-[130px] rounded-[30px] light:border-2 flex flex-col"
                    >
                      {!profile.image ? (
                        <div className=" w-full h-full flex justify-center dark:bg-[#323d4e] bg-[#ECECEE] items-center rounded-[30px]">
                          <div className="flex justify-center flex-col items-center">
                            <FaCamera className="text-2xl" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            className="w-full h-full object-cover bg-cover rounded-[30px] max-h-[130px] max-w-[130px]"
                            src={URL.createObjectURL(profile.image)}
                            alt=""
                          />
                          <div className="absolute -bottom-1 right-1">
                            <div
                              htmlFor="settings"
                              className="w-9 h-9 z-30 cursor-pointer text-white flex justify-center items-center rounded-full bg-[#5570F1] "
                            >
                              <FaPen />
                            </div>
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      id="settings"
                      name="image"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex lg:pl-3 flex-col gap-4 md:col-span-3 sm:max-md:col-span-2 lg:col-span-3">
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">Your Name</div>
                <div className="flex justify-center items-center dark:bg-[#323d4e] p-1.5 px-3  rounded-xl dark:border-none border w-full">
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfile({ ...profile, fullname: e.target.value })
                    }
                    value={profile.fullname}
                    className="w-full outline-none rounded-xl bg-transparent placeholder:text-sm  placeholder:text-[#718EBF] "
                    placeholder="Charlene Reed"
                  />
                  {memberships !== "Free" && <Link href={"/membership"} className="flex justify-center text-sm font-semibold items-center">
                    {/* <MdVerified className="text-blue-700 text-[20px] " /> */}
                    Verified
                  </Link>}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">Email</div>
                <input
                  type="email"
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  value={profile.email}
                  className="w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border"
                  placeholder="charlenereed@gmail.com  "
                />
              </div>
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">Date of Birth</div>
                <input
                  type="date"
                  onChange={(e) =>
                    setProfile({ ...profile, date: e.target.value })
                  }
                  value={profile.date}
                  className="w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border"
                  placeholder="25 January 1990"
                />
              </div>
            </div>
            <div className="w-full lg:pl-3 flex flex-col gap-4 md:col-span-3 sm:max-md:col-span-2 lg:col-span-3">
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">User Name</div>
                <input
                  type="text"
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  value={profile.username}
                  className="w-full outline-none rounded-xl placeholder:text-sm  placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border"
                  placeholder="@charlenereed"
                />
              </div>
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">Mobile Number</div>
                <div className="flex items-center w-full rounded-xl overflow-hidden dark:bg-[#323d4e] dark:border-none border">
                  <div className="border-r p-2 dark:border-[#3d4654] flex justify-center items-center">
                    +91
                  </div>
                  <input
                    type="tel"
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    value={profile.phone}
                    className="w-full outline-none placeholder:text-sm dark:bg-[#323d4e] placeholder:text-[#718EBF] p-1.5 px-3 "
                    placeholder=" "
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 sm:max-w-[450px]">
                <div className="w-full text-sm">Bio</div>
                <textarea
                  type="text"
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  value={profile.bio}
                  className="w-full outline-none rounded-xl placeholder:text-sm min-h-[50px] max-h-[200px] placeholder:text-[#718EBF] p-1.5 px-3 dark:bg-[#323d4e] dark:border-none border"
                  placeholder="Enter Your Bio"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center sm:items-end sm:hidden w-full sm:w-[85%] mt-2 sm:mb-3 mb-[10%] gap-2">
          <div
            className="h-full text-white bg-red-600 rounded-2xl pn:max-sm:w-[90%] py-2 sm:px-6 flex justify-center items-center"
            onClick={() => setOpen(true)}
          >
            <MdOutlineLogout className="text-2xl" />
            <div>Log Out</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
