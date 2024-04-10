"use client"
import React, { useEffect, useState } from 'react'
import e2 from "../../assets/image/e2.png"
import Image from 'next/image'
import { IoAdd } from 'react-icons/io5'
import setting from "../../assets/image/setting.png"
import prosite from "../../assets/image/prosite.png"
import topics from "../../assets/image/topics.png"
import product from "../../assets/image/product.png"
import fee from "../../assets/image/fee.png"
import badge from "../../assets/image/badge.png"
import collection from "../../assets/image/collection.png"
import community from "../../assets/image/community.png"
import delivery from "../../assets/image/delivery.png"
import analytics from "../../assets/image/analytics.png"
import { getData } from '@/app/utilsHelper/Useful'
import axios from 'axios'
import useRazorpay from 'react-razorpay'
import Cookies from 'js-cookie'
import { getItemSessionStorage, storeInSessionStorage } from '@/app/utilsHelper/Tokenwrap'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {
	const [bill, setBill] = useState([])
	const [total, setTotal] = useState(null)
	const [tax, setTax] = useState(0)
	const [finalAmount, setFinalAmount] = useState(0)
	const { id, fullname } = getData()
	const [Razorpay] = useRazorpay()
	const sessionId = getItemSessionStorage()
	const router = useRouter()
	const addtoBill = (item, price, image) => {
		try {
			const existingItemIndex = bill.findIndex(billItem => billItem.item === item);

			if (existingItemIndex !== -1) {
				setBill(prev => {
					const updatedBill = [...prev];
					updatedBill[existingItemIndex].quantity += 1; // Increase quantity
					updatedBill[existingItemIndex].price += price; // Update total price
					return updatedBill;
				});
			} else {
				// If the item is not in the bill, add a new entry with quantity 1
				const billtoAdd = {
					item,
					price,
					quantity: 1,
					image,
					itemAdd: true,
				};

				setBill(prev => [...prev, billtoAdd]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const mid = "65e078e33b1ddb512b94dfd5"

	const buyMembership = async () => {

		try {
			if (finalAmount === 0) {
				return
			}
			const res = await axios.post(`https://work.grovyo.xyz/api/v1/membershipbuy/${id}/${mid}`, { amount: `₹${finalAmount}` })
			const membershipId = res.data.memid
			if (res.data.success) {
				let options = {
					"key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
					"amount": finalAmount * 100,
					"currency": "INR",
					"name": "Grovyo",
					"description": `Buying Membership of Custom`,
					"order_id": res?.data?.oid,
					"handler": async function (response) {
						const paymentMethod = response?.method;
						const addProductsItem = bill.find(item => item.item === "Add Products");
						const addtopiclimit = bill.find(item => item.item === "Create Topics");
						const addcommunitylimit = bill.find(item => item.item === "Create Community");
						const addcollectionlimit = bill.find(item => item.item === "Create Collection");
						const data = {
							paymentMethod,
							razorpay_order_id: response?.razorpay_order_id,
							razorpay_payment_id: response?.razorpay_payment_id,
							memid: membershipId,
							razorpay_signature: response?.razorpay_signature,
							status: true,
							isverified: bill.some((item) => item.item === "Trusted Badge" && item.itemAdd === true),
							productlimit: addProductsItem.quantity,
							topiclimit: addtopiclimit.quantity,
							communitylimit: addcommunitylimit.quantity,
							collectionlimit: addcollectionlimit.quantity,
						}
						const resp = await axios.post(`http://localhost:7190/api/v1/customMembership/${id}/${res.data?.order}`, data)

						if (resp.data.success) {

							Cookies.remove(`excktn`)
							Cookies.remove(`frhktn`)
							storeInSessionStorage(resp.data.sessionId);
							Cookies.set(`excktn`, resp.data.access_token)
							Cookies.set(`frhktn`, resp.data.refresh_token)
							router.push("/main/dashboard")
						}
					},
					prefill: {
						email: res?.data?.email || '',
						contact: res?.data?.phone || '',
						name: fullname,
					},
					"theme": {
						"color": "#3399cc"
					}
				};
				let rpay = new Razorpay(options);
				rpay.on('payment.failed', async function (response) {
					const data = {
						razorpay_order_id: response?.razorpay_order_id,
						razorpay_payment_id: response?.razorpay_payment_id,
						razorpay_signature: response?.razorpay_signature,
						status: false,
					}


				})
				rpay.open();
			} else {
				toast.error(res.data.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const addQuantityToBill = (item, amount, price, minValue, maxValue) => {
		setBill((prev) => {
			const existingItemIndex = prev.findIndex(
				(billItem) => billItem.item === item
			);

			if (existingItemIndex !== -1) {

				const updatedBill = [...prev];
				const newQuantity = Math.max(
					minValue,
					Math.min(updatedBill[existingItemIndex].quantity + amount, maxValue)
				);


				const newPrice = Math.max(
					price * newQuantity,
					Math.min(price * newQuantity, price * maxValue)
				);

				// Ensure the new price is not NaN
				if (isNaN(newPrice)) {
					console.error('newPrice is NaN!');
					return updatedBill;
				}

				updatedBill[existingItemIndex].quantity = newQuantity;
				updatedBill[existingItemIndex].price = newPrice;

				return updatedBill;
			} else {
				// If the item is not in the bill, add a new entry with the specified quantity and total price
				const billtoAdd = {
					item,
					price: price * amount, // Ensure price is within the range
					quantity: Math.max(minValue, Math.min(amount, maxValue)), // Ensure quantity is within the range
				};
				return [...prev, billtoAdd];
			}
		});
	};

	useEffect(() => {
		const { total, discountedTotal, discountAmount } = calculateTotal();
		setTotal(total);
		setTax(discountAmount)
		setFinalAmount(discountedTotal)
	}, [bill]);

	const calculateTotal = () => {
		const total = bill.reduce((accumulator, currentItem) => {
			return accumulator + currentItem.price;
		}, 0);

		const discount = 0.18;
		const discountAmount = Math.round(total * discount);
		const discountedTotal = total + discountAmount;

		return {
			total,
			discountAmount,
			discountedTotal,
		};
	};

	const removeItem = (item, price) => {
		setBill(prev => prev.filter(billItem => !(billItem.item === item)));
	};

	return (
		<>
			<Toaster />
			<div className='bg-white w-full md:h-screen flex justify-center items-center dark:bg-[#273142]'>
				<div className='md:w-[90%] w-full grid gap-5  sm:grid-cols-8 p-2 md:grid-cols-7'>
					<div className='sm:col-span-3 md:col-span-2 w-full grid grid-cols-1 gap-4  no-scrollbar overflow-y-scroll max-h-[90vh]'>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={product} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Add Products</div>
									<div className='text-xs'>&#8377;50 /product</div>
								</div>
							</div>
							<div>
								You can easily put more items in your store to give customers more choices.
							</div>

							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Add Products" && item.itemAdd === true) ? < div onClick={() => removeItem("Add Products", 50)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : < div onClick={() => addtoBill("Add Products", 50, <Image src={product} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}
							</div>

							<div>
								{bill.some((item) => item.item === "Add Products" && item.itemAdd === true) && <form className="max-w-xs flex justify-between items-center mx-auto">
									<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
									<div className="relative flex items-center">
										<button onClick={() => addQuantityToBill("Add Products", -1, 50, 1, 5)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
											</svg>
										</button>
										<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={bill.find(item => item.item === "Add Products")?.quantity || 1} required />
										<button onClick={() => addQuantityToBill("Add Products", 1, 50, 1, 5)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
											</svg>
										</button>
									</div>
								</form>}
							</div>
						</div>

						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={fee} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Zero Platform Fee</div>
									<div className='text-xs'>&#8377;208</div>
								</div>
							</div>
							<div>
								List products, offer paid topics, all with zero platform fees.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Zero Platform Fee" && item.itemAdd === true) ? < div onClick={() => removeItem("Zero Platform Fee", 208)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Zero Platform Fee", 208, <Image src={fee} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}

							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={collection} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Collection</div>
									<div className='text-xs'>&#8377;208 /Collection</div>
								</div>
							</div>
							<div>
								Enhance your store by organizing your products into curated collections.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Create Collection" && item.itemAdd === true) ? < div onClick={() => removeItem("Create Collection", 208)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Create Collection", 208, <Image src={collection} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}


							</div>
							<div>
								{bill.some((item) => item.item === "Create Collection" && item.itemAdd === true) && <form className="max-w-xs mx-auto flex justify-between items-center">
									<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
									<div className="relative flex items-center">
										<button onClick={() => addQuantityToBill("Create Collection", -1, 208, 1, 2)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
											</svg>
										</button>
										<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={bill.find(item => item.item === "Create Collection")?.quantity || 1} required />
										<button onClick={() => addQuantityToBill("Create Collection", 1, 208, 1, 2)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
											</svg>
										</button>
									</div>
								</form>
								}
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={setting} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Premier Support</div>
									<div className='text-xs'>&#8377;100</div>
								</div>
							</div>
							<div>
								Connect directly with support engineers to
								diagnose problems via phone, chat, or email.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Premier Support" && item.itemAdd === true) ? < div onClick={() => removeItem("Premier Support", 100)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Premier Support", 100, <Image src={setting} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}

							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={analytics} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Advance Analytics</div>
									<div className='text-xs'>&#8377;300</div>
								</div>
							</div>
							<div>
								Maximize business and community impact through in-depth analytics.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Advance Analytics" && item.itemAdd === true) ? < div onClick={() => removeItem("Advance Analytics", 300)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Advance Analytics", 300, <Image src={analytics} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}


							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={community} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Community</div>
									<div className='text-xs'>&#8377;50 /Community</div>
								</div>
							</div>
							<div>
								Easily create various communities for different interests and preferences.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Create Community" && item.itemAdd === true) ? < div onClick={() => removeItem("Create Community", 50)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Create Community", 50, <Image src={community} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}


							</div>
							<div>
								{bill.some((item) => item.item === "Create Community" && item.itemAdd === true) && <form className="max-w-xs mx-auto flex justify-between items-center">
									<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
									<div className="relative flex items-center">
										<button onClick={() => addQuantityToBill("Create Community", -1, 50, 1, 3)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
											</svg>
										</button>
										<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={bill.find(item => item.item === "Create Community")?.quantity || 1} required />
										<button onClick={() => addQuantityToBill("Create Community", 1, 50, 1, 3)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
											</svg>
										</button>
									</div>
								</form>}
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={topics} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Create Topics</div>
									<div className='text-xs'>&#8377;5/Community</div>
								</div>
							</div>
							<div>
								Create discussion topics, whether paid or free, to suit your community's needs.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Create Topics" && item.itemAdd === true) ? < div onClick={() => removeItem("Create Topics", 5)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Create Topics", 5, <Image src={topics} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}


							</div>
							<div>
								{bill.some((item) => item.item === "Create Topics" && item.itemAdd === true) && <form className="max-w-xs mx-auto flex justify-between items-center">
									<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
									<div className="relative flex items-center">
										<button onClick={() => addQuantityToBill("Create Topics", -1, 5, 1, 3)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
											</svg>
										</button>
										<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={bill.find(item => item.item === "Create Topics")?.quantity || 1} required />
										<button onClick={() => addQuantityToBill("Create Topics", 1, 5, 1, 3)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
											</svg>
										</button>
									</div>
								</form>}
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={badge} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Trusted Badge</div>
									<div className='text-xs'>&#8377;700</div>
								</div>
							</div>
							<div>
								"Gain credibility and trust with our trusted badge, showcasing your reliability and commitment to quality."
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Trusted Badge" && item.itemAdd === true) ? < div onClick={() => removeItem("Trusted Badge", 700)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Trusted Badge", 700, <Image src={badge} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}

							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={delivery} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Deliveries</div>
									<div className='text-xs'>&#8377;7 /delivery</div>
								</div>
							</div>
							<div>
								Get your orders delivered easily and on time.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Deliveries" && item.itemAdd === true) ? < div onClick={() => removeItem("Deliveries", 7)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Deliveries", 7, <Image src={delivery} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}


							</div>
							<div>
								{bill.some((item) => item.item === "Deliveries" && item.itemAdd === true) && <form className="max-w-xs mx-auto flex justify-between items-center">
									<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
									<div className="relative flex items-center">
										<button onClick={() => addQuantityToBill("Deliveries", -1, 7, 1, 1000)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
											</svg>
										</button>
										<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={bill.find(item => item.item === "Deliveries")?.quantity || 1} required />
										<button onClick={() => addQuantityToBill("Deliveries", 1, 7, 1, 1000)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
											<svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
												<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
											</svg>
										</button>
									</div>
								</form>}
							</div>
						</div>
						<div className='flex flex-col gap-3 border p-3 rounded-xl dark:border-white justify-normal'>
							<div className='flex gap-2 items-center'>
								<div>
									<Image src={prosite} alt='image' />
								</div>
								<div className='flex -mt-1 flex-col'>
									<div className='font-semibold'>Prosite</div>
									<div className='text-xs'>&#8377;1000 </div>
								</div>
							</div>
							<div>
								Unlock enhanced features and benefits with ProSite, taking your online experience to the next level.
							</div>
							<div className='flex justify-end items-center gap-2'>
								<div className='text-[#0B5CFF] p-2'>Learn More</div>
								{bill.some((item) => item.item === "Prosite" && item.itemAdd === true) ? < div onClick={() => removeItem("Prosite", 1000)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Remove</div>
								</div> : <div onClick={() => addtoBill("Prosite", 1000, <Image src={prosite} alt='image' />)} className='bg-[#0B5CFF] flex p-2 pn:max-pp:min-w-[100px] sm:min-w-[100px] text-white rounded-full justify-center items-center'>
									<div>Add</div>
									<IoAdd className='text-xl font-semibold' />
								</div>}
							</div>
						</div>
					</div>
					<div className='sm:col-span-5 border-[#F1F1F1] rounded-xl border'>
						<div className='flex flex-col mt-5 gap-2 justify-center items-center'>
							<div>Let's make sure everything is in order</div>
							<div className='text-[27px] font-semibold text-[#5570F1]'>Upgrade to Professional plan</div>
						</div>
						<div className='flex md:flex-row flex-col justify-between gap-3 mt-5 p-4 w-full'>
							<div className='lg:w-[40%] pp:min-w-[350px]'>
								<div className='rounded-lg overflow-hidden'>
									<div className='p-3 bg-[#DEE1E6] text-left text-black font-semibold'>Your Package</div>
									<div className='flex flex-col max-h-[60vh] overflow-y-scroll no-scrollbar bg-white text-black gap-1'>
										{
											bill.map((d, i) => (
												<div key={i} className='flex justify-between px-4 py-2 items-center'>
													<div className='flex justify-center items-center gap-4'>
														<div className='text-sm font-semibold'>{i + 1}</div>
														<div className='flex justify-center items-center gap-2'>
															<div>
																{d.image}
															</div>
															<div className='text-sm font-semibold'>{d?.item}</div>
														</div>
													</div>
													<div className='text-sm font-semibold'>&#8377;{d?.price}</div>
												</div>
											))
										}
									</div>
								</div>
							</div>
							<div className='lg:w-[50%] text-black pp:min-w-[400px]'>
								<div className='bg-[#EBFDFF] rounded-xl p-2'>
									<div className='p-1 pt-4 pb-6 flex flex-col gap-3 font-semibold'>
										<div className='flex justify-between items-center'>
											<div>Billing cycle</div>
											<div>Monthly</div>
										</div>
										<div className='flex justify-between items-center'>
											<div>Subtotal</div>
											<div>&#8377;{total ? total : 0}</div>
										</div>
										<div className='flex justify-between items-center'>
											<div>Tax</div>
											<div>&#8377;{tax}</div>
										</div>
										<div className='flex justify-between items-center'>
											<div>Total</div>
											<div className='text-lg'>&#8377;{finalAmount}</div>
										</div>
									</div>
									<hr />
									<div className='mt-3 p-1 flex flex-col gap-3 text-sm font-semibold'>
										<div>Recurring plans will auto-renew using the payment method you use today. You will be chargedeach period of renewal until you cancel. You can cancel anytime by using our Cancel Subscription.</div>
										<div>By upgrading you agreed with our Terms of Services.</div>
									</div>
								</div>
								<div className='flex justify-end mt-7 items-end w-full'>
									<button onClick={() => buyMembership()} className='bg-[#4880FF] text-white min-w-[250px] p-2 rounded-xl'>Place Order</button>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div >
		</>
	)
}

export default page