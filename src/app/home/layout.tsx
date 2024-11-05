import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreProvider from "../StoreProvider";
import Sidebar from "../dashboard/sidebar/sidebar";
import Navbar from "@/components/Navbar";

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
      {/* <div className="hidden lg:block">
        <Sidebar />
      </div> */}
      {/* Navbar for mobile and tablet devices */}
      <div className="lg:hidden block mt-10">
        <Navbar/>
      </div>
      {/* Main content */}
      <div className="flex-grow mt-10">{children}</div>
    </div>
  );
}
