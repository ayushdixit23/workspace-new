"use client"
import { useEffect, useState } from "react";
import { getData } from "../utilsHelper/Useful";
import axios from "axios"
import useRazorpay from "react-razorpay";
import { useMemfinalizeMutation } from "../redux/apiroutes/payment";
import { useRouter } from "next/navigation";
import { getItemSessionStorage, storeInSessionStorage } from "../utilsHelper/Tokenwrap";
import toast, { Toaster } from "react-hot-toast";
import { WiStars } from "react-icons/wi";
// import Cookies from "js-cookie";


const Sample5 = () => {
	const [monthprice, setMonthPrice] = useState(true);
	const [Razorpay] = useRazorpay()
	const { id, fullname } = getData()
	const [popup, setPopup] = useState(true)
	const sessionId = getItemSessionStorage()
	const [ai, setAi] = useState({
		free: "",
		pro: "",
		premium: ""
	})
	const router = useRouter()

	const [membershipFinalise] = useMemfinalizeMutation()
	const pricingData = [
		{
			mainTitle: "Compare plans & features",
			"Product Listings": "Product Listings",
			"Platform  Fees": "Platform  Fees",
			titleBadge: "Badge",
			Badges: "Badge",
			"Create Collections": "Create Collections",
			"Product Review Time": "Product Review Time",
			"Create Community": "Create Community",
			"Analytics and Reports": "Analytics and Reports",
			"Export Reports": "Export Reports",
			"Discounts and Promotions": "Discounts and Promotions",
			titleRow1: "Store",
			"Create Topics (free/paid)": "Create Topics (free/paid)",
			"Analytics and reports for Community": "Analytics and reports",
			"Platform Fees (only for paid topics)": "Platform Fees (only for paid topics)",
			titleRow5: "Community",
			"Members Recognition": "Members Recognition",
			titleRow9: "Deliveries",
			"Deliveries (all over the city)": "Deliveries (all over the city)",
			"Delivery Options (all over the country)": "Delivery Options (all over the country)",
			"Shipping Discounts": "Shipping Discounts",
			"Express Delivery": "Express Delivery",
			"Animated intro": "Animated",
			titleRow13: "Prosite",
			"Responsive Templates": "Responsive Templates",
			"Images": "Illustration",
			"Backgrounds": "Backgrounds",
			"Fonts": "Fonts",
			"Uploads": "Upload Images",
			"Templates": "Templates",
			"Color Palettes": "Color Palettes"
			// "Quick Suggestion": "Quick Suggestion",
			// titleRow17: "AI Support",
			// "Thumbnail Generator": "Thumbnail Generator",
			// "Description generator": "Description generator",
			// "Keyword Suggestions": "Keyword Suggestions",
			// "Contact Support": "Contact Support"
		},
		{
			mainTitle: "Free",
			price: {
				month: "₹0",
				year: "₹0",
			},
			mid: process.env.NEXT_PUBLIC_FREE,
			infoNote: "Basic features for up to 10 employees with everything you need.",
			"Product Listings": "Up-to 5 Products",
			"Analytics and Reports": "Basic analytics",
			"Badges": "Not Available",
			"Platform  Fees": "10% per transaction",
			"Create Collections": "1",
			"Product Review Time": "24 Hrs",
			"Create Topics (free/paid)": "Upto 2 topics",
			"Discounts and Promotions": "Not available",
			"Platform Fees (only for paid topics)": "10% per transaction",
			"Create Community": "Upto 2 communities",
			"Analytics and reports for Community":
				"Basic analytics",
			"Export Reports": true,
			"Members Recognition": "Not available",
			"Deliveries (all over the city)": "10 Deliveries for free ",
			"Delivery Options (all over the country)": "Upto 5 deliveries",
			"Shipping Discounts": "Not available",
			"Express Delivery": "Not available",
			"Responsive Templates": "Limited selection of templates",
			"Animated intro": "Not available",
			"Images": "access upto 70+ illustration",
			"Backgrounds": "access upto 100+ backgrounds",
			"Fonts": "access upto 10+ free fonts",
			"Uploads": "Upload upto 10 images",
			"Templates": "access upto 5 templates",
			"Color Palettes": "access upto 10+ styles palettes"
			// "Quick Suggestion": "Limited selection of templates",
			// "Thumbnail Generator": "Not available",
			// "Description generator": "Not available",
			// "Keyword Suggestions": "Not available",
			// "Contact Support": "Basic Support"
		},
		{
			mainTitle: "Professional",
			popular: true,
			price: {
				month: `₹499`,
				year: `₹5390`,
			},
			mid: process.env.NEXT_PUBLIC_PLUS,
			"Badges": "Available",
			infoNote:
				"Advanced features and reporting better workflows and automation.",
			"Product Listings": "Upto 10 products (one time)",
			"Platform  Fees": "1% per transaaction",
			"Create Collections": "Upto 3 collections (one time)",
			"Create Topics (free/paid)": "Upto 5 topics (one time)",
			"Product Review Time": "1 hrs ",
			"Discounts and Promotions": "Create and manage discounts and promotions",
			"Create Community": "Upto 5 communities (one time)",
			"Analytics and Reports": "Advanced analytics",
			"Platform Fees (only for paid topics)": "1% per transaction",
			"Analytics and reports for Community": "Advanced analytics",
			"Images": "access upto 5k+ illustration",
			"Backgrounds": "access upto 1k+ backgrounds",
			"Fonts": "access upto 100+ fonts",
			"Uploads": "Upload upto 50 images",
			"Templates": "access upto 15 templates",
			"Color Palettes": "access upto 100+ styles palettes",
			"Export Reports": true,
			"Members Recognition": "Recognition and badges for premium members",
			"Deliveries (all over the city)": "400 deliveries",
			"Delivery Options (all over the country)": "Upto 100 deliveries",
			"Shipping Discounts": "Exclusive shipping discounts",
			"Animated intro": "Access to premium only",
			"Express Delivery": "Priority and express delivery options",
			"Responsive Templates": "Access to premium responsive templates",
			// "Quick Suggestion": "Access to premium responsive templates",
			// "Thumbnail Generator": <FaCheckCircle />,
			// "Description generator": <FaCheckCircle />,
			// "Keyword Suggestions": <FaCheckCircle />,
			// "Contact Support": "24 hrs Contact Support"
		},
		{
			mainTitle: "Professional",
			popular: true,
			price: {
				month: `₹1999`,
				year: `₹21590`,
			},
			mid: process.env.NEXT_PUBLIC_PRO,
			"Badges": "Available",
			infoNote:
				"Advanced features and reporting better workflows and automation.",
			"Product Listings": "Upto 10 products (one time)",
			"Platform  Fees": "1% per transaaction",
			"Create Collections": "Upto 3 collections (one time)",
			"Create Topics (free/paid)": "Upto 5 topics (one time)",
			"Product Review Time": "1 hrs ",
			"Discounts and Promotions": "Create and manage discounts and promotions",
			"Create Community": "Upto 5 communities (one time)",
			"Analytics and Reports": "Advanced analytics",
			"Platform Fees (only for paid topics)": "1% per transaction",
			"Analytics and reports for Community": "Advanced analytics",
			"Images": "access upto 5k+ illustration",
			"Backgrounds": "access upto 1k+ backgrounds",
			"Fonts": "access upto 100+ fonts",
			"Uploads": "Upload upto 50 images",
			"Templates": "access upto 15 templates",
			"Color Palettes": "access upto 100+ styles palettes",
			"Export Reports": true,
			"Members Recognition": "Recognition and badges for premium members",
			"Deliveries (all over the city)": "400 deliveries",
			"Delivery Options (all over the country)": "Upto 100 deliveries",
			"Shipping Discounts": "Exclusive shipping discounts",
			"Animated intro": "Access to premium only",
			"Express Delivery": "Priority and express delivery options",
			"Responsive Templates": "Access to premium responsive templates",
			// "Quick Suggestion": "Access to premium responsive templates",
			// "Thumbnail Generator": <FaCheckCircle />,
			// "Description generator": <FaCheckCircle />,
			// "Keyword Suggestions": <FaCheckCircle />,
			// "Contact Support": "24 hrs Contact Support"
		},
		{
			mainTitle: "Professional",
			popular: true,
			price: {
				month: `₹3499`,
				year: `₹37790`,
			},
			mid: process.env.NEXT_PUBLIC_PREMIUM,
			"Badges": "Available",
			infoNote:
				"Advanced features and reporting better workflows and automation.",
			"Product Listings": "Upto 10 products (one time)",
			"Platform  Fees": "1% per transaaction",
			"Create Collections": "Upto 3 collections (one time)",
			"Create Topics (free/paid)": "Upto 5 topics (one time)",
			"Product Review Time": "1 hrs ",
			"Discounts and Promotions": "Create and manage discounts and promotions",
			"Create Community": "Upto 5 communities (one time)",
			"Analytics and Reports": "Advanced analytics",
			"Platform Fees (only for paid topics)": "1% per transaction",
			"Analytics and reports for Community": "Advanced analytics",
			"Images": "access upto 5k+ illustration",
			"Backgrounds": "access upto 1k+ backgrounds",
			"Fonts": "access upto 100+ fonts",
			"Uploads": "Upload upto 50 images",
			"Templates": "access upto 15 templates",
			"Color Palettes": "access upto 100+ styles palettes",
			"Export Reports": true,
			"Members Recognition": "Recognition and badges for premium members",
			"Deliveries (all over the city)": "400 deliveries",
			"Delivery Options (all over the country)": "Upto 100 deliveries",
			"Shipping Discounts": "Exclusive shipping discounts",
			"Animated intro": "Access to premium only",
			"Express Delivery": "Priority and express delivery options",
			"Responsive Templates": "Access to premium responsive templates",
			// "Quick Suggestion": "Access to premium responsive templates",
			// "Thumbnail Generator": <FaCheckCircle />,
			// "Description generator": <FaCheckCircle />,
			// "Keyword Suggestions": <FaCheckCircle />,
			// "Contact Support": "24 hrs Contact Support"
		},
		// {
		// 	mainTitle: "Custom",
		// 	price: {
		// 		month: "Custom",
		// 		year: "Custom",
		// 	},
		// 	// mid: membership.pro,
		// 	mid: "65e078e33b1ddb512b94dfd5",
		// 	"Badges": "Available",
		// 	infoNote: "Personalised service and enterprise security for large teams.",
		// 	"Create Topics (free/paid)": "custom",
		// 	"Product Listings": "Custom",
		// 	"Platform  Fees": "1% per transaaction",
		// 	"Create Collections": "Custom",
		// 	"Discounts and Promotions": "Custom",
		// 	"Product Review Time": "Custom",
		// 	"Analytics and Reports": "Custom",
		// 	"Platform Fees (only for paid topics)": "Custom",
		// 	"Analytics and reports for Community": "Custom",
		// 	"Create Community": "custom",
		// 	"Export Reports": true,
		// 	"Members Recognition": "Custom",
		// 	"Deliveries (all over the city)": "Custom",
		// 	"Delivery Options (all over the country)": "Custom",
		// 	"Shipping Discounts": "Custom",
		// 	"Express Delivery": "Custom",
		// 	"Images": "Illustration",
		// 	"Backgrounds": "Backgrounds",
		// 	"Fonts": "Fonts",
		// 	"Uploads": "Upload Images",
		// 	"Templates": "Templates",
		// 	"Color Palettes": "Color Palettes",
		// 	"Responsive Templates": "Custom",
		// 	"Images": "access upto 5k+ illustration",
		// 	"Backgrounds": "access upto 1k+ backgrounds",
		// 	"Fonts": "access upto 100+ fonts",
		// 	"Uploads": "Upload upto 50 images",
		// 	"Templates": "access upto 15 templates",
		// 	"Color Palettes": "access upto 100+ styles palettes",
		// 	"Animated intro": "Custom",
		// 	// "Quick Suggestion": "Custom",
		// 	// "Thumbnail Generator": "Custom",
		// 	// "Description generator": "Custom",
		// 	// "Keyword Suggestions": "Custom",
		// 	// "Contact Support": "Custom"
		// },
	];

	// const fetchmemberShip = async () => {
	// 	try {
	// 		const res = await axios.get("https://work.grovyo.xyz/api/v1/fetchmembership")
	// 		console.log(res.data.ids)
	// 		setMembership({
	// 			free: res.data.ids.free,
	// 			pro: res.data.ids.pro,
	// 			premium: res.data.ids.premium
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	const buyMembership = async (data) => {
		console.log(data.mid)
		try {
			// const res = await axios.post(`https://work.grovyo.xyz/api/v1/membershipbuy/${id}/${data.mid}`, { amount: monthprice ? data.price.month : data.price.year })
			const res = await axios.post(`http://192.168.84.86:7190/api/v1/membershipbuy/${id}/${data.mid}`, { amount: data.price.month })
			console.log(res.data)
			const membershipId = res.data.memid
			if (res.data.success) {
				let options = {
					"key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
					"amount": data.price.month * 100,
					"currency": "INR",
					"name": "Grovyo",
					"description": `Buying Membership of ${data.mainTitle}`,
					"order_id": res?.data?.oid,
					"handler": async function (response) {
						const paymentMethod = response?.method;
						const data = {
							paymentMethod,
							razorpay_order_id: response?.razorpay_order_id,
							razorpay_payment_id: response?.razorpay_payment_id,
							memid: membershipId,
							razorpay_signature: response?.razorpay_signature,
							status: true,
							period: monthprice ? "month" : "year"
						}
						const resp = await membershipFinalise({
							id,
							orderid: res.data?.order,
							data
						})

						if (resp.data.success) {
							localStorage.removeItem(`excktn`)
							localStorage.removeItem(`frhktn`)
							storeInSessionStorage(resp.data.sessionId);
							localStorage.setItem(`excktn`, resp.data.access_token)
							localStorage.setItem(`frhktn`, resp.data.refresh_token)
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
					await membershipFinalise({
						id,
						orderid: res.data?.order,
						data
					})
				})
				rpay.open();
			} else {
				toast.error(res.data.message)
			}
		} catch (error) {
			console.log(error)
		}
	}


	// useEffect(() => {
	// 	fetchmemberShip()
	// }, [])

	return (
		<>
			<Toaster />
			<div className="bg-white dark:bg-[#273142] min-h-[100vh] no-scrollbar flex items-center justify-center">
				<div className="sm:mx-5 mx-2 pb-10">
					{/* Ai */}
					<div className="py-2 lg:py-2 mt-8 flex flex-col w-full  text-[#101828]">
						<span className="font-semibold  text-3xl sm:text-5xl mt-3 sm:mb-4">
							Membership has its privileges.
						</span>
						<span className="sm:text-xl   text-lg font-medium">
							Simple, transparent pricing that grows with you. Try any plan
							for 30 days.
						</span>
						<div className="flex gap-2 p-2 mt-2 text-red-300 justify-between  bg-[#f9f9f9] px-4 relative shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452]  items-center rounded-2xl">
							<div className="flex justify-center items-center">
								<WiStars className="w-[40px] absolute left-4 animate-ping h-[40px]" />
								<WiStars className="w-[40px]  h-[40px]" />
								<span className="font-medium text-base text-[#101828] ">Update to AI add-on  </span>
							</div>
							<div className="px-2 py-2 bg-[#F2F4F7] space-x-1 flex justify-center items-center rounded-full">
								<button
									onClick={() => setAi(true)}
									className={`py-2 px-2 md:px-1.5 sm:px-6 drop-shadow-md hover:bg-white text-[#667085] hover:text-black rounded-full
                ${ai && "bg-white border-[#94a3b8] border text-black "}`}
								>

								</button>
								<button
									onClick={() => setAi(false)}
									className={`ml-1 py-2 px-2 md:px-1.5 sm:px-6 border-[#94a3b8] drop-shadow-md hover:bg-white text-[#667085]  hover:text-black rounded-full
                ${!ai && "bg-white border-[#94a3b8] border text-black"}`}
								>

								</button>
							</div>
						</div>
						<div className="px-2 py-2 bg-[#F2F4F7] md:m-auto mt-5 md:mt-10 space-x-1 flex justify-center items-center rounded-lg">
							<button
								onClick={() => setMonthPrice(true)}
								className={`py-2 px-2 md:px-1.5 sm:px-3.5 drop-shadow-md hover:bg-white text-[#667085] hover:text-black rounded-md
                ${monthprice && "bg-white border-[#94a3b8] border text-black "}`}
							>
								Monthly billing
							</button>
							<button
								onClick={() => setMonthPrice(false)}
								className={`ml-1 py-2 px-2 md:px-1.5 sm:px-3.5 border-[#94a3b8] drop-shadow-md hover:bg-white text-[#667085]  hover:text-black rounded-md
                ${!monthprice && "bg-white border-[#94a3b8] border text-black"}`}
							>
								Annual billing
							</button>
						</div>
					</div>

					<div className="md:max-w-[1280px] max-w-[500px] flex justify-center items-center w-full mx-auto dark:bg-[#1d212a] p-4 dark:text-white  bg-[#f9f9f9] px-4 relative shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452] rounded-2xl">
						<table className="w-full text-start border-spacing-5 border-separate flex gap-4 flex-col md:flex-row  pp:p-5 lg:p-0">
							{pricingData.map((data, index) => (
								<tbody
									key={index}
									className={
										index === 0
											? "hidden lg:block"
											: "border-2 lg:border-none font-medium text-sm text-[#101828] p-2 sm:bg-white dark:text-white mb-10 lg:mb-0 rounded-2xl"
									}
								>
									<div className="w-full h-[300px] items-center rounded-2xl sticky">
										<tr className="">
											<td className="">
												<div className="font-semibold flex items-center text-xl  dark:text-white text-[#101828]">
													{data.mainTitle}
													{data.popular && (
														<span
															className="text-sm font-medium text-[#365CCE] px-2.5 py-0.5 bg-[#F9F5FF] rounded-2xl ml-2"
														>
															Popular
														</span>
													)}
												</div>
											</td>
										</tr>
										<tr>
											<td className="h-[50px] dark:text-white">
												<div>
													<span className="font-semibold dark:text-white text-5xl">
														{monthprice ? data.price?.month : data.price?.year}
													</span>
													{data.price && (
														<span className="text-[#475467] dark:text-white font-normal ml-1">
															{monthprice ? "per month" : "per year"}
														</span>
													)}
												</div>
											</td>
										</tr>
										<tr>
											<td className="h-[50px] dark:text-white lg:h-[70px] xl:h-[50px]">
												<span className="text-[#475467] dark:text-white text-sm font-normal">
													{data.infoNote}
												</span>
											</td>
										</tr>
										<tr>
											{index === 0 || index === 1 ? (
												<td className="h-[50px]"></td>
											) : (
												<td>
													<button
														onClick={() => {
															// if (index !== 3) {
															// 	buyMembership(data)
															// } else {
															// 	router.push("/membership/custom")
															// }
															buyMembership(data)
														}
														}
														className="w-full bg-[#365CCE] text-white dark:text-white rounded-lg py-3 font-semibold"
													>
														Get Started
													</button>
												</td>
											)}
										</tr>
									</div>
									<hr />
									{/* portion after first title */}
									<tr>
										<td
											className="h-5 text-sm font-semibold  text-[#365CCE]"
											colSpan={2}
										>
											{data.titleBadge}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleBadge"]}
											</span>
										</td>
									</tr>

									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-6 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828]">
												{data["Badges"]}
											</span>
											<span className="lg:hidden text-left">{pricingData[0]["Badges"]}</span>
										</td>
									</tr>
									<tr>
										<td
											className="h-5 text-sm font-semibold  text-[#365CCE]"
											colSpan={2}
										>
											{data.titleRow1}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleRow1"]}
											</span>
										</td>
									</tr>
									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-6 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Product Listings"]}
											</span>
											<span className="lg:hidden text-left">{pricingData[0]["Product Listings"]}</span>
										</td>
									</tr>

									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Platform  Fees"]}
											</span>
											<span className="lg:hidden text-left">{pricingData[0]["Platform  Fees"]}</span>
										</td>
									</tr>
									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Create Collections"]}
											</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Create Collections"]}
											</span>
										</td>
									</tr>
									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Product Review Time"]}
											</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Product Review Time"]}
											</span>
										</td>
									</tr>
									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Analytics and Reports"]}
											</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Analytics and Reports"]}
											</span>
										</td>
									</tr>
									<tr>
										<td
											className={
												index === 0
													? "h-5"
													: "h-9 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">
												{data["Discounts and Promotions"]}
											</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Discounts and Promotions"]}
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<hr />
										</td>
									</tr>
									{/* portion after second title */}
									<tr >
										<td
											colSpan={2}
											className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap"
										>
											{data.titleRow5}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleRow5"]}
											</span>
										</td>
									</tr>
									<tr>
										<td

											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">{data["Create Community"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Create Community"]}
											</span>
										</td>
									</tr>
									<tr>
										<td

											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span className="font-medium text-sm text-[#101828] dark:text-white">{data["Create Topics (free/paid)"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Create Topics (free/paid)"]}
											</span>
										</td>
									</tr>

									<tr>
										<td

											className={
												index === 0
													? "h-5"
													: "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span>{data["Platform Fees (only for paid topics)"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Platform Fees (only for paid topics)"]}
											</span>
										</td>
									</tr>
									<tr>
										<td

											className={
												index === 0
													? "h-5"
													: "h-9 text-right md:text-center flex justify-between lg:justify-center items-center flex-row-reverse"
											}
										>
											<span>{data["Analytics and reports for Community"]}</span>
											<span className="lg:hidden text-left h-full flex items-center justify-center">
												{pricingData[0]["Analytics and reports for Community"]}
											</span>
										</td>
									</tr>
									{/* <tr>
										<td
											className={
												index === 0
													? "h-10"
													: "h-10 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"
											}
										>
											<span>{data["Members Recognition"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Members Recognition"]}
											</span>
										</td>
									</tr> */}
									<tr>
										<td>
											<hr />
										</td>
									</tr>
									<tr>
										<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
											{data.titleRow9}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleRow9"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-12 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Deliveries (all over the city)"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Deliveries (all over the city)"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-12 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Delivery Options (all over the country)"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Delivery Options (all over the country)"]}
											</span>
										</td>
									</tr>
									{/* <tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Shipping Discounts"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Shipping Discounts"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Express Delivery"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Express Delivery"]}
											</span>
										</td>
									</tr> */}
									<tr>
										<td>
											<hr />
										</td>
									</tr>
									<tr>
										<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
											{data.titleRow13}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleRow13"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Responsive Templates"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Responsive Templates"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Images"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Images"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Backgrounds"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Backgrounds"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Fonts"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Fonts"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Uploads"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Uploads"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Templates"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Templates"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-7" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Animated intro"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Animated intro"]}
											</span>
										</td>
									</tr>

									<tr>
										<td>

										</td>
									</tr>
									{/* <tr>
										<td colSpan={2} className="h-5 text-sm font-semibold text-[#365CCE] whitespace-nowrap">
											{data.titleRow17}
											<span className="lg:hidden text-left">
												{pricingData[0]["titleRow17"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-9 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Quick Suggestion"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Quick Suggestion"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Thumbnail Generator"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Thumbnail Generator"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Description generator"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Description generator"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Keyword Suggestions"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Keyword Suggestions"]}
											</span>
										</td>
									</tr>
									<tr>
										<td className={index === 0 ? "h-5" : "h-7 text-right md:text-center flex justify-between lg:justify-center flex-row-reverse"}>
											<span>{data["Contact Support"]}</span>
											<span className="lg:hidden text-left">
												{pricingData[0]["Contact Support"]}
											</span>
										</td>
									</tr> */}

								</tbody>
							))}
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sample5;
