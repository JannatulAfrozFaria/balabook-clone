import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Head from "next/head";
import { Facebook, Youtube, Twitter, Copyright } from "lucide-react";
import rasa from "../../public/img/logo.png";
import { FC } from "react";
import { Clock, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProgramCardProps {
  title: string;
  description: string;
  time: string;
  date: string;
}

export const ProgramCard: FC<ProgramCardProps> = ({
  title,
  description,
  time,
  date,
}) => (
  <Card>
    <CardContent className="pt-4 pb-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-md font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex-col items-start mt-2">
          <div className="flex text-sm">
            <Clock className="text-gray-500 h-4 w-4 mr-1" />
            <span className="text-gray-500">{time}</span>
          </div>
          <div className="flex text-sm">
            <Calendar className="text-gray-500 h-4 w-4 mr-1" />
            <span className="text-gray-500">{date}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default async function Home() {
  // const data = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col">
      {/* {JSON.stringify(data)} */}

      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white py-2 flex justify-between items-center px-8">
          <div className="flex items-center">
            {/* Your logo goes here */}
            <Image
              alt="Rasa Logo"
              src={rasa}
              style={{
                maxHeight: "100%",
                height: "auto",
              }}
            />
            <span className="ml-2 font-semibold">RASA KHULNA EVENTS</span>
          </div>
          <div className="flex space-x-4">
            <Facebook className="hover:text-blue-600 cursor-pointer" />
            <Youtube className="hover:text-red-600 cursor-pointer" />
            <Twitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </header>
        {/* Hero Section */}
        <section
          className="h-96 flex items-center justify-center relative"
          style={{
            backgroundImage: 'url("/img/hero-BG1.jpeg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-0"></div>
          <div className="text-center z-10">
            {/* <h1 className="text-4xl font-bold text-white mb-4">
              RASA KHULNA EVENTS
            </h1>
            <p className="text-xl text-white mb-8">
              First Bangladesh Internet Product Exhibition
            </p>*/}
            <Link
              href="/registration"
              className="bg-red-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-500 transition duration-300"
            >
              Register Now
            </Link>
          </div>
        </section>
        {/* Program List */}
        <section className="py-8">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Program List</h2>
            <section className="py-2 grid md:grid-cols-2 gap-4">
              {/* Cards for your programs */}
              {/* Example card: */}
              <ProgramCard
                title="First Bangladesh Internet Product Exhibition (Khulna)"
                description="শহীদ শেখ আবু নাসের ব্যাংকুয়েট হল, খুলনা প্রেসক্লাব, স্যার ইকবাল রোড, খুলনা| সোমবার, ৪ই মার্চ  ২০২৪"
                time="10:00 AM - 07:00PM"
                date="2024-03-04"
              />
              {/* <ProgramCard
                title="Program Title 2"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              />
              <ProgramCard
                title="Program Title 3"
                description="Description of Program 1."
                time="10:00 AM"
                date="2022-03-01"
              />
              <ProgramCard
                title="Program Title 4"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              />
              <ProgramCard
                title="Program Title 5"
                description="Description of Program 1."
                time="10:00 AM"
                date="2022-03-01"
              />
              <ProgramCard
                title="Program Title 6"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              />
              <ProgramCard
                title="Program Title 1"
                description="Description of Program 1."
                time="10:00 AM"
                date="2022-03-01"
              />
              <ProgramCard
                title="Program Title 2"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              />
              <ProgramCard
                title="Program Title 3"
                description="Description of Program 1."
                time="10:00 AM"
                date="2022-03-01"
              />
              <ProgramCard
                title="Program Title 4"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              />
              <ProgramCard
                title="Program Title 5"
                description="Description of Program 1."
                time="10:00 AM"
                date="2022-03-01"
              />
              <ProgramCard
                title="Program Title 6"
                description="Description of Program 2."
                time="02:30 PM"
                date="2022-03-02"
              /> */}
              {/* Repeat the card structure for each program */}
            </section>
          </div>
        </section>
        {/* Registration CTA */}
        <section
          id="registration"
          className="h-80 flex items-center justify-center relative py-24"
          style={{
            backgroundImage: 'url("/img/cta-background.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="text-center z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Register Now!
            </h2>
            <p className="text-white mb-8">
              Don not miss out on this amazing event. Register now to secure
              your spot!
            </p>
            <Link href="/registration">
              <button className="bg-white text-black px-6 py-2 mt-4 rounded-full">
                Register Now
              </button>
            </Link>
          </div>
        </section>

        <section className="py-20 grid md:grid-cols-3 gap-4 px-8">
          {/* Ads content goes here */}
          <div className="h-72 bg-gray-200 justify-center items-center flex">
            <p className="text-gray-400">Add Space</p>
          </div>
          <div className="h-72 bg-gray-200 justify-center items-center flex">
            <p className="text-gray-400">Add Space</p>
          </div>
          <div className="h-72 bg-gray-200 justify-center items-center flex">
            <p className="text-gray-400">Add Space</p>
          </div>
        </section>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p className="text-sm flex justify-center">
            <Copyright className="h-4 w-4" /> 2024 RASA. All rights reserved.
          </p>
          <p className="text-sm">
            Powered by{" "}
            <Link href="https://techsoulbd.com">
              <b>
                <i>techsoul</i>
              </b>
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
