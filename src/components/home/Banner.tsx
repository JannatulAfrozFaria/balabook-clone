"use client";
import React from "react";
import { Button } from "../ui/button";

// Sample data

const Banner = () => {
  return (
    <div className="w-full h-[390px] bg-[#319393] rounded-[30px] mt-10 flex flex-col justify-center item-left px-8">
      <h1 className="text-5xl text-bold text-white font-bold">Book a Free Consultation</h1>
      <p className="text-xl  mt-4 text-white">Book a demo and discover how Balabook can help you streamline your accounting.</p>
      <Button className="w-[150px] text-sm bg-[#FCF044] mt-6">Book a Demo Call</Button>
    </div>
  );
};

export default Banner;
