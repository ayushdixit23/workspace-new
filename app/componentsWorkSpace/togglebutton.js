import React from "react";
import { useState } from "react";

function togglebutton() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" select-none">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={`h-6 w-12 rounded-[15px] flex  items-center ${
          open ? " bg-red-500" : "bg-green-500"
        }`}
      >
        <div
          className={`h-5 w-5 bg-white rounded-full m-1  duration-150 ${
            open ? "" : "ml-6 bg-white "
          }`}
        ></div>
      </div>
    </div>
  );
}

export default togglebutton;
