import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import HomeNav from "@/components/HomeNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Balabook - Clone",
  description: "App for RASA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  // Uncomment this block if you want to redirect unauthenticated users to login page
  // if (!session || !session.user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex w-full sm:flex-row">
      {/* Sidebar for larger screens */}
      <HomeNav/>
      <div className="flex-grow mt-10">{children}</div>
    </div>
  );
}
