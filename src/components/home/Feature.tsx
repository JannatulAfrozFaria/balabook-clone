"use client";
import { AudioLines, Banknote, CalendarClock, FilePieChart, FolderInput, MessageSquareCode, Receipt, TabletSmartphone, Users } from "lucide-react";
import React from "react";

// Sample data

const Feature = () => {
  const cardData = [
    {
      id:1,
      title: "Collaborate with your team",
      description:
        "Invite team members to your account, set user roles to match your needs and keep things running smoothly.",
      icon: <Users className="w-[50px] h-[50px]" color="#414141" />,
    },
    {
      id:2,
      title: "Create, send and track invoices",
      description:
        "Craft super sleek and branded invoices in a few clicks. Look pro, get paid faster, and invest your time somewhere else.",
      icon: <Receipt className="w-[50px] h-[50px]" color="#414141"/>,
    },
    {
      id:3,
      title: "Invoice abroad in multiple currencies",
      description:
        "From Cyprus to the world. Handle over 30+ currencies with real-time rates.",
      icon: <Banknote className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:4,
      title: "Easy peasy reporting",
      description:
        "Export reports in a few clicks and impress your accountant or partner.",
      icon:<FilePieChart className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:5,
      title: "Send reminders & view history",
      description:
        "Send reminders, keep your finances tight, and keep the tax man happy.",
      icon: <CalendarClock className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:6,
      title: "Effortless AI-Powered expense management",
      description:
        "Effortlessly manage your expenses with our AI-powered tool. Stay on top of your finances with none of the headaches.",
      icon: <AudioLines className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:7,
      title: "Import data from other apps",
      description:
        "Switch from Wave or Quickbooks with a few clicks. Need to move from another provider? Contact us for custom migration support",
      icon: <FolderInput className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:8,
      title: "Get a birds eye view with dashboard & analytics",
      description:
        "Get the full real-time financial picture at a glance and stay ahead of the game.",
      icon: <Banknote className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:9,
      title: "Manage multiple companies within your account",
      description:
        "Run your business empire from one place. Perfect for the multi-talented entrepreneur.",
      icon: <TabletSmartphone className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:10,
      title: "Encrypted Data",
      description:
        "Protect your sensitive financial information with top-tier encryption, built for your peace of mind.",
      icon: <MessageSquareCode className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:11,
      title: "Anywhere, any device",
      description:
        "Your finances at your fingertips—anytime, anywhere, on any device.",
      icon: <TabletSmartphone className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    {
      id:12,
      title: "Developed by accountants",
      description:
        "Trust in tools crafted by experts who know your financial needs best.",
      icon: <MessageSquareCode className="w-[50px] h-[50px] text-red" color="#414141" />,
    },
    
  ];

  return (
    <div className="w-full mt-10">
      <h1 className="text-8xl font-bold">
        Powerful and simple features for business owners and accountants.
      </h1>
      <div className="flex w-1/2">
        <p className="text-xl font-normal mt-4">
          Balabook offers a suite of comprehensive accounting features, crafted
          to simplify financial management for business owners, accountants, and
          bookkeepers.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-14">
        {
            cardData?.map((item, i) => (
                <div className="h-[260px] bg-[#F2F2F2] rounded-4xl rounded-[30px] p-6" key={i}>
                    <button >{item.icon}</button>
                    <p className="text-xl  mt-4 font-semibold">{item.title}</p>
                    <p className="text-xl  mt-4 font-normal">{item.description}</p>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Feature;
