"use client";

import Link from "next/link";
import { LucideIcon, Power } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { useWindowWidth } from "@react-hook/window-size";
import { signOut } from "next-auth/react";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const router = useRouter();

  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  const path = `/${segments.slice(0, 2).join("/")}`;

  // console.log(path);

  const onlyWidth = useWindowWidth();
  const logOutHandler = async () => {
    const signout = await signOut();
    if (signout) {
      router.push("/login");
    }
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: link.href === path ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: link.href === pathName ? "default" : "ghost",
                  size: "lg",
                }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}

        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={logOutHandler}
                variant="ghost"
                className="h-9 w-9 p-0"
              >
                <Power className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Logout
              {/* <span className="ml-auto text-muted-foreground">
                    Logout
                  </span> */}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={logOutHandler}
            variant="ghost"
            className="justify-start "
          >
            <Power className="mr-2 ml-4 h-4 w-4" />
            Logout
            {/* <span
                  className={cn(
                    // "ml-auto",
                  )}
                >
                  Logout
                </span> */}
          </Button>
        )}
      </nav>
    </div>
  );
}
