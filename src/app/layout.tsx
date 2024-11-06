import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import ClientRootLayout from "@/components/ClientRootLayout";
 // Import the new client component

// const inter = Inter({ subsets: ["latin"] });

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

  return (
    <ClientRootLayout>
      {children}
    </ClientRootLayout>
  );
}
