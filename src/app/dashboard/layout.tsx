import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
// import Sidebar from "./sidebar/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "./sidebar/sidebar";
import StoreProvider from "../StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Registration",
  description: "App for RASA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  //  (session?.user)
  if (!session || !session.user) {
    redirect("/login");
  }
  return (
    <div className="flex w-full">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
