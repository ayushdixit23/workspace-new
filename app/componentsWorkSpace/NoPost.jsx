"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NoPost = ({ setOpen, id }) => {
  const path = usePathname()
  const router = useRouter()
  const handleChange = () => {
    try {
      if (path.startsWith("/main/post")) {
        setOpen(true)
      } else {
        router.push(`/main/post/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="bg-white dark:text-white dark:border-2 dark:border-[#313d4f] dark:bg-[#273142] rounded-xl my-2 h-[300px]">
        <div className="sm:p-5 p-3 flex justify-center gap-3 h-full items-center flex-col">
          <div className="text-2xl text-[#1554F6] font-semibold">
            No posts yet
          </div>
          <div className="pn:max-sm:text-center">
            Sharing about a life update is not a bad idea.
          </div>
          <div onClick={handleChange} className="bg-[#1554F6] text-white p-2 px-4 rounded-lg text-sm">
            + Start Post
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPost;
