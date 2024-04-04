// import dynamic from "next/dynamic";
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import React from "react";
// import community from "../assets/image/community.json"
import Link from "next/link";
import Monetization from "../assets/image/Monetization.png";
import Image from "next/image";

const NoCommunity = () => {
	return (
		<>
			{/* <div className="flex justify-center w-full items-center pn:max-sm:h-[75vh] ">
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
			</div> */}

<div className="flex flex-col justify-center items-center w-full h-[50vh] sm:h-[70vh]">
                <div className="sm:w-auto h-full flex flex-col w-[90%] justify-center gap-4">
                  <div className="text-[#70737D] font-semibold">
                    Create Your Community & Start Earning Today!
                  </div>
                  <div className="font-semibold flex flex-col justify-center gap-3">
                    <div>Way To earn with community </div>
                    <div className="flex flex-col justify-center gap-2">
                      <div>👉 Form a community</div>
                      <div>👍 Create Posts </div>
                      <div className="sm:flex justify-center items-center gap-2">
                        👉 Attaining your audience to unlock{" "}
                        <span>
                          <Link href={"/main/earnings"}>
                            <Image
                              src={Monetization}
                              alt="monteziation"
                              className="sm:w-[120px] w-[90px]"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                      href={"/main/community/createCommunity"}
                      className="bg-[#2A85FF] text-sm text-center rounded-xl mt-2 text-white p-2 px-4"
                    >
                      Create community
                    </Link>
                </div>
              </div>
		</>
	);
};

export default NoCommunity;
