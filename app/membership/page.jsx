"use client"
import { useEffect, useState } from "react";
import { getData } from "../utilsHelper/Useful";
import axios from "axios"
import useRazorpay from "react-razorpay";
import { useMemfinalizeMutation } from "../redux/apiroutes/payment";
import { useRouter } from "next/navigation";
import { storeInSessionStorage } from "../utilsHelper/Tokenwrap";
import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import membership from "../assets/image/membership.json"
import { TbTruckDelivery } from "react-icons/tb";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Sample5 = () => {
	const [monthprice, setMonthPrice] = useState(true);
	const [Razorpay] = useRazorpay()
	const { id, fullname } = getData()

	const [plus, setPlus] = useState(null)
	const [pro, setPro] = useState(null)
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
			console.log(res.data)
			const membershipId = res.data.memid
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

						if (resp.data.success) {
							// localStorage.removeItem(`excktn`)
							// localStorage.removeItem(`frhktn`)
							Cookies.remove("excktn")
							Cookies.remove("frhktn")

							Cookies.set(`excktn`, resp.data.access_token)
							Cookies.set(`frhktn`, resp.data.refresh_token)
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


	useEffect(() => {
		const a = d.plus * 4
		const b = dc.plus * 7
		const sum = a + b

		setPlus(424 + sum)
		setPlusy(5315 + sum)
	}, [d.plus, dc.plus])

	useEffect(() => {
		const a = d.pro * 4
		const b = dc.pro * 7
		const sum = a + b

		setPro(1774 + sum)
		setProy(21365 + sum)
	}, [d.pro, dc.pro])

	useEffect(() => {
		const a = d.premium * 4
		const b = dc.premium * 7
		const sum = a + b

		setPremium(3124 + sum)
		setPremiumy(37415 + sum)
	}, [d.premium, dc.premium])

	return (
		<>

			{
				memberPop && <div className="fixed inset-0 w-screen z-50 flex justify-center font-semibold text-sm text-[#101828] items-center h-screen bg-black/50">
					<div className="bg-white w-[50%] rounded-xl">
						<Lottie animationData={membership}></Lottie>
						<div className="flex justify-center items-center">
							<div className="relative text-2xl font-bold -top-16">Membership Purchased Successfully!</div>
						</div>
					</div>

				</div>
			}

			<Toaster />
			<div className="bg-white min-h-[100vh] no-scrollbar flex items-center justify-center">
				<div className="sm:mx-5 mx-2 pb-10">
					{/* Ai */}
					<div className="py-2 lg:py-2 mt-8 flex flex-col w-full   text-[#101828]">
						<span className="font-semibold  text-3xl sm:text-5xl mt-3 sm:mb-4">
							Membership has its privileges.
						</span>
						<span className="sm:text-xl text-lg font-medium">
							Simple, transparent pricing that grows with you. Try any plan
							for 30 days.
						</span>
						{/* <div className="flex gap-2 p-2 mt-2 text-red-300 justify-between  bg-[#f9f9f9] px-4 relative shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452]  items-center rounded-2xl">
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
						</div> */}
						<div className="flex gap-2 p-2 mt-2 text-red-300 justify-between  bg-[#f9f9f9] px-4 relative shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452]  items-center rounded-2xl">
							<div className="flex justify-center py-3 gap-3 items-center">

								<TbTruckDelivery className="w-[50px] h-[50px]" />
								<div className="flex flex-col justify-center">
									<div className="font-medium text-base  text-[#101828] ">Want to deliver your Products?</div>
									<div className="font-medium  text-[#060a11] text-sm">Get upto 10 deliveries free  </div>
								</div>

							</div>
							<div className="flex items-center space-x-2">

								<Switch checked={isdelivery} onCheckedChange={setIsDelivery} id="airplane-mode" />
							</div>
							{/* <div className="px-2 py-2 bg-[#F2F4F7] space-x-1 flex justify-center items-center rounded-full">
								<button
									onClick={() => setIsDelivery(false)}
									className={`py-2 px-2 md:px-1.5 sm:px-6 drop-shadow-md hover:bg-white  text-[#667085] hover:text-black rounded-full
                ${isdelivery === false ? "bg-white border-[#94a3b8] border text-black " : ""}`}
								>

								</button>
								<button
									onClick={() => setIsDelivery(true)}
									className={`ml-1 py-2 px-2 md:px-1.5 sm:px-6 border-[#94a3b8] drop-shadow-md hover:bg-white text-[#667085]  hover:text-black rounded-full
                ${isdelivery === true ? "bg-white border-[#94a3b8] border text-black" : ""}`}
								>

								</button>
							</div> */}
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

					<div className="flex justify-center mt-6 items-center w-full">
						<div className="grid xl:grid-cols-5 gap-10 sm:gap-5 xl:gap-0 sm:grid-cols-2 w-full">
							<div className="xl:block hidden">
								<div>
									<div className="h-[150px] px-2 font-semibold text-sm  border border-[#E6E9F5] flex justify-start z-20 bg-white sticky top-0 left-0  items-center
									">
										<div className="flex flex-col  text-black gap-2">
											<div className="flex items-center gap-3">
												<div className="text-2xl text-black">Compare plans</div>
												{/* <div className="border border-[#E6E9F5] rounded-3xl p-2">40% Off</div> */}
											</div>
											<div>Choose your workspace plan according to your organisational plan</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										Deliveries
									</div>}
									{isdelivery && <div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Deliveries (all over the city)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Delivery Options (all over the country)
										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										Badge
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Badge
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										Store
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Product Listings
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Platform  Fees
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Create Collections
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Product Review Time
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Analytics and Reports
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Discounts and Promotions
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										Community
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Create Community
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Create Topics (free/paid)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Platform Fees (only for paid topics)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Analytics and reports
										</div>
										{/* <div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Members Recognition
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										Prosite
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Responsive Templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Animated intro
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Images
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Backgrounds
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Fonts
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Uploads
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Color Palettes
										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										AI Support
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Quick Suggestion
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Thumbnail Generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Description generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Keyword Suggestions
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* free */}
							<div className="md:max-lg:min-w-[450px]">
								<div>
									<div className="h-[150px] px-2 border border-[#E6E9F5] flex justify-start z-20 bg-white sticky top-0 left-0 items-center
									">
										<div className="flex flex-col w-full sticky top-0 left-0 h-full-end gap-2">
											<div className="flex justify-center mt-2 text-black  items-center gap-3">
												<div className="font-bold text-5xl">Free</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div>
											</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] justify-center h-[50px]">
											<div>10 Deliveries for free</div>
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Upto 5 deliveries
										</div>

									</div>}
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Up-to 5 Products
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											20% per transaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											1
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											24 Hrs
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Basic analytics
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Not available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 2 communities
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 2 topics
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											20% per transaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Basic analytics
										</div>
										{/* <div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not available
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Prosite</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Limited selection of templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not available
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 70+ illustration
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 50+ backgrounds
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 10+ free fonts
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 5 templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upload upto 10 images
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 10+ styles palettes
										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Ai Support</span>
									</div> */}
									{/* <div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Limited selection of templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not available
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not available
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Not available
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Basic Support
										</div>

									</div> */}
								</div>
							</div>


							{/* plus */}
							<div className="md:max-lg:min-w-[450px]">
								<div>
									<div className="h-[150px] px-2 border border-[#E6E9F5] flex justify-start z-20 bg-white sticky top-0 left-0  items-center
									">
										<div className="flex flex-col w-full  h-full-end gap-2">
											<div className="flex justify-center mt-2 text-black  items-center gap-3">
												<div className="font-bold text-5xl">₹{monthprice ? plus : plusy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div>
											</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? plus : plusy, process.env.NEXT_PUBLIC_PLUS, "Plus", d.plus, dc.plus)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[50px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("plus", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.plus} required />
														<button onClick={() => handlePlus("plus", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[70px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("plus", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.plus} required />
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
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Badge</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 5 products
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											10% per transaaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											1
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											16 hrs
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Not Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 3 communities (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 3 topics (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											10% per transaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										{/* <div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Recognition and badges for premium members
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Prosite</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium responsive templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium only
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 500+ illustration
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 100+ backgrounds
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 20+ fonts
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 10 templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upload upto 20 images
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 15+ styles palettes
										</div>


									</div>
									{/* <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Quick Suggestion
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Thumbnail Generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Description generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Keyword Suggestions
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											24 hrs Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* pro */}
							<div className="md:max-lg:min-w-[450px]">
								<div>
									<div className="h-[150px] px-2 border border-[#E6E9F5] flex justify-start z-20 bg-white sticky top-0 left-0  items-center
									">
										<div className="flex flex-col w-full  h-full-end gap-2">
											<div className="flex justify-center mt-2 text-black items-center gap-3">
												<div className="font-bold text-5xl">₹{monthprice ? pro : proy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div>
											</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? pro : proy, process.env.NEXT_PUBLIC_PRO, "Pro", d.pro, dc.pro)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[50px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("pro", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.pro} required />
														<button onClick={() => handlePlus("pro", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[70px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("pro", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.pro} required />
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
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Badge</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 10 products
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											3% per transaaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 2 collections (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											6 hrs
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Not Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 5 communities (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 5 topics (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											3% per transaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										{/* <div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Recognition and badges for premium members
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Prosite</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium responsive templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium only
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 5k+ illustration
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 1k+ backgrounds
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 100+ fonts
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 15 templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upload upto 50 images
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 100+ styles palettes
										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Quick Suggestion
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Thumbnail Generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Description generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Keyword Suggestions
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>

							{/* premium */}
							<div className="md:max-lg:min-w-[450px]">
								<div>
									<div className="h-[150px] px-2 border border-[#E6E9F5] flex justify-start z-20 bg-white sticky top-0 left-0  items-center
									">
										<div className="flex flex-col w-full  h-full-end gap-2">
											<div className="flex justify-center mt-2 text-black items-center gap-3">
												<div className="font-bold text-5xl">₹{monthprice ? premium : premiumy}</div>
												<div className="text-sm -ml-2 mt-3">/{monthprice ? "month" : "year"}</div>
											</div>
											<div className="w-full flex justify-center items-center mt-3 ">
												<button onClick={() => buyMembership(monthprice ? premium : premiumy, process.env.NEXT_PUBLIC_PREMIUM, "Premium", d.premium, dc.premium)} className="bg-[#0066FF] p-3 px-4 text-white font-semibold text-sm rounded-lg w-full">Choose This Plan</button>
											</div>
										</div>
									</div>
									{isdelivery && <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Deliveries</span>
									</div>}
									{isdelivery && <div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[50px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinus("premium", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={d.premium} required />
														<button onClick={() => handlePlus("premium", 10)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
										<div className="flex border flex-col border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] h-[70px]">


											<div className="flex h-full">
												<form className="max-w-xs flex items-center gap-2">
													<label htmlFor="counter-input" className="block mb-1 text-sm font-medium text-gray-900 ">Choose quantity:</label>
													<div className="relative flex items-center">
														<button onClick={() => handleMinusdc("premium", 10)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
															<svg className="w-2.5 h-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
																<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
															</svg>
														</button>
														<input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={dc.premium} required />
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
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Badge</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Available
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Store</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 10 products
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											1% per transaaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 5 collections (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											1 hrs
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											Create and manage discounts and promotions
										</div>
									</div>
									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Community</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 10 communities (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upto 10 topics (one time)
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[70px]">
											1% per transaction
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Advanced analytics
										</div>
										{/* <div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Recognition and badges for premium members
										</div> */}

									</div>

									<div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Prosite</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium responsive templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Access to premium only
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 10k+ illustration
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 2k+ backgrounds
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 200+ fonts
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 30 templates
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Upload upto 100 images
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											access upto 200+ styles palettes
										</div>

									</div>
									{/* <div className="flex font-bold px-4 text-lg text-[#101828] items-center h-[50px]">
										<span class="xl:hidden block">Ai Support</span>
									</div>
									<div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Quick Suggestion
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Thumbnail Generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Description generator
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Keyword Suggestions
										</div>
										<div className="flex border border-[#E6E9F5] px-4 font-semibold text-sm text-[#101828] items-center h-[50px]">
											Contact Support
										</div>

									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div >
			</div >
		</>
	);
};

export default Sample5;

