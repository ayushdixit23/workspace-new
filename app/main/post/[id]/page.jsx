"use client"
import { useDeletePostsMutation, useGetAllPostQuery } from '@/app/redux/apiroutes/community'
import { getData } from '@/app/utilsHelper/Useful'
import { decryptaes } from '@/app/utilsHelper/security'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import CreatePost from '../../community/CreatePost'
import Loader from '@/app/data/Loader'
import NoPost from '@/app/componentsWorkSpace/NoPost'
import { useDispatch } from 'react-redux'
import PostsWeb from '@/app/componentsWorkSpace/PostsWeb'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Cookies from 'js-cookie'
import Hover from '@/app/data/Hover'

const page = () => {
	const path = usePathname()
	const decomid = path.split("/").pop()
	const { id } = getData()
	const comid = decryptaes(decomid)
	const [open, setOpen] = useState(false)
	const [topicId, setTopicId] = useState("")
	const [loading, setLoading] = useState(false)
	const [postid, setPostid] = useState(null)
	const dispatch = useDispatch()
	const { data, refetch, isLoading } = useGetAllPostQuery({ comid }, { skip: !comid })
	const [deletePost] = useDeletePostsMutation()

	useEffect(() => {
		const a = Cookies.get("topic")
		const b = decryptaes(a)
		setTopicId(b)
	}, [])

	const postDeletion = async () => {
		try {
			setLoading(true)
			const res = await deletePost({
				id, postid
			})
			if (res.data.success) {
				setLoading(false)
				toast.success("Post Deleted!")
				await refetch()
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const mergedData = data?.posts?.map((d, i) => ({
		post: d.post,
		dps: d.postdp,
		engrate: d.engrate,
		video: d?.video
	}))

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

	if (isLoading) {
		return <Loader />
	}

	return (
		<>
			{
				open && <CreatePost id={id} topicId={topicId} comid={comid} open={open} setOpen={setOpen} refetch={refetch} />
			}

			<div className={`${open ? "pn:max-sm:hidden " : null}`}>
				<div className="flex px-4 py-2 justify-between dark:text-white items-center">
					<div className=" p-2 text-[22px] text-[#202224] dark:text-white sm:font-semibold  ">

						<Hover text={"Posts"}
							para={"Create Post: Share text, images, videos, or polls to engage your community!"}
							mobile='left-0'

						/>
					</div>
					<div
						onClick={() => { sessionStorage.removeItem("postdata"); setOpen(true) }}
						className="py-2 vs:max-pp:text-[12px] flex justify-center items-center gap-1 border dark:bg-[#3d4654] dark:text-white light:border-[#f1f1f1] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl"
					>
						Create Posts
						<GoPlus />
					</div>
				</div>

				{/* web */}

				<div className='pn:max-sm:hidden bg-transparent h-[73vh] z-0 overflow-auto w-full min-w-full container no-scrollbar '>
					{
						mergedData?.length > 0 ? <div className="bg-white dark:bg-[#273142] overflow-x-scroll no-scrollbar min-w-[1110px] rounded-xl h-full sm:p-2 w-full">

							<table className="w-full text-sm text-left rtl:text-right min-w-full  text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 rounded-xl dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Posts
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Applauses
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Comments
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Shares
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Date Uploaded
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Engagement Rate
										</th>
										<th scope="col" className="text-center px-6 py-3">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{mergedData?.map((d, i) => (
										<PostsWeb open={open} setOpen={setOpen} key={i} setPostid={setPostid} d={d} dispatch={dispatch} postDeletion={postDeletion} userid={id} />
									))}
								</tbody >
							</table>


						</div>
							: <NoPost setOpen={setOpen} />
					}
				</div>


				<div className='sm:hidden min-h-[70vh] z-0 '>
					{
						mergedData?.length > 0 ? <div className="dark:bg-[#273142] dark:text-white bg-white">

							{mergedData?.map((d, i) => (
								<PostsWeb key={i} open={open} setOpen={setOpen} setPostid={setPostid} d={d} dispatch={dispatch} postDeletion={postDeletion} />
							))}
						</div> :
							<NoPost setOpen={setOpen} />
					}

				</div>
			</div >
		</>
	)
}

export default page