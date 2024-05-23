"use client"
import { getData } from '@/app/utilsHelper/Useful'
import Image from 'next/image'
import t1 from "../../assets/image/t1.png"
import t2 from "../../assets/image/t2.png"
import t3 from "../../assets/image/t3.png"
import t4 from "../../assets/image/t4.png"
import t5 from "../../assets/image/t5.png"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useDefaultPrositeMutation, useFetchValueQuery } from '@/app/redux/apiroutes/prosite'
import Hover from '@/app/data/Hover'

const page = () => {
	const { id } = getData()
	const [isChecked, setIsChecked] = useState(false)
	const [defaultProsite] = useDefaultPrositeMutation()
	const { data } = useFetchValueQuery({ id }, { skip: !id })

	const changeprosite = async () => {
		try {
			setIsChecked(!isChecked)
			await defaultProsite({
				id, checked: isChecked
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (data) {
			console.log(data?.useDefaultProsite, "data?.useDefaultProsite", !data?.useDefaultProsite, data)
			setIsChecked(!data?.useDefaultProsite)
		}
	}, [data, id])

	return (
		<>
			<div className='sm:h-[82vh] h-auto overflow-y-scroll no-scrollbar py-5 bg-white sm:rounded-xl *:
			
			dark:bg-[#273142] flex flex-col'>
				<div className='flex justify-between border-b px-4 sm:px-7 dark:border-[#3d4654] items-center w-full'>
					<div className=' pb-2 w-full font-medium text-[#4880FF]'>
						<Hover text={"Prosite Templates"}
							para={"Craft Your Online Presence with Ease: Grovyo Prosites offer a selection of pre-made layouts to jumpstart your prosite creation. These layouts provide a foundation of pre-arranged content blocks (text, images, calls to action, backgrounds) that you can easily customize with your own content and branding.  This allows you to quickly build a professional-looking prosite without needing to start from scratch."}
							w2={"sm:w-[380px]"}

						/>
					</div>
					<div className=' w-full flex justify-end items-center'>
						<div><div className="flex items-center space-x-2">

							<Hover text={"Set Live"}
								para={"Click 'Set Live' to publish your Prosite and showcase your brand or portfolio online!"}
								mobile='-left-[180px]'
							/>

							<Switch checked={isChecked} onCheckedChange={changeprosite} />
						</div>
						</div>
					</div>
				</div>

				<div className='grid pn:max-sm:mb-[3%] grid-cols-1 mt-5 px-5 w-full'>

					{/* <div className='flex justify-center items-center bg-membership bg-cover bg-[#fafafa] dark:bg-[#2] rounded-xl'>
						<div className='flex justify-center text-sm sm:text-base font-semibold items-center pt-4 pb-5 flex-col gap-2'>
							<div className='text-center'>Choose templates that suits you and your profession</div>
							<div>to form your own Prosite</div>
							<div className=''>Profile + Website</div>
						</div>
					</div> */}

					<div className='flex flex-col'>
						<div className='my-2 text-xl font-bold'></div>
						<div className='flex justify-center items-center w-full'>
							<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 w-full'>

								<div className="pm:max-pp:max-w-[275px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black" src={t1} alt="" />
									<div className="p-2 flex pp:flex-row flex-col justify-between items-center px-2">
										<div className='font-semibold text-sm sm:text-base '>Basic layout</div>
										{/* <a target='_blank' href={`http://localhost:3000/lwozxip?id=${encodeURIComponent(id)}&temp=1`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use
										</a> */}
										<a target='_blank' href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(id)}&temp=1`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use
										</a>
									</div>
								</div >

								<div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black" src={t2} alt="" />

									<div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
										<div className='font-semibold text-sm sm:text-base'>Panoramic Layout</div>
										<a target='_blank' href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(id)}&temp=2`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black" src={t3} alt="" />

									<div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
										<div className='font-semibold text-sm sm:text-base'>L-Basic Layout</div>
										<a target='_blank' href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(id)}&temp=3`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black" src={t4} alt="" />

									<div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
										<div className='font-semibold text-sm sm:text-base'>Immersive Layout</div>
										<a target='_blank' href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(id)}&temp=4`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
								<div className="pm:max-pp:max-w-[275px] bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									<Image className="rounded-t-lg pm:max-pp:max-w-[275px] h-[150px] w-full object-contain dark:bg-black" src={t5} alt="" />

									<div className="p-2 flex pp:flex-row flex-col justify-between px-2 items-center">
										<div className='font-semibold text-sm sm:text-base'>3D Layout</div>
										<a target='_blank' href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(id)}&temp=5`} className="inline-flex mt-2 pn:max-pp:w-full justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
											Use

										</a>
									</div>
								</div>
							</div >
						</div >
					</div >
				</div >
			</div >
		</>
	)
}

export default page