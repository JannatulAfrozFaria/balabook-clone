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
      className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-6 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
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
                    link.variant === "default" && "",
                    link.href === path
                      ? "bg-[#F2F2F2] text-[#6366F1] text-[16px] font-weight-300 bg-[#F2F2F2]" // Active background and text color
                      : "hover:bg-[#F2F2F2] text-[16px]" // Hover background color for non-active links
                  )}
                >
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
                  variant: link.href === path ? "default" : "ghost",
                  size: "lg",
                }),
                link.variant === "default" && "dark:bg-muted dark:text-white",
                "justify-start",
                link.href === path
                  ? "bg-[#F2F2F2] text-[#D4BDFC] cursor-default" // Active link styling and disabling hover effect
                  : "hover:bg-[#F2F2F2]" // Hover background color for non-active links
              )}
            >
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}

        
      </nav>
    </div>
  );
}
