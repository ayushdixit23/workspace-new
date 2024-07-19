"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaToggleOn } from "react-icons/fa";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";
import { GrUploadOption } from "react-icons/gr";
import Image from "next/image";
import {
  useCreatePostMutation,
  useEditPostsMutation,
} from "@/app/redux/apiroutes/community";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatePost = ({ id, comid, open, topicId, setOpen, refetch }) => {
  const [post, setPost] = useState({
    title: "",
    desc: "",
    tags: [],
    image: [],
    video: [],
    sampletags: "",
  });
  const posturl = "https://dt46iilh1kepb.cloudfront.net/";
  const [postid, setPostid] = useState("");
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [thumbnail, setThumbnail] = useState(false);
  const [uiThumbnail, setUiThumbnail] = useState(false);
  const [postAnything] = useCreatePostMutation();
  const [editpost] = useEditPostsMutation();
  const [thumbnailImage, setThumbnailImage] = useState("");

  const savePost = async () => {
    if (post.image.length === 0 && !thumbnailImage) {
      toast.error("Enter required details");
      console.log(post, "post");
      return;
    }
    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", post.title);
      data.append("desc", post.desc);
      data.append("tags", post.tags);
      data.append("topicId", topicId);
      data.append("thumbnail", thumbnail);
      data.append("thumbnailImage", thumbnailImage);
      post.image.forEach((d) => {
        data.append("image", d);
      });
      post.video.forEach((d) => {
        data.append("video", d);
      });
      const res = await postAnything({
        id,
        comid,
        data,
      });
      if (res.data.success) {
        toast.success("Post Created!");
      }
      await refetch();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    const files = e.target.files;
    const newMedia = Array.from(files);
    const maxSlots = 10;

    if (
      post.image.length == 0 &&
      post.video.length == 0 &&
      e.target.files[0].type.startsWith("video")
    ) {
      setUiThumbnail(true);
    }

    setThumbnail(false);

    setPost((prevPost) => {
      const combinedMedia = [...prevPost.image, ...prevPost.video, ...newMedia];
      const media = combinedMedia.slice(0, maxSlots);

      const existingVideos = prevPost.video.filter(
        (video) => typeof video === "string" && video.startsWith(posturl)
      );
      const existingImages = prevPost.image.filter(
        (image) => typeof image === "string" && image.startsWith(posturl)
      );

      return {
        ...prevPost,
        image: [
          ...existingImages,
          ...media
            .filter((file) => file.type && file.type.startsWith("image/"))
            .map((file) => file),
        ],
        video: [
          ...existingVideos,
          ...media
            .filter((file) => file.type && file.type.startsWith("video/"))
            .map((file) => file),
        ],
      };
    });
  };

  const handleUpload = (e) => {
    if (
      post.image.length == 0 &&
      post.video.length == 1 &&
      e.target.files[0].type.startsWith("image")
    ) {
      handleThumbnail(e);
    } else if (
      post.image.length == 0 &&
      post.video.length == 1 &&
      e.target.files[0].type.startsWith("video")
    ) {
      toast.error("Upload Thumbnail for video!");
      return;
    } else {
      handleImage(e);
    }
  };

  const handleThumbnail = (e) => {
    try {
      setThumbnail(true);
      const image = e.target.files[0];
      setThumbnailImage(image);
      setUiThumbnail(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagsRemove = (indexToRemove) => {
    setPost({
      ...post,
      tags: [...post.tags.filter((_, i) => i !== indexToRemove)],
    });
  };

  // const handleMediaRemove = (indexToRemove, media) => {
  // 	if (post.video.length == 1 || post.video.length == 0) {
  // 		setUiThumbnail(false)
  // 		setPost({ ...post, image: [...post.image, thumbnailImage] })
  // 		setThumbnailImage("")
  // 	}
  // 	setPost({ ...post, [media]: [...post[media].filter((_, i) => i !== indexToRemove)] })
  // };

  const handleMediaRemove = (indexToRemove, media) => {
    if (post.video.length === 1 || post.video.length === 0) {
      setUiThumbnail(false);
      setThumbnailImage("");
      setPost((prevPost) => {
        // Copy the current state of post
        let updatedPost = { ...prevPost };

        // If thumbnailImage exists, move it to post.image array
        if (thumbnailImage) {
          updatedPost.image.push(thumbnailImage);
        }

        // Remove the media item at indexToRemove from the specified media array
        updatedPost[media] = prevPost[media].filter(
          (_, i) => i !== indexToRemove
        );

        return updatedPost;
      });
    } else {
      // If there are more than one video, simply remove the item from the specified media array
      setPost((prevPost) => ({
        ...prevPost,
        [media]: prevPost[media].filter((_, i) => i !== indexToRemove),
      }));
    }
  };

  const editPosts = async () => {
    if (post.image.length === 0 && !thumbnailImage) {
      toast.error("Enter required details");

      return;
    }
    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", post.title);
      data.append("desc", post.desc);
      data.append("tags", post.tags);
      data.append("thumbnail", thumbnail);
      data.append("thumbnailImage", thumbnailImage);
      post.image.forEach((d) => {
        data.append("image", d);
      });
      post.video.forEach((d) => {
        data.append("video", d);
      });
      const res = await editpost({
        id,
        postid,
        data,
      });
      if (res.data.success) {
        toast.success("Changes Saved!");
      }
      await refetch();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const saveOrEditPost = async () => {
    if (edit) {
      editPosts();
    } else {
      await savePost();
    }
  };

  useEffect(() => {
    const a = sessionStorage.getItem("postdata");
    const b = JSON.parse(a);
    if (b) {
      setEditData(b);
    }
  }, []);

  useEffect(() => {
    if (editData) {
      setEdit(true);
      setPostid(editData.id);
      setPost({
        ...post,
        title: editData.title,
        tags: editData.tags[0] ? editData.tags[0].split(",") : [],
        desc: editData.desc,
        video: editData.post
          .filter((d) => d?.type?.startsWith("video/"))
          .map((d) => posturl + d.content),

        image: editData.post
          .filter((d) => d?.type?.startsWith("image/"))
          .map((d) => posturl + d.content),
      });

      if (editData.post[0].thumbnail) {
        setThumbnail(true);
        setThumbnailImage(posturl + editData.post[0].thumbnail);
      }
    }
  }, [editData]);

  useEffect(() => {
    if (post.video.length === 1 && post.image.length === 0) {
      setUiThumbnail(true);
    }
  }, [post.video, post.image]);

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
    <>
      <Toaster />
      <div
        className={`${
          open
            ? "sm:fixed sm:inset-0 w-screen sm:p-2 z-50 bg-[#cccccc33] sm:h-screen flex justify-center items-center"
            : "hidden -z-50"
        }`}
      >
        <div className="flex flex-col justify-center sm:mb-0 mb-[10%] shadow-md items-center p-3 sm:rounded-xl w-full sm:max-w-[90%] md:max-w-[80%] dark:bg-[#273142] bg-white">
          <div className="flex justify-between w-full items-center p-2">
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => {
                  setOpen(false), sessionStorage.removeItem("postdata");
                }}
                className="cursor-pointer"
              >
                <div>
                  <MdArrowBack className="text-2xl text-[#A5BEFE]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="pp:text-xl font-semibold">Post On Grovyo</div>
                <div className="pn:max-pp:hidden">
                  You can add up to 4 images or videos.
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              {/* <div className='font-medium p-2 pn:max-pp:hidden px-7 rounded-lg'>Preview</div> */}
              <div
                onClick={saveOrEditPost}
                className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-lg"
              >
                Publish
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 w-full gap-5 p-3">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full">
                {uiThumbnail ? (
                  <label
                    htmlFor="postUpload"
                    className="w-full h-[220px] cursor-pointer shadow-md rounded-lg"
                  >
                    <div className="h-[220px] dark:border-[#fff] w-full border p-2 rounded-lg flex flex-col justify-center items-center">
                      <div className="p-5 bg-[#F0F4FF] rounded-full">
                        <GrUploadOption className="text-4xl text-[#379AE6] font-thin" />
                      </div>

                      <div className="text-center mt-2 flex justify-center items-center flex-col">
                        <div className="font-medium">
                          <span className="text-[#379AE6]">
                            Upload Thumbnail
                          </span>{" "}
                          for Video.
                        </div>
                        <div className="text-sm text-[#6F7787]">
                          Your ideas will be private until you publish them.
                        </div>
                      </div>
                    </div>
                  </label>
                ) : thumbnailImage ? (
                  <div className="h-[220px] dark:border-[#fff] w-full border p-2 rounded-lg flex flex-col justify-center items-center">
                    <div className="p-5 bg-[#F0F4FF] rounded-full">
                      <FaCheck className=" text-xl text-green-600" />
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="postUpload"
                    className="w-full h-[220px] cursor-pointer shadow-md rounded-lg"
                  >
                    <div className="h-[220px] dark:border-[#fff] w-full border p-2 rounded-lg flex flex-col justify-center items-center">
                      <div className="p-5 bg-[#F0F4FF] rounded-full">
                        <GrUploadOption className="text-4xl text-[#379AE6] font-thin" />
                      </div>
                      <div className="text-center mt-2 flex justify-center items-center flex-col">
                        <div className="font-medium">
                          <span className="text-[#379AE6]">
                            Click to choose file
                          </span>{" "}
                          or drag and drop.
                        </div>
                        <div className="text-sm text-[#6F7787]">
                          Your ideas will be private until you publish them.
                        </div>
                      </div>
                    </div>
                  </label>
                )}
                <input
                  accept="image/*, video/*"
                  name="image"
                  onChange={handleUpload}
                  type="file"
                  id="postUpload"
                  className="hidden w-full"
                />
              </div>
              <div className="text-sm text-[#6F7787]">
                We recommend high-quality .jpg, .png files less than 20MB or
                .mp4 files 100MB.
              </div>
              {(post.image.length || post.video.length) > 0 && (
                <>
                  <div className="flex items-center flex-wrap gap-2">
                    {post.video.map((d, i) => (
                      <div key={i} className="relative w-[100px] h-[100px]">
                        <div className="w-[100px] border h-[100px] overflow-hidden flex justify-center rounded-lg  items-center font-semibold text-xl">
                          <video
                            src={
                              typeof d === "string" ? d : URL.createObjectURL(d)
                            }
                            className="w-full h-full object-cover"
                          ></video>
                        </div>
                        <div
                          onClick={() => handleMediaRemove(i, "video")}
                          className="absolute cursor-pointer top-0 right-0 p-1"
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                    {post.image.map((d, i) => (
                      <div key={i} className="relative w-[100px] h-[100px]">
                        <img
                          src={
                            typeof d === "string" ? d : URL.createObjectURL(d)
                          }
                          width={100}
                          height={100}
                          alt="image"
                          className="rounded-lg w-[100px] h-[100px]"
                        />

                        <div
                          onClick={() => handleMediaRemove(i, "image")}
                          className="absolute cursor-pointer top-0 right-0 p-1"
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                    {thumbnailImage && (
                      <div className="relative w-[100px] h-[100px]">
                        <img
                          src={
                            typeof thumbnailImage === "string"
                              ? thumbnailImage
                              : URL.createObjectURL(thumbnailImage)
                          }
                          className="rounded-lg w-full h-full"
                        />
                        <div
                          onClick={() => {
                            setThumbnailImage("");
                            setUiThumbnail(true);
                          }}
                          className="absolute cursor-pointer top-0 right-0 p-1"
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    )}
                  </div>
                  {!thumbnail && (
                    <div>
                      {Number(post.image.length) + Number(post.video.length)}/4
                      files uploaded
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-1">
                <div>Title</div>
                <div>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                    className="p-1.5 px-3 bg-[#FAFAFA] dark:bg-[#323d4e] outline-none rounded-lg w-full"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Description</div>
                <div>
                  <textarea
                    className="outline-none p-2 bg-[#FAFAFA] dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-lg min-h-32 max-h-48 "
                    type="text"
                    value={post.desc}
                    onChange={(e) => setPost({ ...post, desc: e.target.value })}
                    placeholder="Describe the Post in few words"
                    maxLength={500}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Add Hashtags</div>
                <div className="w-full bg-[#FAFAFA] dark:bg-[#323d4e] rounded-lg flex justify-center items-center">
                  <input
                    value={post.sampletags}
                    onChange={(e) =>
                      setPost({ ...post, sampletags: e.target.value })
                    }
                    type="text"
                    className="p-1.5 px-3 bg-transparent outline-none rounded-lg w-full"
                    placeholder="Enter Hastags"
                  />
                  <button
                    onClick={() => {
                      if (!post.sampletags) {
                        return;
                      }
                      setPost({
                        ...post,
                        tags: [...post.tags, post.sampletags],
                        sampletags: "",
                      });
                    }}
                    className="flex justify-center items-center p-2 rounded-r-lg text-[#2461FD] dark:bg-[#3d4654] dark:text-white bg-[#F0F4FF]"
                  >
                    <div>
                      <MdAdd />
                    </div>
                    <div>Add</div>
                  </button>
                </div>
                <div className="flex items-center pt-2 flex-wrap gap-2">
                  {post.tags.length > 0 &&
                    post.tags.map((d, g) => (
                      <div
                        key={g}
                        className="bg-[#FDF8F1] flex justify-center items-center gap-2 text-[#E7A034] p-1 rounded-full px-4"
                      >
                        <div>{d}</div>
                        <div onClick={() => handleTagsRemove(g)}>
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* <div className='flex items-center gap-1'>
								<div className='text-2xl'><FaToggleOn /></div>
								<div>Allow people to comment</div>
							</div> */}
              {/* <div className='h-1 w-full border-t mt-2 border-black'></div>
							<div className='flex justify-between items-center'>
								<div className='text-lg font-medium'>Advanced options</div>
								<div><SlArrowRight /></div>
							</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

{
  /* <div className='h-[220px] dark:border-[#fff] w-full border p-2 rounded-lg flex flex-col justify-center items-center'>
<div className='p-5 bg-[#F0F4FF] rounded-full'>
	<GrUploadOption className='text-4xl text-[#379AE6] font-thin' />
</div>

<div className='text-center mt-2 flex justify-center items-center flex-col'>
	<div className='font-medium'><span className='text-[#379AE6]'>Click to choose file</span> or drag and drop.</div>
	<div className='text-sm text-[#6F7787]'>Your ideas will be private until you publish them.</div>
</div>
</div> */
}

{
  /* <div className='h-[220px] dark:border-[#fff] w-full border p-2 rounded-lg flex flex-col justify-center items-center'>
	<div className='p-5 bg-[#F0F4FF] rounded-full'>
		<FaCheck className=" text-xl text-green-600" />
	</div>

</div> */
}
