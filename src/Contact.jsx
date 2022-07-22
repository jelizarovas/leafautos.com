import React from "react";
import { MdLocationPin, MdPhone } from "react-icons/md";

export const Contact = () => {
  return (
    <div className="bg-main text-white ">
      <div className="w-full h-full bg-white bg-opacity-20 py-2 flex items-center justify-around md:justify-center space-x-10">
        <a
          href="tel:2066024363"
          aria-label="Call to Set Appointment"
          className="flex space-x-2 items-center py-6 px-4 rounded-xl hover:bg-black hover:bg-opacity-20 transition-all"
        >
          <MdPhone className="text-3xl mx-2 " />
          <div className="flex flex-wrap flex-col md:flex-row space-x-2">
            <span>(206) 602-4363 </span>
            <span> Appointment Only</span>
          </div>
        </a>
        <a
          aria-label="Open Location"
          target="_blank"
          rel="noopener noreferrer"
          className="flex space-x-2 items-center py-6 px-4 rounded-xl hover:bg-black hover:bg-opacity-20 transition-all"
          href="https://www.google.com/maps/place/Leaf+Autos/@47.5807092,-122.3732136,15z/data=!4m5!3m4!1s0x0:0xc2b3d46bb38eb852!8m2!3d47.5807092!4d-122.3732136"
        >
          <MdLocationPin className="text-3xl mx-2" />
          <div className="flex flex-wrap flex-col md:flex-row space-x-2">
            <span>2501 B Harbor Ave SW, </span> <span> Seattle, WA 98126</span>
          </div>
        </a>
      </div>
    </div>
  );
};
