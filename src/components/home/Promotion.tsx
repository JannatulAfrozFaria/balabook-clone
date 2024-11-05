"use client";
import React from "react";
import Image from "next/image";
import BannerBg from '../../../public/img/promotionBg.png'

// Sample data

const Promotion = () => {
  return (
<div className="w-full relative px-8 flex items-center justify-center">
  <h1 className="text-8xl absolute top-0 left-0 font-bold z-0 text-[#F5F5F7]">Made for accountants.</h1>
  <div className="z-10 mt-10">
    <Image src={BannerBg} alt="promotion" />
  </div>
</div>

  );
};

export default Promotion;
