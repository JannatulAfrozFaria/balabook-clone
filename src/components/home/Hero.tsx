"use client";
import React from "react";

// Sample data

const Hero = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <div className="flex  bg-[#414141] w-[250px] rounded-full p-[2px]">
          <div className="bg-[#FFF03F] px-2 rounded-full ">
            <p className="text-sm">New</p>
          </div>
          <p className="text-sm text-white ml-2">VAT made simple is now live!</p>
        </div>
        <h1 className="text-8xl font-bold">
          Accounting for Cyprus' Business Owners and Accountants.
        </h1>
        <p className="text-xl font-normal mt-4">Simple. Smart. Secure.</p>
        <p className="text-xl font-normal mt-4">Balabook is the simplest, most efficient accounting software for business owners and accountants in Cyprus. Gain real-time financial control and spend less time on accounting, more on growing your business.</p>
      </div>
    </div>
  );
};

export default Hero;
