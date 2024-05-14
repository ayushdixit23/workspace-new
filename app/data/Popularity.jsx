import React from "react";
import circle from "../assets/image/circle.svg";
import Image from "next/image";
import { FcInfo } from "react-icons/fc";
import Hover from "./Hover";
const Popularity = ({ state }) => {
  const rotationAngle =
    ((state.popularity ? state.popularity : 0) / 100) * 180 - 90;
  return (
    <>
      <div className="rounded-xl w-full p-3 max-h-[300px] sm:max-h-[220px]  dark:bg-[#323d4e] bg-white  flex flex-col gap-3 flex-grow sm:bg-[#F9F9F9]">
        <div className="flex justify-between items-center p-1 px-3">
          <div className="flex items-center w-full gap-1">
            <Hover text={"Popularity"}
              para={"Popularity Meter: Increase your earnings by building a strong and engaged community! Your popularity score directly affects your income."}
            />
          </div>
          <div className="text-2xl font-bold">
            {state?.popularity ? state?.popularity : 0}%
          </div>
        </div>
        <div className="flex justify-center h-fit items-center">
          {/* speed meter */}
          <div className="relative -top-2 sm:-top-3 md:min-w-[300px]">
            <div className="flex justify-center items-center">
              <Image src={circle} alt="circle" className="" />
            </div>

            <div
              className={`${(state.popularity ? state.popularity : 0) >= 0 &&
                (state.popularity ? state.popularity : 0) <= 50
                ? "bg-[#ff718b]"
                : null
                } ${(state.popularity ? state.popularity : 0) > 50 &&
                  (state.popularity ? state.popularity : 0) <= 65
                  ? "bg-[#FCB5C3]"
                  : null
                } ${(state.popularity ? state.popularity : 0) > 65 &&
                  (state.popularity ? state.popularity : 0) <= 80
                  ? "bg-[#fce83a]"
                  : null
                } ${(state.popularity ? state.popularity : 0) > 80 &&
                  (state.popularity ? state.popularity : 0) <= 100
                  ? "bg-[#7fe47e]"
                  : null
                }  flex top-32 left-[132px] flex-col gap-2 justify-center items-center w-3 h-3 rounded-full absolute`}
            >
              <div
                style={{
                  transformOrigin: "bottom left",
                  transform: `rotate(${rotationAngle}deg)`,
                }}
                className="relative flex justify-center items-center duration-700 transition transform rotate-45 origin-bottom-left"
              >
                <div
                  className={`${(state.popularity ? state.popularity : 0) >= 0 &&
                    (state.popularity ? state.popularity : 0) <= 50
                    ? "bg-[#ff718b]"
                    : null
                    } ${(state.popularity ? state.popularity : 0) > 50 &&
                      (state.popularity ? state.popularity : 0) <= 65
                      ? "bg-[#FCB5C3]"
                      : null
                    } ${(state.popularity ? state.popularity : 0) > 65 &&
                      (state.popularity ? state.popularity : 0) <= 80
                      ? "bg-[#fce83a]"
                      : null
                    } ${(state.popularity ? state.popularity : 0) > 80 &&
                      (state.popularity ? state.popularity : 0) <= 100
                      ? "bg-[#7fe47e]"
                      : null
                    } absolute bottom-0 rounded-t-full -left-[3px] h-[100px] w-2 `}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-center">Get suggestion to grow faster</div> */}
      </div>
    </>
  );
};

const MemorizedPopularity = React.memo(Popularity)

export default MemorizedPopularity;
