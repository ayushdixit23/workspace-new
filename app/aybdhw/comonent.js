"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "../data/Loader"
import Cookies from "js-cookie"
import { encryptaes } from "../utilsHelper/security"

const Component = () => {
	const queryParams = useSearchParams()

	const id = queryParams.get("zyxxpht")
	const path = queryParams.get("path")
	const dps = queryParams.get("dps")
	const title = queryParams.get("title")
	const category = queryParams.get("category")
	const desc = queryParams.get("desc")
	const type = queryParams.get("type")
	const memberscount = queryParams.get("memberscount")
	const comId = queryParams.get("comId")

	const tosetCookie = {
		dps,
		title,
		category,
		desc,
		type,
		memberscount
	}


	const router = useRouter()
	const waitkrnevalafunc = async (data) => {
		try {
			// localStorage.removeItem("excktn")
			// localStorage.removeItem("frhktn")

			// storeInSessionStorage(data.sessionId)
			Cookies.set(`excktn`, data.access_token)
			Cookies.set(`frhktn`, data.refresh_token)

			// localStorage.setItem(`excktn`, data.access_token)
			// localStorage.setItem(`frhktn`, data.refresh_token)
			// localStorage.setItem(`excktn${data.sessionId}`, data.access_token)
			// localStorage.setItem(`frhktn${data.sessionId}`, data.refresh_token)
			if (comId) {
				Cookies.set("comedta", JSON.stringify(tosetCookie))
				Cookies.set("cmdyd", encryptaes(comId))
			}
			return true;
		} catch (e) {
			console.log(e);
		}
	};

	const f = async () => {

		const res = await axios.get(`https://work.grovyo.xyz/api/v1/fetchwithid/${id}`)
		console.log(res.data)
		if (res.data?.success) {
			const a = await waitkrnevalafunc(res.data);
			if (a === true) {
				if (path) {
					router.push(path)
				} else {
					router.push("/main/dashboard")
				}
			} else {
				router.push("/login")
			}

		} else {
			toast.error("Something Went Wrong");
			router.push("/login")
		}
	}

	useEffect(() => {
		if (id) {
			f()
		}
	}, [id])


	return (
		<>
			<Loader />
		</>
	)
}

export default Component