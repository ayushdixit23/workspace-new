import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import React from "react";
import community from "../assets/image/community.json"
import Link from "next/link";

const NoCommunity = () => {
	return (
		<>
			<div className="flex justify-center w-full items-center pn:max-sm:h-[75vh] ">
				<div className="flex justify-center items-center flex-col sm:max-w-[500px]">
					<Lottie
						animationData={community}
						width={200}
						height={200}
						loop={true}
					/>
					<div>
						<Link className="bg-[#2D9AFF] text-white p-3 mt-4 relative sm:left-8 z-10 text-center font-semibold px-5 text-sm rounded-lg" href={"/main/community/createCommunity"}>
							Let's Create your first Community!
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default NoCommunity;
