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
  const { data: session } = useSession();
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
        className={`relative border-r px-3 pb-20 pt-[14px] h-screen transition-all duration-300 ${
          isCollapsed ? "min-w-[80px] max-w-[80px]" : "min-w-[260px] max-w-[260px]"
        }`}
      >
        <div className="flex gap-3 justify-start">
          <img
            src="https://my.balabook.com/assets/balabook_logomark_main_rgb-3cd81c5087139c4d4724f0fd9dcceadba6dedc42d835079a40db432e7d2a867c.svg"
            alt="Logo"
            className="max-h-[70px] max-w-[70px]"
          />
        </div>

        <div className="pt-12 md:pt-4">
          <Nav
            isCollapsed={isCollapsed}
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
                href: "/dashboard/items",
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
