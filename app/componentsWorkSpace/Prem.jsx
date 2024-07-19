import React, { useState } from "react";
import Flow from "../assets/icons/Flow.json";
import Lottie from "lottie-react";
import NewMembershipPopup from "./NewMembershipPopup";

const Prem = ({
  text,
  bgimage,
  height = "h-[220px]",
  buttontext = "Buy premium to Unlock",
}) => {
  const [pop, setPop] = useState(false);
  return (
    <>
      {pop && (
        <div className="fixed inset-0 z-50 w-screen flex justify-center items-center bg-black bg-opacity-10 backdrop-blur">
          <NewMembershipPopup setPop={setPop} />
          {/* <MembershipPopup setPop={setPop} /> */}
        </div>
      )}

      <div className={`w-full ${bgimage} bg-cover ${height}`}>
        <div className="flex flex-col h-full justify-center p-2 items-center">
          <div
            style={{ textShadow: "2px 2px 4px rgba(250, 250, 250, .09)" }}
            className="font-semibold text-[15px]  leading-7 text-center"
          >
            {text}
          </div>
          <div className="sm:h-[60px] sm:mt-1 mt-3 h-[40px] pp:w-[230px] w-[200px] rounded-2xl relative flex justify-center items-center">
            <Lottie animationData={Flow} width={200} height={200} loop={true} />
            <div
              onClick={() => {
                setPop(true);
              }}
              className="py-2  text-[14px] cursor-pointer flex justify-center font-semibold items-center gap-1 px-2.5 sm:px-5 absolute text-black rounded-2xl "
            >
              {buttontext}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prem;
