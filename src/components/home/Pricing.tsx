"use client";
import React from "react";
import PricingPlan from "./PricingPlan";

// Sample data

const Pricing = () => {
  return (
    <div className="w-full ">
      <h1 className="text-8xl font-bold text-center">
        <span className="bg-gradient-to-r from-black via-[#319393] to-[#319393] bg-clip-text text-transparent">
          Simple
        </span>{" "}
        pricing, for everyone.
      </h1>
      <p className="text-xl  mt-10 text-center ">
        We don’t lock you in with complex and misleading pricing. There are no{" "}
        <br /> installation or maintenance fees, not now, not ever.
      </p>

      <PricingPlan/>
    </div>
  );
};

export default Pricing;
