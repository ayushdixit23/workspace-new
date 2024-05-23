"use client"
import React, { useEffect, useState } from "react";
import useTokenAndData from "./tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import { ThemeProvider } from "@/components/theme-provider";
import { redirect, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loader from "../data/Loader";

export const storeInSessionStorage = (sessionId) => {
  try {

    if (typeof window !== undefined) {
      sessionStorage.setItem("sessionId", sessionId);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getItemSessionStorage = () => {
  try {

    if (typeof window != undefined) {
      const sessionId = sessionStorage.getItem("sessionId");
      return sessionId;
    }
  } catch (error) {
    console.log(error);
  }
}

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  const path = usePathname()
  const [loading, setLoading] = useState(true)
  const exactpath = ["/login", "/aybdhw", "/contact", "/cancellation", "/deleterequest", "/privacy", "/requestdata", "/return", "/shipping", "/terms"]
  const dispatch = useDispatch();
  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
    }
    const token = Cookies.get(`frhktn`)
    if (!token && !exactpath.includes(path)) {
      redirect("/login");
    }
    if (token && (path === "/login" || path === "/")) {
      redirect("/main/dashboard");
    }
    setLoading(false)

  }, [isValid, data, dispatch]);

  return <>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      {loading ? <Loader /> : <>
        <div className="w-screen h-screen overflow-y-scroll no-scrollbar">
          {children}
        </div>
      </>}

    </ThemeProvider >
  </>;
};

export default TokenDataWrapper;
