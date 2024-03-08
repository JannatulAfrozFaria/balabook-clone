"use client"
import { Nav } from "@/components/ui/nav";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Cog,
  LayoutDashboard,
  Mail,
  Power,
  SearchCheck,
  ShoppingCart,
  Users,
  Users2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  // const { user } = session;
  // console.log("sidebar", session?.user)

  const [isCollapsed, setIsCollapsed] = useState(false);
  const navCllaps = () => {
    setIsCollapsed(!isCollapsed);
  };
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  useEffect(() => {
    mobileWidth ? setIsCollapsed(true) : setIsCollapsed(false);
  }, [mobileWidth]);
  return (
    <TooltipProvider>
      <div className="relative min-w-[80px] border-r px-3 pb-20 pt-10 h-screen">
        <div className="flex gap-3 justify-center">
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
          <div className={`${isCollapsed && "hidden"}`}>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "default",
                href: "/dashboard",
              },
              {
                title: "Offers",
                label: "",
                icon: Archive,
                variant: "ghost",
                href: "/dashboard/offers",
              },
              {
                title: "Orders",
                label: "",
                icon: ShoppingCart,
                variant: "ghost",
                href: "/dashboard/orders",
              },
              {
                title: "Customer",
                label: "",
                icon: Users,
                variant: "ghost",
                href: "/dashboard/customer",
              },
              {
                title: "Users",
                label: "",
                icon: Users2,
                variant: "ghost",
                href: "/dashboard/users",
              },
              {
                title: "Check Point",
                label: "",
                icon: SearchCheck,
                variant: "ghost",
                href: "/dashboard/check-point",
              },
              {
                title: "SMS",
                label: "",
                icon: Mail,
                variant: "ghost",
                href: "/dashboard/sms",
              },
              {
                title: "Setting",
                label: "",
                icon: Cog,
                variant: "ghost",
                href: "/dashboard/setting",
              },
            ]}
          />

          
        </div>
        <div className={`${isCollapsed && "hidden"}`}>
          <p className={`md:flex text-sm absolute bottom-5`}>
            {" "}
            <small>Powred By:</small>{" "}
            <b>
              <i>
                <span className="text-sky-600">tech</span>soul
              </i>
            </b>
          </p>
        </div>
        {!mobileWidth && (
          <div className="absolute right-[5px] bottom-10  h-4 w-4">
            <Button
              variant="secondary"
              className="rounded-full p-2"
              onClick={navCllaps}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
