import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import React from "react";
import animationData from "../assets/image/animationData.json"

const NoCommunity = () => {
	return (
		<>
			<div className="flex justify-center w-full sm:overflow-hidden items-center pn:max-sm:h-[75vh] ">
				<div className="sm:max-h-[500px] sm:max-w-[500px]">
					<Lottie
						animationData={animationData}
						width={200}
						height={200}
						loop={true}
					/>
				</div>
			</div>
		</>
	);
};

export default NoCommunity;
