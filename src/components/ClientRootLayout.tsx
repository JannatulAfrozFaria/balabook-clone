"use client";
import { usePathname } from "next/navigation";
import HomeNav from "@/components/HomeNav";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex w-full sm:flex-row">
      {/* Render HomeNav only if on root route */}
      {pathname === "/" && <HomeNav />}
      <div className="flex-grow ">{children}</div>
    </div>
  );
}
