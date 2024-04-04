"use client"
import React, { Suspense } from 'react'
import Loader from "@/app/data/Loader";
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
const Component = dynamic(() => import('./comonent'), { ssr: false })

const page = () => {
	return (
		<>
			<Toaster />
			<Suspense fallback={<Loader />}>
				<Component />
			</Suspense>
		</>
	)
}

export default page
