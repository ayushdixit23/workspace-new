"use client";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "@/app/data/Loader";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("./component"), { ssr: false });

export default function Page() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </>
  );
}
