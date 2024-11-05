"use client";

import Banner from "@/components/home/Banner";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import InfoCard from "@/components/home/InfoCard";
import Pricing from "@/components/home/Pricing";
import Promotion from "@/components/home/Promotion";

export default async function Home() {
  return (
    <main className="flex flex-col gap-6 w-full max-w-full md:max-w-[1440px] mx-auto min-h-screen px-4 ">
        <Hero/>
        <Feature/>
        <Banner/>
        <InfoCard/>
        <Promotion/>
        <Pricing/>
    </main>
  );
}
