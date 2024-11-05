"use client";
import Image from "next/image";
import React from "react";
import InvoiceScreen from "../../../public/img/InvoiceScreen.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Sample data

const InfoCard = () => {
  return (
    <div className="w-full mt-10 ">
      <h1 className="text-8xl font-bold ">
        Spend less time on accounting, more on{" "}
        <span className="bg-gradient-to-r from-black via-[#319393] to-[#319393] bg-clip-text text-transparent">
          growing
        </span>{" "}
        your business.
      </h1>
      <p className="text-xl  mt-4 w-1/2">
        Abandon expensive and ancient server-based solutions or generic
        international apps. Embrace what you business truly needs to grown from
        Cyprus to the world!
      </p>

      <div className="flex mt-10 gap-6">
        <div className="w-3/5 px-6 h-[720px] bg-[#FCFCFC] border rounded-[30px] overflow-hidden">
          <h2 className="text-3xl font-bold mt-6 text-[#414141]">
            Invoices, Expenses, Bills & Reports.
          </h2>
          <p className="text-xl  mt-4 text-gray-400">
            Easily manage everyone's invoices, expenses, bills, and reports all
            in one place.
          </p>

          <div className="w-full bg-[#FFED36] px-4 mt-6 pt-4 rounded-xl ">
            <Image src={InvoiceScreen} alt="" className="h-[600px]" />
          </div>
        </div>

        <div className="w-2/5">
          <div className="h-[340px] bg-[#FCFCFC] border rounded-[30px] px-6">
            <h2 className="text-3xl font-bold mt-6 text-[#414141]">
            Made in Cyprus for Cyprus.
            </h2>
            <p className="text-xl  mt-4 text-gray-400">
            Built in Limassol by business owners, accountants, and our local team.
            </p>

            <div>
              <Avatar className="w-[100px] h-[100px] mt-8">
                <AvatarImage
                  src="https://cdn.prod.website-files.com/6696242ed4529a0e39b4dea3/66e0335e6ebbf5454eddbd1d_bb_homepage_avatars_zen-p-500.png"
                  alt="@shadcn"
                />
                <AvatarFallback className="font-bold">CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="h-[360px] mt-6 bg-[#FCFCFC] border rounded-[30px] px-6">
            <h2 className="text-3xl font-bold mt-6 text-[#414141]">
            Multi-Currency.
            </h2>
            <p className="text-xl  mt-4 text-gray-400">
            From Cyprus to the world. Handle over 30+ currencies with automated daily rates.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-10 gap-6">
      <div className="flex gap-6">
      <div className="h-[360px] w-2/5 mt-6 bg-[#FCFCFC] border rounded-[30px] px-6">
            <h2 className="text-3xl font-bold mt-6 text-[#414141]">
            Easy. No installation. No maintenance.
            </h2>
            <p className="text-xl  mt-4 text-gray-400">
            Do your own accounting without accounting knowledge and with zero headaches.
            </p>
          </div>

          <div className="h-[360px] w-3/5 mt-6 bg-[#FCFCFC] border rounded-[30px] px-6">
            <h2 className="text-3xl font-bold mt-6 text-[#414141]">
            Get a birds eye view with dashboard & analytics.
            </h2>
            <p className="text-xl  mt-4 text-gray-400">
            Get the full real-time financial picture at a glance and stay ahead of the game.
            </p>
          </div>
        </div>
      </div>

      <div className="flex">

      </div>
    </div>
  );
};

export default InfoCard;
