"use client";
import React, { useEffect, useState } from "react";
import w1 from "../assets/image/w1.png"
import w2 from "../assets/image/w2.png"
import w3 from "../assets/image/w3.png"
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
const Number = dynamic(() => import('./number/page'), { ssr: false })

export default function LoginLayout({ children }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [{
    img: w1, msg: `"Earn With Us"`
  }, { img: w2, msg: `"Effortless Selling Solutions."` }, { img: w3, msg: `"Stay updated on your progress."` }];
  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-screen w-screen dark:bg-[#273142] bg-white flex pn:max-sm:flex-col">
      <div className="w-[50%] h-full flex py-20 justify-end items-center pn:max-sm:hidden">
        <div className="overflow-hidden w-[98%] rounded-xl bg-[#A5BEFE] h-[95vh] pt-36">
          <div
            className="relative flex transition-transform duration-500 transform"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (

              <div
                key={index}
                className="h-[50vh] w-full flex-col flex-shrink-0 bg-lightgray flex items-center justify-center text-black text-2xl"
              >
                <div className="mb-10 font-semibold text-3xl text-center text-[#0066FF]">{slide.msg}</div>
                <Image priority src={slide.img} alt="hlo" />
              </div>

            ))}
          </div>

          <div className="flex justify-center pt-24">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 duration-500 rounded-full mx-2 ${index === activeSlide ? 'bg-blue-500' : 'bg-white'
                  }`}
              ></div>
            ))}
          </div>

        </div>
      </div>
      <div className="w-[50%] h-[100%] relative flex justify-center items-center pn:max-sm:w-[100%] pn:max-sm:h-[100%]">
        <Number />
      </div>
      <div className="flex absolute bottom-3  w-[100%] flex-wrap justify-end items-center dark:text-white text-[#414141] gap-4 text-[12px] select-none">
        <div className="flex sm:bottom-3 w-[50%] pn:max-sm:w-full flex-wrap justify-center items-center  dark:text-white text-[#414141] gap-4 text-[12px] select-none">
        <Link href={"../terms"}>T&C</Link>
        <Link href={"../privacy"}>Privacy</Link>
        <Link href={"../contact"}>Contact Us</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/requestdata"}>Request Data</Link>
        <Link href={"/deleterequest"}>Delete Request</Link>
        <Link href={"../shipping"}>Shipping</Link>
        <Link href={"../cancellation"}>Cancellation</Link>
        <Link href={"../return"}>Return Policy</Link>
        </div>
      </div>
    </div >
  );
}
