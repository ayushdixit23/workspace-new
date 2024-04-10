"use client"
import React, { useEffect, useState } from "react";
import useTokenAndData from "./tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import { ThemeProvider } from "@/components/theme-provider";

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
  const dispatch = useDispatch();
  useEffect(() => {

    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
    }

  }, [isValid, data, dispatch]);


  return <>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider >
  </>;
};

export default TokenDataWrapper;
