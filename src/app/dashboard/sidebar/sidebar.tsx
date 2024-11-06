"use client";
import { Nav } from "@/components/nav";
import {
  LayoutDashboard,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { useSession } from "next-auth/react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navCllaps = () => {
    setIsCollapsed(!isCollapsed);
  };
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    setIsCollapsed(mobileWidth);
  }, [mobileWidth]);

  return (
    <TooltipProvider>
      <div
        className={`relative  px-3 pb-20 pt-[14px] h-screen transition-all duration-300 ${
          isCollapsed ? "min-w-[80px] max-w-[80px]" : "min-w-[260px] max-w-[260px]"
        }`}
      >
        <div className="flex gap-3 justify-start mb-8">
          {/* <img
            src="https://my.balabook.com/assets/balabook_logomark_main_rgb-3cd81c5087139c4d4724f0fd9dcceadba6dedc42d835079a40db432e7d2a867c.svg"
            alt="Logo"
            className="max-h-[90px] max-w-[90px]"
          /> */}
          <h1 className="text-3xl font-bold uppercase">Logo</h1>
        </div>

        {/* <div className="h-[40px] w-[40px] border-4 border-[#6366F1] flex items-center justify-center rounded-full bg-gray mt-10">
          <h1 className="text-bold text-[16px] text-[#6366F1]">NI</h1>
        </div> */}
        <hr  className="border-black "/>

        <div className="pt-12 md:pt-0">
          <Nav
            isCollapsed={isCollapsed}
            // @ts-ignore
            links={[
              {
                title: "Dashboard",
                label: "",
                variant: "",
                href: "/dashboard",
              },
              {
                title: "Items",
                label: "",
                variant: "",
                href: "/items",
              },
              {
                title: "Partners",
                label: "",
                variant: "",
                href: "/partners",
              },
              {
                title: "Sales",
                label: "",
                variant: "",
                href: "/sales",
              },
              {
                title: "Purchases",
                label: "",
                variant: "",
                href: "/purchases",
              },
              {
                title: "Reports",
                label: "",
                variant: "",
                href: "/reports",
              },
              {
                title: "Accountant",
                label: "",
                variant: "",
                href: "/accountant",
              },
            ].filter(Boolean)}
          />
          <hr  className="border-black "/>
          <h1 className="uppercase font-semibold px-2 pt-4">Others</h1>
          <Nav
            isCollapsed={isCollapsed}
            // @ts-ignore
            links={[
              {
                title: "Support",
                label: "",
                variant: "",
                href: "/support",
              },
              {
                title: "Settings",
                label: "",
                variant: "",
                href: "/settings",
              },
              
            ].filter(Boolean)}
          />
        </div>

        {/* {!mobileWidth && (
          <div className="absolute right-5 bottom-10 h-4 w-4">
            <Button
              variant="secondary"
              className="rounded-full p-2"
              onClick={navCllaps}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        )} */}
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
