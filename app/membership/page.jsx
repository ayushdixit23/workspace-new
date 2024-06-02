"use client"
import { useEffect, useState } from "react";
import { getData } from "../utilsHelper/Useful";
import axios from "axios"
import useRazorpay from "react-razorpay";
import { useMemfinalizeMutation } from "../redux/apiroutes/payment";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import membership from "../assets/image/membership.json"
import { TbTruckDelivery } from "react-icons/tb";
import Cookies from "js-cookie";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import Hover from "../data/Hover";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import Image from "next/image";
import logo from "../assets/image/grovyo.png"
import { RxCross2 } from "react-icons/rx";

const Sample5 = () => {
	const [monthprice, setMonthPrice] = useState(true);
	const [Razorpay] = useRazorpay()
	const { id, fullname } = getData()
	const [toggle, setToggle] = useState({
		t1: false,
		t2: false,
		t3: false,
		t4: false,
		t5: false,
		t6: false,
		t7: false,
		t8: false,
	})
	const [state, setState] = useState(1)
	const [plus, setPlus] = useState(null)
	const [pro, setPro] = useState(null)
	const [popup, setPopup] = useState(false)
	const [premium, setPremium] = useState(null)
	const [plusy, setPlusy] = useState(null)
	const [proy, setProy] = useState(null)
	const [premiumy, setPremiumy] = useState(null)

	const [d, setD] = useState({
		plus: 10,
		pro: 30,
		premium: 50
	})
	const [dc, setDc] = useState({
		plus: 5,
		pro: 15,
		premium: 25
	})
	const [memberPop, setMemberPop] = useState(false)
	const [isdelivery, setIsDelivery] = useState(false)
	// const [ai, setAi] = useState({
	// 	free: "",
	// 	pro: "",
	// 	premium: ""
	// })
	const router = useRouter()

	const [membershipFinalise] = useMemfinalizeMutation()

	const handlePlus = (type, number) => {
		setD(prevState => ({
			...prevState,
			[type]: Math.max(0, (prevState[type] || 0) + number)
		}));
	};

	const handleMinus = (type, number) => {
		setD(prevState => ({
			...prevState,
			[type]: Math.max(0, (prevState[type] || 0) - number)
		}));
	};

	const handlePlusdc = (type, number) => {
		setDc(prevState => ({
			...prevState,
			[type]: Math.max(0, (prevState[type] || 0) + number)
		}));
	};

	const handleMinusdc = (type, number) => {
		setDc(prevState => ({
			...prevState,
			[type]: Math.max(0, (prevState[type] || 0) - number)
		}));
	};


	const buyMembership = async (price, mId, title, deliverylimitcity, deliverylimitcountry) => {
		const amount = price + parseInt(price * 0.18)
		const amounttosend = `₹${amount}`

		try {

			const res = await axios.post(`https://work.grovyo.xyz/api/v1/membershipbuy/${id}/${mId}`, { amount: amounttosend })
			// const res = await axios.post(`http://localhost:7190/api/v1/membershipbuy/${id}/${mId}`, { amount: amounttosend })

			const membershipId = res.data.memid
			console.log("1")
			if (res.data.success) {
				let options = {
					"key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
					"amount": amounttosend * 100,
					"currency": "INR",
					"name": "Grovyo",
					"description": `Buying Membership of ${title}`,
					"order_id": res?.data?.oid,
					"handler": async function (response) {
						setMemberPop(true)
						const paymentMethod = response?.method;
						const data = {
							paymentMethod,
							razorpay_order_id: response?.razorpay_order_id,
							razorpay_payment_id: response?.razorpay_payment_id,
							deliverylimitcity,
							deliverylimitcountry,
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
						setTimeout(() => {
							setMemberPop(false)
						}, 1000)
						console.log("2")
						if (resp.data.success) {
							// localStorage.removeItem(`excktn`)
							// localStorage.removeItem(`frhktn`)
							Cookies.remove("excktn")
							Cookies.remove("frhktn")

							const expirationDate = new Date();
							expirationDate.setDate(expirationDate.getDate() + 7);

							Cookies.set(`excktn`, resp.data.access_token, { expires: expirationDate });
							Cookies.set(`frhktn`, resp.data.refresh_token, { expires: expirationDate });

							setTimeout(() => {
								setMemberPop(false)
							}, 2000)
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
				console.log("3")
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

				console.log("4")
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


	useEffect(() => {
		const a = d.plus * 4
		const b = dc.plus * 7
		const sum = a + b

		setPlus(424 + sum)
		setPlusy(5923 + sum)
	}, [d.plus, dc.plus])

	useEffect(() => {
		const a = d.pro * 4
		const b = dc.pro * 7
		const sum = a + b

		setPro(1774 + sum)
		setProy(23763 + sum)
	}, [d.pro, dc.pro])

	useEffect(() => {
		const a = d.premium * 4
		const b = dc.premium * 7
		const sum = a + b

		setPremium(3124 + sum)
		setPremiumy(41613 + sum)
	}, [d.premium, dc.premium])

	useEffect(() => {
		setTimeout(() => { setPopup(true) }, 1300)
	}, [])

	return (
		<>

			{
				memberPop && <div className="fixed inset-0 w-screen z-50 flex justify-center font-semibold text-sm items-center h-screen bg-black/50">
					<div className="bg-white w-[50%] rounded-xl">
						<Lottie animationData={membership}></Lottie>
						<div className="flex justify-center items-center">
							<div className="relative text-2xl font-bold -top-16">Membership Purchased Successfully!</div>
						</div>
					</div>

				</div>
			}

			<Toaster />
			<div
				style={{ backgroundImage: 'linear-gradient(to right, #000000, #111827, #000000)' }}
				className="h-auto min-h-[100vh] overflow-hidden no-scrollbar text-white no-scrollbar flex items-center w-full flex-col justify-center">
				{popup && <div className="w-full animate-popup bg-[#111827] relative py-4 justify-center items-center text-sm px-6 flex">
					<div className="font-medium">
						Don't miss out! Get 500 Rs in FREE Grovyo Ads Credit to jumpstart your campaigns.
					</div>
					<div className="absolute right-12 top-0 flex items-center h-full">
						<RxCross2 className="text-xl" onClick={() => setPopup(false)} />
					</div>
				</div>}
				<div className="w-full py-4 px-6 flex justify-between items-center">
					<div className="max-w-[150px] ">
						<Image src={logo} className="w-full h-full object-cover" />
					</div>
					{/* <div
						className="flex p-1 bg-[#f9f9f9] px-4 rounded-full relative pn:max-sm:hidden text-white shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452] py-2
"
					>
						<div
							onClick={() => {
								setState(1);
							}}
							className={`flex flex-col cursor-pointer justify-center items-center w-[100px] ${state === 1 ? "" : ""
								}`}
						>
							<div
								onClick={() => {
									setState(1);
								}}
								className={`${state === 1
									? "text-[#ffffff] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-white"
									: "text-[#8C96A8]"
									}`}
							>
								Search
							</div>
							<div
								className={`${state === 1
									? "h-[2px] w-[20px] bg-white rounded-t-md"
									: "hidden"
									}`}
							></div>
						</div>
						<div
							onClick={() => {
								setState(2);
							}}
							className={`flex flex-col cursor-pointer justify-start items-start pl-3 w-[100px] ${state === 2 ? "" : ""
								}`}
						>
							<div
								onClick={() => {
									setState(2);
								}}
								className={`${state === 2
									? "text-[#ffffff] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-white"
									: "text-[#8C96A8]"
									}`}
							>
								Features
							</div>
							<div
								className={`${state === 2
									? "h-[2px] w-[20px] bg-white rounded-t-md ml-6"
									: "hidden"
									}`}
							></div>
						</div>
						<div
							onClick={() => {
								setState(3);
							}}
							className={`flex flex-col cursor-pointer justify-center items-center w-[100px] ${state === 3 ? "" : ""
								}`}
						>
							<div
								className={`${state === 3
									? " text-[#ffffff] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-white"
									: " text-[#8C96A8]"
									}`}
							>
								For Business
							</div>
							<div
								className={`${state === 3
									? "h-[2px] w-[20px] bg-white rounded-t-md"
									: "hidden"
									}`}
							></div>
						</div>
					</div>
					<div className="flex justify-center items-center px-5 gap-2 sm:gap-4">
						<a
							target="_blank"
							href="https://play.google.com/store/apps/details?id=com.grovyomain&hl=en_IN&gl=US"
							className="bg-[#0A7CFF] shadow-lg shadow-blue-500/50 text-white px-4 py-2 font-semibold rounded-full"
						>
							Download now
						</a>

					</div> */}
				</div>
				<div className="sm:mx-5 pn:max-sm:w-full mx-2 pb-7 sm:pb-10">
					<div className="flex justify-center px-3 items-center flex-col" >
						<div className="flex flex-col gap-6">
							<div className="md:text-6xl sm:text-4xl text-3xl text-center font-extrabold font-montserrat pt-10 ">Simple & Transparent Pricing</div>
							<div className="md:text-2xl sm:text-xl text-center font-medium sm:font-semibold">Plans exclusively focused on your Growth.</div>
						</div>
						<div className="w-[98%] flex justify-center gap-4 sm:gap-6 bg-membership bg-cover items-center p-3 md:p-5 sm:py-8 md:py-11 rounded-2xl mt-[30px] flex-col bg-[#434CE6]">
							<div className="sm:text-2xl text-lg font-semibold font-montserrat">Your first 30 Days are on us!</div>
							<div className="sm:text-lg text-center font-medium">Join over 1000+ growing communities and startups!</div>
							<div className="flex justify-center gap-5 items-center">
								<Link href={"/membership#learnmore"} className="p-2 px-5 sm:px-9 flex text-sm pp:text-lg justify-center items-center border border-[#fff] rounded-xl">
									Learn More
								</Link>
								<Link href={"/membership#plans"} className="p-2 px-5 sm:px-9 flex text-sm pp:text-lg justify-center text-[#434CE6] font-semibold bg-[#FFFFFF] items-center border border-[#fff] rounded-xl">Get Started Now!</Link>
							</div>
						</div>
						<div className="flex justify-between md:flex-row flex-col gap-5 md:items-center mt-[30px] w-[98%]">
							<div className="flex flex-col gap-2">
								<div className="pp:text-2xl text-xl font-semibold">Ready to unlock the full potential of your Grovyo experience ?</div>
								<div>Upgrade to Premium and gain exclusive access to...</div>
							</div>
							<div className="flex gap-2 md:justify-center items-center">
								<div onClick={() => setMonthPrice(true)} className={`${monthprice ? "border border-[#fff]/30 " : null} p-1.5 px-5  pp:text-base text-sm rounded-2xl`}>Monthly</div>
								<div onClick={() => setMonthPrice(false)} className={`${monthprice ? null : "border border-[#fff]/30 "} p-1.5 px-5  pp:text-base text-sm rounded-2xl`}>Yearly</div>
								{monthprice === false && < div className="flex justify-center items-center gap-1">
									<GoTag className="text-[#bf3989] text-xl" />
									<div className="text-gradient from-gradient-month-2 pp:text-base text-sm font-semibold to-gradient-month-1">Get 1 month free</div>
								</div>}
							</div>
						</div>
						<div className="flex justify-between  pp:flex-row flex-col gap-5 pp:items-center mt-[45px] w-[98%]">
							<div className="flex flex-col gap-2">
								<div className="text-2xl font-semibold">Deliveries</div>
								<div>Deliver Your products with Grovyo Flash</div>
							</div>
							<div className="flex gap-2 justify-between pp:justify-center items-center">
								Grovyo Deliveries
								<div className="flex justify-center items-center gap-1">
									{/* <Switch checked={isdelivery} onCheckedChange={setIsDelivery} id="airplane-mode" /> */}

									{
										isdelivery ? <BsToggleOn onClick={() => {
											setIsDelivery(false)
											setD({
												plus: 10,
												pro: 30,
												premium: 50
											})
											setDc({
												plus: 5,
												pro: 15,
												premium: 25
											})
										}} className="text-4xl" /> : <BsToggleOff onClick={() => { setIsDelivery(true) }} className="text-4xl" />
									}



								</div>
							</div>
						</div>
					</div>

					{/* <div className="py-2 lg:py-2 mt-8 flex flex-col w-full  ">
						<span className="font-semibold  text-3xl sm:text-5xl mt-3 sm:mb-4">
							Membership has its privileges.
						</span>
						<span className="sm:text-xl text-lg font-medium">
							Simple, transparent pricing that grows with you. Try any plan
							for 30 days.
						</span>

						<div className="flex gap-2 p-2 mt-2 text-red-300 justify-between  bg-[#f9f9f9] px-4 relative shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452]  items-center rounded-2xl">
							<div className="flex justify-center py-3 gap-3 items-center">

								<TbTruckDelivery className="w-[50px] h-[50px]" />
								<div className="flex flex-col justify-center">
									<div className="font-medium text-base  ">Want to deliver your Products?</div>
									<div className="font-medium  text-[#060a11] text-sm">Get upto 10 deliveries free </div>
								</div>

							</div>
							<div className="flex items-center space-x-2">

								<Switch checked={isdelivery} onCheckedChange={setIsDelivery} id="airplane-mode" />
							</div>

						</div>

					</div> */}

					{/* <div className="px-2 py-2 bg-[#F2F4F7] md:m-auto mt-5 md:mt-10 space-x-1 flex justify-center items-center rounded-lg">
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
						</div> */}

					<div className="flex justify-center mt-6 items-center w-full">
						<div id="plans" className="grid xl:grid-cols-5 gap-10 sm:gap-5 xl:gap-0 sm:grid-cols-2 lg:w-[98%]">
							<div className="xl:block hidden">
								<div>
									<div className="h-[165px] px-2 font-semibold z-40 text-sm border-b border-[#E6E9F5]/10 flex justify-start items-center
									">
										<div className="flex flex-col gap-2 -mt-11 sm:mt-0">
											<div className="flex items-center gap-3">
												<div className="text-2xl ">Compare plans</div>
												{/* <div className="border-b border-[#E6E9F5]/10 rounded-3xl p-2">40% Off</div> */}
											</div>
											<div>Choose your workspace plan according to your organisational plan</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 bg-[#242832] opacity-90 rounded-l-xl mt-4 text-lg items-center h-[71px]">
										Deliveries
									</div>}
									{isdelivery && <div>



										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the city)"} para={"Enjoy fast and convenient delivery within your city"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>


										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[77px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the country)"} para={"Nationwide Reach: We deliver your products to customers across the country."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>

									</div>}
									<div className="flex font-bold w-full px-4 bg-[#242832] opacity-90  rounded-l-xl mt-4 text-lg items-center h-[71px]">
										Premium Member
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											<Hover color={"bg-[#1b2431] text-white"} text={"Verification Badge"} para={"Gain instant recognition and establish trust within your communities and with potential customers."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />

										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Direct Messaging"} para={"Send direct messages to any user  in chat conversations without needing a request."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Custom Domain Names"} para={" Get a personalized domain name like username.grovyo.com /Free Option: Create a custom profile URL with grovyo.com/username"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 rounded-l-xl items-center h-[71px]">
										Store
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Product Listings"} para={"Create your products on Grovyo and showcase them on the web, app, and anywhere else your audience is.Z"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Platform  Fees"} para={"Grow your business while keeping costs manageable with a competitive platform fee on every sale."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Create Collections"} para={"Organize your products into collections for easier browsing and better customer experience."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Product Review Time"} para={"Get your products reviewed and approved within a specified timeframe to ensure quality and compliance."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Analytics and Reports"} para={"Gain valuable insights into your store's performance with detailed analytics. Track sales, top-selling items, and customer behavior to optimize your offerings."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[77px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Discounts and Promotions"} para={"Create and manage discounts and promotional offers to boost your sales and attract more customers."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90  rounded-l-xl mt-4 items-center h-[71px]">
										Community
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											<Hover color={"bg-[#1b2431] text-white"} para={"Create Multiple Communities with a Single Account: Manage multiple communities focused on different topics, allowing you to expand your reach and income potential."} text={"Create Community"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Create Topics (free/paid)"} para={"Monetize your expertise by creating paid topics. Offer exclusive content, courses, or discussions that members can access for a fee, adding value to your community."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Tag Multiple Communities"} para={"Collaborate and engage with multiple communities seamlessly by tagging them in your posts and Topics."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[77px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Platform Fees (only for paid topics)"} para={"A platform fee is applied to all transactions for paid topics, ensuring seamless and secure handling of payments and access."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} para={"Gain insights into your community’s performance with detailed analytics and reports. Track engagement, measure the success of your paid topics, and make data-driven decisions to grow your community."} text={"Analytics and reports"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Members Recognition
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 rounded-l-xl items-center h-[71px]">
										Prosite
									</div>
									<div>
										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} para={"Responsive Templates: Choose from a library of beautifully designed, mobile-friendly templates that adapt seamlessly to any device."} text={"Responsive Templates"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"}  text={"Animated intro"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div> */}
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Images"} para={"Access a vast library of high-quality photos to enhance the visual appeal of your Prosite"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Backgrounds"} para={"Make your prosite stand out with custom backgrounds. Choose from a variety of textures, patterns, and colors to create a unique backdrop that reflects your brand's personality and style."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Fonts"} para={"Express your brand's identity with a wide range of fonts to choose from. Whether you prefer sleek and modern or classic and elegant, you'll find the perfect typography to complement your website's design."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Templates"} para={" Access a variety of professionally designed templates to make your prosite, store, and community pages look stunning and user-friendly."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Uploads"} para={"Upload your own photos, graphics, and media files with ease. Our user-friendly interface makes it simple to add content to your website and customize it to suit your needs"} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">

											<Hover color={"bg-[#1b2431] text-white"} text={"Color Palettes"} para={" Customize your brand’s look with an array of color palettes to make your Prosite and products visually appealing and on-brand."} w2={"sm:w-[350px]"} icon={<IoInformationCircleOutline />} />
										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg items-center h-[71px]">
										AI Support
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Quick Suggestion
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Thumbnail Generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Description generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Keyword Suggestions
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* free */}
							<div className="md:max-lg:min-w-[471px]">
								<div>
									<div className="h-[165px] px-2 border-b bg-transparent border-[#E6E9F5]/10 flex justify-start z-20 items-center
									">
										<div className="flex flex-col w-full -mt-11 sm:mt-0 h-full-end gap-2">
											<div className="flex justify-center px-4 mt-2 items-center gap-3">
												<div className="flex flex-col w-[90%] justify-normal">
													<div className="font-bold text-lg">Free</div>
													{/* <div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
													<div className="font-semibold text-4xl mt-2">₹0<span className="text-xl">/forever</span></div>
													<div className="w-full flex justify-center items-center mt-3 ">
														<div className="p-2 px-4 text-center font-semibold border border-[#fff]/80 rounded-full w-full">Active</div>
													</div>

												</div>
											</div>
											{/* <div className="text-center font-semibold text-4xl mt-2">₹0/<span className="text-xl">forever</span></div> */}
											{/* <div className="w-full flex justify-center items-center mt-3 ">
												<button className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div> */}
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										{/* <div className="flex border-b flex-col border-[#E6E9F5]/10 px-4 font-medium text-sm justify-center h-[71px]">
											<div>10 Deliveries for free</div>
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-medium text-sm items-center h-[77px]">
											Upto 5 deliveries
										</div> */}

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the city)"} para={"Enjoy fast and convenient delivery within your city"} icon={<IoInformationCircleOutline />} />
											</div>
											<div>Not available </div>

										</div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the country)"} para={"Nationwide Reach: We deliver your products to customers across the country."} icon={<IoInformationCircleOutline />} />
											</div>
											<div>Not available </div>

										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Badges</span>
									</div>
									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Verification Badge"} para={"Gain instant recognition and establish trust within your communities and with potential customers."} icon={<IoInformationCircleOutline />} />
											</div>
											<div>Not available </div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Direct Messaging"} para={"Send direct messages to any user  in chat conversations without needing a request."} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available </div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Custom Domain Names"} para={" Get a personalized domain name like username.grovyo.com /Free Option: Create a custom profile URL with grovyo.com/username"} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available </div>

										</div>

									</div>
									<div className="flex font-bold px-4 text-lg bg-[#242832] pn:max-xl:rounded-xl opacity-90 mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Listings"} para={"Create your products on Grovyo and showcase them on the web, app, and anywhere else your audience is.Z"} icon={<IoInformationCircleOutline />} /></div>
											<div>Up-to 5 Products</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform  Fees"} para={"Grow your business while keeping costs manageable with a competitive platform fee on every sale."} icon={<IoInformationCircleOutline />} /></div>
											<div>20% per transaction</div>

										</div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Collections"} para={"Organize your products into collections for easier browsing and better customer experience."} icon={<IoInformationCircleOutline />} /></div>
											<div>1</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Review Time"} para={"Get your products reviewed and approved within a specified timeframe to ensure quality and compliance."} icon={<IoInformationCircleOutline />} /></div>
											<div>24 Hrs</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Analytics and Reports"} para={"Gain valuable insights into your store's performance with detailed analytics. Track sales, top-selling items, and customer behavior to optimize your offerings."} icon={<IoInformationCircleOutline />} /></div>
											<div>Basic analytics</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Discounts and Promotions"} para={"Create and manage discounts and promotional offers to boost your sales and attract more customers."} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available</div>

										</div>

									</div>
									<div className="flex font-bold px-4 text-lg pn:max-xl:rounded-xl bg-[#242832] opacity-90 mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Create Multiple Communities with a Single Account: Manage multiple communities focused on different topics, allowing you to expand your reach and income potential."} text={"Create Community"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 2 communities</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Topics (free/paid)"} para={"Monetize your expertise by creating paid topics. Offer exclusive content, courses, or discussions that members can access for a fee, adding value to your community."} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 2 topics</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Tag Multiple Communities"} para={"Collaborate and engage with multiple communities seamlessly by tagging them in your posts and Topics."} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform Fees (only for paid topics)"} para={"A platform fee is applied to all transactions for paid topics, ensuring seamless and secure handling of payments and access."} icon={<IoInformationCircleOutline />} /></div>
											<div>20% per transaction</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Gain insights into your community’s performance with detailed analytics and reports. Track engagement, measure the success of your paid topics, and make data-driven decisions to grow your community."} text={"Analytics and reports"} icon={<IoInformationCircleOutline />} /></div>
											<div>Basic analytics</div>

										</div>

										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-medium text-sm items-center h-[71px]">
											Not available
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg pn:max-xl:rounded-xl bg-[#242832] opacity-90 mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Prosite</span>
									</div>
									<div>
										{/* <div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Responsive Templates: Choose from a library of beautifully designed, mobile-friendly templates that adapt seamlessly to any device."} text={"Responsive Templates"} icon={<IoInformationCircleOutline />} /></div>
											<div className="text-right pn:max-xl:max-w-[50%]">Limited selection of templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"}  text={"Animated intro"} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available</div>

										</div> */}
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Images"} pc={"-left-[40px]"} para={"Access a vast library of high-quality photos to enhance the visual appeal of your Prosite"} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 70+ illustration</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Background"} para={"Make your prosite stand out with custom backgrounds. Choose from a variety of textures, patterns, and colors to create a unique backdrop that reflects your brand's personality and style."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 50+ backgrounds</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Fonts"} pc={"-left-[40px]"} para={"Express your brand's identity with a wide range of fonts to choose from. Whether you prefer sleek and modern or classic and elegant, you'll find the perfect typography to complement your website's design."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 10+ free fonts</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Templates"} pc={"-left-[40px]"} para={" Access a variety of professionally designed templates to make your prosite, store, and community pages look stunning and user-friendly."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 5 templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Uploads"} pc={"-left-[40px]"} para={"Upload your own photos, graphics, and media files with ease. Our user-friendly interface makes it simple to add content to your website and customize it to suit your needs"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upload upto 10 images</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Color Palettes"} para={" Customize your brand’s look with an array of color palettes to make your Prosite and products visually appealing and on-brand."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 10+ styles palettes</div>

										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Ai Support</span>
									</div> */}
									{/* <div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Limited selection of templates
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Not available
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Not available
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Not available
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Basic Support
										</div>

									</div> */}
								</div>
							</div>


							{/* plus */}
							<div className="md:max-lg:min-w-[471px]">
								<div>
									<div className="h-[165px] px-2 border-b border-[#E6E9F5]/10 bg-transparent flex justify-start z-20  items-center
									">
										<div className="flex flex-col w-full -mt-11 sm:mt-0 h-full-end gap-2">
											<div className="flex justify-center mt-2 items-center gap-3">
												{/* <div className="font-bold text-5xl">₹{monthprice ? plus : plusy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
												<div className="flex flex-col w-[90%] justify-normal">
													<div className="font-bold text-lg">Plus</div>
													{/* <div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
													<div className="font-semibold text-4xl mt-2">₹{monthprice ? plus : plusy}<span className="text-xl">/{monthprice ? "month" : "year"}</span></div>
													<div className="w-full flex justify-center items-center mt-3 ">
														<button onClick={() => buyMembership(monthprice ? plus : plusy, process.env.NEXT_PUBLIC_PLUS, "Plus", d.plus, dc.plus)} className="p-2 px-4 text-center  hover:text-white hover:bg-[#0066FF] font-semibold border text-[#0066FF] border-[#0066FF] rounded-full w-full">Let's Begin</button>
													</div>

												</div>
											</div>
											{/* <div className="text-center font-semibold  mt-2">Unleash Your Creative Power!</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? plus : plusy, process.env.NEXT_PUBLIC_PLUS, "Plus", d.plus, dc.plus)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div> */}
										</div>
									</div>
									{isdelivery && <div className="flex font-medium px-4 bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the city)"} para={"Enjoy fast and convenient delivery within your city"} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium  ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("plus", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.plus} required />
														<button onClick={() => handlePlus("plus", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[77px]">

											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the country)"} para={"Nationwide Reach: We deliver your products to customers across the country."} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium  ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("plus", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.plus} required />
														<button onClick={() => handlePlusdc("plus", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90  pn:max-xl:rounded-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Badge</span>
									</div>
									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Verification Badge"} para={"Gain instant recognition and establish trust within your communities and with potential customers."} icon={<IoInformationCircleOutline />} /></div>
											<div><MdVerified className="text-[#27AE60] text-2xl " /></div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Direct Messaging"} para={"Send direct messages to any user  in chat conversations without needing a request."} icon={<IoInformationCircleOutline />} /></div>
											<div>10</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Custom Domain Names"} para={" Get a personalized domain name like username.grovyo.com /Free Option: Create a custom profile URL with grovyo.com/username"} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available </div>

										</div>

									</div>

									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Listings"} para={"Create your products on Grovyo and showcase them on the web, app, and anywhere else your audience is.Z"} icon={<IoInformationCircleOutline />} /></div>
											<div>Up-to 5 Products</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform  Fees"} para={"Grow your business while keeping costs manageable with a competitive platform fee on every sale."} icon={<IoInformationCircleOutline />} /></div>
											<div>10% per transaction</div>

										</div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Collections"} para={"Organize your products into collections for easier browsing and better customer experience."} icon={<IoInformationCircleOutline />} /></div>
											<div>1</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Review Time"} para={"Get your products reviewed and approved within a specified timeframe to ensure quality and compliance."} icon={<IoInformationCircleOutline />} /></div>
											<div>16 Hrs</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Analytics and Reports"} para={"Gain valuable insights into your store's performance with detailed analytics. Track sales, top-selling items, and customer behavior to optimize your offerings."} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Discounts and Promotions"} para={"Create and manage discounts and promotional offers to boost your sales and attract more customers."} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available</div>

										</div>

									</div>

									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 pn:max-xl:rounded-xl items-center h-[71px]">
										<span class="xl:hidden block">Community</span>
									</div>

									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Create Multiple Communities with a Single Account: Manage multiple communities focused on different topics, allowing you to expand your reach and income potential."} text={"Create Community"} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[50%] text-right">Upto 3 communities (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Topics (free/paid)"} para={"Monetize your expertise by creating paid topics. Offer exclusive content, courses, or discussions that members can access for a fee, adding value to your community."} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 3 topics (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Tag Multiple Communities"} para={"Collaborate and engage with multiple communities seamlessly by tagging them in your posts and Topics."} icon={<IoInformationCircleOutline />} /></div>
											<div>2</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform Fees (only for paid topics)"} para={"A platform fee is applied to all transactions for paid topics, ensuring seamless and secure handling of payments and access."} icon={<IoInformationCircleOutline />} /></div>
											<div>10% per transaction</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Gain insights into your community’s performance with detailed analytics and reports. Track engagement, measure the success of your paid topics, and make data-driven decisions to grow your community."} text={"Analytics and reports"} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>

										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-medium text-sm items-center h-[71px]">
											Not available
										</div> */}

									</div>



									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Prosite</span>
									</div>


									<div>

										{/* <div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Responsive Templates: Choose from a library of beautifully designed, mobile-friendly templates that adapt seamlessly to any device."} text={"Responsive Templates"} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:text-right pn:max-xl:max-w-[50%]">Access to premium responsive templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"}  text={"Animated intro"} icon={<IoInformationCircleOutline />} /></div>
											<div>Access to premium only</div>

										</div> */}
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Images"} pc={"-left-[40px]"} para={"Access a vast library of high-quality photos to enhance the visual appeal of your Prosite"} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 500+ illustration</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Background"} para={"Make your prosite stand out with custom backgrounds. Choose from a variety of textures, patterns, and colors to create a unique backdrop that reflects your brand's personality and style."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 100+ backgrounds</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Fonts"} pc={"-left-[40px]"} para={"Express your brand's identity with a wide range of fonts to choose from. Whether you prefer sleek and modern or classic and elegant, you'll find the perfect typography to complement your website's design."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 20+ fonts</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Templates"} pc={"-left-[40px]"} para={" Access a variety of professionally designed templates to make your prosite, store, and community pages look stunning and user-friendly."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 10 templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Uploads"} pc={"-left-[40px]"} para={"Upload your own photos, graphics, and media files with ease. Our user-friendly interface makes it simple to add content to your website and customize it to suit your needs"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upload upto 20 images</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Color Palettes"} para={" Customize your brand’s look with an array of color palettes to make your Prosite and products visually appealing and on-brand."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 15+ styles palettes</div>

										</div>

									</div>


									{/* <div className="flex font-bold px-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Quick Suggestion
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Thumbnail Generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Description generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Keyword Suggestions
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											24 hrs Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* pro */}
							<div className="md:max-lg:min-w-[471px]">
								<div>
									<div className="h-[165px] px-2 border-b bg-transparent border-[#E6E9F5]/10 flex justify-start z-20  items-center
									">
										<div className="flex flex-col w-full -mt-11 sm:mt-0 h-full-end gap-2">
											<div className="flex justify-center mt-2  items-center gap-3">
												{/* <div className="font-bold text-5xl">₹{monthprice ? pro : proy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
												<div className="flex flex-col w-[90%] justify-normal">
													<div className="font-bold text-lg">Pro</div>
													{/* <div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
													<div className="font-semibold text-4xl mt-2">₹{monthprice ? pro : proy}<span className="text-xl">/{monthprice ? "month" : "year"}</span></div>
													<div className="w-full flex justify-center items-center mt-3 ">
														<button onClick={() => buyMembership(monthprice ? pro : proy, process.env.NEXT_PUBLIC_PRO, "Pro", d.pro, dc.pro)} className="p-2 px-4 text-center hover:text-white hover:bg-[#0066FF] font-semibold border text-[#0066FF] border-[#0066FF] rounded-full w-full">Let's Begin</button>
													</div>

												</div>
											</div>
											{/* <div className="text-center font-semibold  mt-2">Unleash Your Startup's Potential!</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? pro : proy, process.env.NEXT_PUBLIC_PRO, "Pro", d.pro, dc.pro)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div> */}
										</div>
									</div>
									{isdelivery && <div className="flex font-medium px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the city)"} para={"Enjoy fast and convenient delivery within your city"} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium  ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("pro", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0   border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.pro} required />
														<button onClick={() => handlePlus("pro", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Deliveries (all over the country)"} para={"Nationwide Reach: We deliver your products to customers across the country."} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("pro", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.pro} required />
														<button onClick={() => handlePlusdc("pro", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg items-center bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 h-[71px]">
										<span class="xl:hidden block">Badge</span>
									</div>

									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Verification Badge"} para={"Gain instant recognition and establish trust within your communities and with potential customers."} icon={<IoInformationCircleOutline />} /></div>
											<div><MdVerified className="text-[#27AE60] text-2xl " /></div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Direct Messaging"} para={"Send direct messages to any user  in chat conversations without needing a request."} icon={<IoInformationCircleOutline />} /></div>
											<div>
												{/* <MdVerified className="text-[#27AE60] text-2xl " /> */}
												27
											</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Custom Domain Names"} para={" Get a personalized domain name like username.grovyo.com /Free Option: Create a custom profile URL with grovyo.com/username"} icon={<IoInformationCircleOutline />} /></div>
											<div><MdVerified className="text-[#27AE60] text-2xl " /></div>

										</div>

									</div>

									<div className="flex font-bold px-4 text-lg items-center bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 h-[71px]">
										<span class="xl:hidden block">Store</span>
									</div>


									<div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Listings"} para={"Create your products on Grovyo and showcase them on the web, app, and anywhere else your audience is.Z"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 10 products</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform  Fees"} para={"Grow your business while keeping costs manageable with a competitive platform fee on every sale."} icon={<IoInformationCircleOutline />} /></div>
											<div>3% per transaction</div>

										</div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Collections"} para={"Organize your products into collections for easier browsing and better customer experience."} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="pn:max-xl:max-w-[50%] pn:max-xl:text-right">Upto 2 collections (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Review Time"} para={"Get your products reviewed and approved within a specified timeframe to ensure quality and compliance."} icon={<IoInformationCircleOutline />} /></div>
											<div>6 Hrs</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Analytics and Reports"} para={"Gain valuable insights into your store's performance with detailed analytics. Track sales, top-selling items, and customer behavior to optimize your offerings."} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Discounts and Promotions"} para={"Create and manage discounts and promotional offers to boost your sales and attract more customers."} icon={<IoInformationCircleOutline />} /></div>
											<div>Not available</div>

										</div>

									</div>

									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 pn:max-xl:rounded-xl items-center h-[71px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} icon={<IoInformationCircleOutline />} para={"Create Multiple Communities with a Single Account: Manage multiple communities focused on different topics, allowing you to expand your reach and income potential."} text={"Create Community"} /></div>
											<div className="pn:max-xl:max-w-[50%] text-right">Upto 5 communities (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Topics (free/paid)"} para={"Monetize your expertise by creating paid topics. Offer exclusive content, courses, or discussions that members can access for a fee, adding value to your community."} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 5 topics (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Tag Multiple Communities"} para={"Collaborate and engage with multiple communities seamlessly by tagging them in your posts and Topics."} icon={<IoInformationCircleOutline />} /></div>
											<div>5</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform Fees (only for paid topics)"} para={"A platform fee is applied to all transactions for paid topics, ensuring seamless and secure handling of payments and access."} icon={<IoInformationCircleOutline />} /></div>
											<div>3% per transaction</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Gain insights into your community’s performance with detailed analytics and reports. Track engagement, measure the success of your paid topics, and make data-driven decisions to grow your community."} text={"Analytics and reports"} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>

										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-medium text-sm items-center h-[71px]">
											Not available
										</div> */}

									</div>


									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 pn:max-xl:rounded-xl items-center h-[71px]">
										<span class="xl:hidden block">Prosite</span>
									</div>

									<div>
										{/* 
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Responsive Templates: Choose from a library of beautifully designed, mobile-friendly templates that adapt seamlessly to any device."} text={"Responsive Templates"} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:text-right pn:max-xl:max-w-[50%]">Access to premium responsive templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"}  text={"Animated intro"} icon={<IoInformationCircleOutline />} /></div>
											<div>Access to premium only</div>

										</div> */}
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Images"} pc={"-left-[40px]"} para={"Access a vast library of high-quality photos to enhance the visual appeal of your Prosite"} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 5k+ illustration</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Background"} para={"Make your prosite stand out with custom backgrounds. Choose from a variety of textures, patterns, and colors to create a unique backdrop that reflects your brand's personality and style."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 1k+ backgrounds</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Fonts"} pc={"-left-[40px]"} para={"Express your brand's identity with a wide range of fonts to choose from. Whether you prefer sleek and modern or classic and elegant, you'll find the perfect typography to complement your website's design."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 100+ fonts</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Templates"} pc={"-left-[40px]"} para={" Access a variety of professionally designed templates to make your prosite, store, and community pages look stunning and user-friendly."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 15 templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Uploads"} pc={"-left-[40px]"} para={"Upload your own photos, graphics, and media files with ease. Our user-friendly interface makes it simple to add content to your website and customize it to suit your needs"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upload upto 50 images</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Color Palettes"} para={" Customize your brand’s look with an array of color palettes to make your Prosite and products visually appealing and on-brand."} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[50%] pn:max-xl:text-right">access upto 100+ styles palettes</div>

										</div>

									</div>



									{/* <div className="flex font-bold px-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Quick Suggestion
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Thumbnail Generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Description generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Keyword Suggestions
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* premium */}
							<div className="md:max-lg:min-w-[471px]">
								<div>
									<div className="h-[165px] px-2 border-b border-[#E6E9F5]/10 flex justify-start z-20  items-center
									">
										<div className="flex flex-col w-full -mt-11 sm:mt-0 h-full-end gap-2">
											<div className="flex justify-center mt-2  items-center gap-3">
												{/* <div className="font-bold text-5xl">₹{monthprice ? premium : premiumy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
												<div className="flex flex-col w-[90%] justify-normal">
													<div className="font-bold text-lg">Premium</div>
													{/* <div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div> */}
													<div className="font-semibold text-4xl mt-2">₹{monthprice ? premium : premiumy}<span className="text-xl">/{monthprice ? "month" : "year"}</span></div>
													<div className="w-full flex justify-center items-center mt-3 ">
														<button onClick={() => buyMembership(monthprice ? premium : premiumy, process.env.NEXT_PUBLIC_PREMIUM, "Premium", d.premium, dc.premium)} className="p-2 px-4 text-center hover:text-white hover:bg-[#0066FF] font-semibold border text-[#0066FF] border-[#0066FF] rounded-full w-full">Let's Begin</button>
													</div>

												</div>
											</div>
											{/* <div className="text-center font-semibold  mt-2">Exclusivity Redefined!</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? premium : premiumy, process.env.NEXT_PUBLIC_PREMIUM, "Premium", d.premium, dc.premium)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div> */}
										</div>
									</div>
									{isdelivery && <div className="flex font-medium px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 rounded-r-xl items-center h-[71px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover text={"Deliveries (all over the city)"} para={"Enjoy fast and convenient delivery within your city"} color={"bg-[#1b2431] text-white"} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("premium", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.premium} required />
														<button onClick={() => handlePlus("premium", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border-b pn:max-xl:justify-between items-center border-[#E6E9F5]/10 px-4 font-medium text-sm h-[90px] sm:h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover text={"Deliveries (all over the country)"} para={"Nationwide Reach: We deliver your products to customers across the country."} color={"bg-[#1b2431] text-white"} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="flex items-center h-full pn:max-xl:max-w-[50%]">
												<form className="max-w-xs sm:flex-row flex-col flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium  ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("premium", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.premium} required />
														<button onClick={() => handlePlusdc("premium", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 mt-4 pn:max-xl:rounded-xl rounded-r-xl items-center h-[71px]">
										<span class="xl:hidden block">Badge</span>
									</div>
									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Verification Badge"} para={"Gain instant recognition and establish trust within your communities and with potential customers."} icon={<IoInformationCircleOutline />} /></div>
											<div><MdVerified className="text-[#27AE60] text-2xl " /></div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Direct Messaging"} para={"Send direct messages to any user  in chat conversations without needing a request."} icon={<IoInformationCircleOutline />} /></div>
											<div>
												{/* <MdVerified className="text-[#27AE60] text-2xl " /> */}
												55
											</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block">
												<Hover color={"bg-[#1b2431] text-white"} text={"Custom Domain Names"} para={" Get a personalized domain name like username.grovyo.com /Free Option: Create a custom profile URL with grovyo.com/username"} icon={<IoInformationCircleOutline />} /></div>
											<div><MdVerified className="text-[#27AE60] text-2xl " /></div>

										</div>

									</div>
									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl rounded-r-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Store</span>
									</div>

									<div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Listings"} para={"Create your products on Grovyo and showcase them on the web, app, and anywhere else your audience is.Z"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upto 10 products</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform  Fees"} para={"Grow your business while keeping costs manageable with a competitive platform fee on every sale."} icon={<IoInformationCircleOutline />} /></div>
											<div>1% per transaction</div>

										</div>

										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Collections"} para={"Organize your products into collections for easier browsing and better customer experience."} icon={<IoInformationCircleOutline />} />
											</div>
											<div className="pn:max-xl:max-w-[50%] pn:max-xl:text-right">Upto 5 collections (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Product Review Time"} para={"Get your products reviewed and approved within a specified timeframe to ensure quality and compliance."} icon={<IoInformationCircleOutline />} /></div>
											<div>1 Hrs</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Analytics and Reports"} para={"Gain valuable insights into your store's performance with detailed analytics. Track sales, top-selling items, and customer behavior to optimize your offerings."} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Discounts and Promotions"} para={"Create and manage discounts and promotional offers to boost your sales and attract more customers."} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[60%] pn:max-xl:text-right">Create and manage discounts and promotions</div>

										</div>

									</div>


									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl rounded-r-xl mt-4 items-center h-[71px]">
										<span class="xl:hidden block">Community</span>
									</div>

									<div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Create Multiple Communities with a Single Account: Manage multiple communities focused on different topics, allowing you to expand your reach and income potential."} text={"Create Community"} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[50%] text-right">Upto 10 communities (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Create Topics (free/paid)"} para={"Monetize your expertise by creating paid topics. Offer exclusive content, courses, or discussions that members can access for a fee, adding value to your community."} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[50%] pn:max-xl:text-right">Upto 10 topics (one time)</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Tag Multiple Communities"} para={"Collaborate and engage with multiple communities seamlessly by tagging them in your posts and Topics."} icon={<IoInformationCircleOutline />} /></div>
											<div>15</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[77px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Platform Fees (only for paid topics)"} para={"A platform fee is applied to all transactions for paid topics, ensuring seamless and secure handling of payments and access."} icon={<IoInformationCircleOutline />} /></div>
											<div>1% per transaction</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Gain insights into your community’s performance with detailed analytics and reports. Track engagement, measure the success of your paid topics, and make data-driven decisions to grow your community."} text={"Analytics and reports"} icon={<IoInformationCircleOutline />} /></div>
											<div>Advanced analytics</div>

										</div>

										{/* <div className="flex border-b border-[#E6E9F5]/10 px-4 font-medium text-sm items-center h-[71px]">
											Not available
										</div> */}

									</div>





									<div className="flex font-bold px-4 text-lg bg-[#242832] opacity-90 pn:max-xl:rounded-xl mt-4 rounded-r-xl items-center h-[71px]">
										<span class="xl:hidden block">Prosite</span>
									</div>


									<div>

										{/* <div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} para={"Responsive Templates: Choose from a library of beautifully designed, mobile-friendly templates that adapt seamlessly to any device."} text={"Responsive Templates"} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:text-right pn:max-xl:max-w-[50%]">Access to premium responsive templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"}  text={"Animated intro"} icon={<IoInformationCircleOutline />} /></div>
											<div>Access to premium only</div>

										</div> */}
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} pc={"-left-[40px]"} text={"Images"} para={"Access a vast library of high-quality photos to enhance the visual appeal of your Prosite"} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 10k+ illustration</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Background"} para={"Make your prosite stand out with custom backgrounds. Choose from a variety of textures, patterns, and colors to create a unique backdrop that reflects your brand's personality and style."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 2k+ backgrounds</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Fonts"} pc={"-left-[40px]"} para={"Express your brand's identity with a wide range of fonts to choose from. Whether you prefer sleek and modern or classic and elegant, you'll find the perfect typography to complement your website's design."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 200+ fonts</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Templates"} pc={"-left-[40px]"} para={"Access a variety of professionally designed templates to make your prosite, store, and community pages look stunning and user-friendly."} icon={<IoInformationCircleOutline />} /></div>
											<div>access upto 30 templates</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} pc={"-left-[40px]"} text={"Uploads"} para={"Upload your own photos, graphics, and media files with ease. Our user-friendly interface makes it simple to add content to your website and customize it to suit your needs"} icon={<IoInformationCircleOutline />} /></div>
											<div>Upload upto 100 images</div>

										</div>
										<div className=" border-b border-[#E6E9F5]/10 flex pn:max-xl:justify-between px-4 font-semibold text-sm items-center h-[71px]">
											<div className="xl:hidden block max-w-[50%]">
												<Hover color={"bg-[#1b2431] text-white"} text={"Color Palettes"} para={" Customize your brand’s look with an array of color palettes to make your Prosite and products visually appealing and on-brand."} icon={<IoInformationCircleOutline />} /></div>
											<div className="pn:max-xl:max-w-[50%] pn:max-xl:text-right">access upto 200+ styles palettes</div>

										</div>

									</div>



									{/* <div className="flex font-bold px-4 text-lg items-center h-[71px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Quick Suggestion
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Thumbnail Generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Description generator
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Keyword Suggestions
										</div>
										<div className="flex border-b border-[#E6E9F5]/10 px-4 font-semibold text-sm items-center h-[71px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div >
				<div id="learnmore" className="w-full font-montserrat">
					<div className="md:text-6xl sm:text-4xl text-[22px] px-3 text-center text-gradient py-1 md:py-10 font-semibold from-gradient-start to-gradient-end ">Frequently asked questions</div>
					<div className="flex justify-center mt-7 mb-6 items-center w-full">
						<div className="sm:w-[80%] w-full sm:px-0 px-4 gap-8 flex flex-col">
							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t1 ? <FaMinus onClick={() => setToggle({ ...toggle, t1: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t1: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t1: !toggle.t1 })} className="flex flex-col gap-2">
									<div className="text-lg">What are the benefits of a membership?</div>
									<div className={`transition-opacity duration-500 ${toggle.t1 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t1 && <div className="text-[#CCCCCC]">A membership unlocks a suite of features to elevate your social commerce experience. You'll gain access to exclusive communities, build your own branded prosite, manage your store with ease, and enjoy premium delivery options. Plus, a membership badge sets you apart as a dedicated seller!</div>}

									</div>
								</div>
							</div>

							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t2 ? <FaMinus onClick={() => setToggle({ ...toggle, t2: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t2: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t2: !toggle.t2 })} className="flex flex-col gap-2">
									<div className="text-lg">Still have questions?</div>
									<div className={`transition-opacity duration-500 ${toggle.t2 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t2 && <div className="text-[#CCCCCC]">Our friendly customer support team is happy to help! You can reach them via [insert contact details].</div>}
									</div>

								</div>
							</div>

							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t3 ? <FaMinus onClick={() => setToggle({ ...toggle, t3: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t3: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t3: !toggle.t3 })} className="flex flex-col gap-2">
									<div className="text-lg">What's the benefit of the membership badge?</div>
									<div className={`transition-opacity duration-500 ${toggle.t3 ? 'opacity-100' : 'opacity-0'
										}`}>
										{toggle.t3 && <div className="text-[#CCCCCC]">The badge displayed on your profile and prosite signifies your commitment to the platform and potentially increases buyer trust.</div>}

									</div>

								</div>
							</div>

							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t4 ? <FaMinus onClick={() => setToggle({ ...toggle, t4: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t4: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t4: !toggle.t4 })} className="flex flex-col gap-2">
									<div className="text-lg">What are the premium delivery options?</div>
									<div className={`transition-opacity duration-500 ${toggle.t4 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t4 && <div className="text-[#CCCCCC]">Premium delivery upgrades let you offer faster shipping options and potentially attract more customers who prioritize quick delivery.</div>}

									</div>

								</div>
							</div>

							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t5 ? <FaMinus onClick={() => setToggle({ ...toggle, t5: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t5: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t5: !toggle.t5 })} className="flex flex-col gap-2">
									<div className="text-lg">How does the membership benefit my store?</div>
									<div className={`transition-opacity duration-500 ${toggle.t5 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t5 && <div className="text-[#CCCCCC]">You'll have access to advanced store management tools, allowing you to create promotions, track inventory, and analyze sales data. Plus, members enjoy exclusive discounts on transaction fees.</div>}

									</div>

								</div>
							</div>

							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t6 ? <FaMinus onClick={() => setToggle({ ...toggle, t6: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t6: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t6: !toggle.t6 })} className="flex flex-col gap-2">
									<div className="text-lg">What's a prosite?</div>
									<div className={`transition-opacity duration-500 ${toggle.t6 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t6 && <div className="text-[#CCCCCC]">Your prosite is your personalized storefront within the platform. It allows you to showcase your brand, curate product collections, and provide a seamless shopping experience for your customers.</div>}

									</div>

								</div>
							</div>
							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t7 ? <FaMinus onClick={() => setToggle({ ...toggle, t7: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t7: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t7: !toggle.t7 })} className="flex flex-col gap-2">
									<div className="text-lg">What are communities?</div>
									<div className={`transition-opacity duration-500 ${toggle.t7 ? 'opacity-100' : 'opacity-0'
										}`}>
										{toggle.t7 && <div className="text-[#CCCCCC]">Communities are vibrant hubs where you can connect with like-minded sellers and buyers. Share ideas, get feedback, and build relationships that foster sales.</div>}
									</div>

								</div>
							</div>
							<div className="flex border-b px-1 pb-3 border-[#30363D] gap-6">
								<div className="mt-1">
									{toggle.t8 ? <FaMinus onClick={() => setToggle({ ...toggle, t8: false })} /> : < FaPlus onClick={() => setToggle({ ...toggle, t8: true })} />}
								</div>
								< div onClick={() => setToggle({ ...toggle, t8: !toggle.t8 })} className="flex flex-col gap-2">
									<div className="text-lg">Do I need a membership to sell on the platform?</div>
									<div className={`transition-opacity duration-500 ${toggle.t8 ? 'opacity-100' : 'opacity-0'
										}`}>

										{toggle.t8 && <div className="text-[#CCCCCC]">No, you can list products for free. However, a membership unlocks a wider range of tools and benefits to help you grow your business.</div>}

									</div>

								</div>
							</div>
						</div>


					</div>
				</div>
			</div >
		</>
	);
};

export default Sample5;

