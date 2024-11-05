import React, { useState } from "react";
import { Button } from "../ui/button";

type PricingOption = {
  plan: string;
  price: string;
  features: string[];
  description: string;
};

const PricingPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  const monthlyPricing: PricingOption[] = [
    {
      plan: "Basic",
      price: "10/mo",
      features: ["Up to 5 Invoices / Month", "Up to 5 Credit Notes / Month", "Un to 5 Bills / Month", "Up to 10 Expenses / Month", "Dashboard", "Single User", "Basic Financial Reporting"],
      description:
        "Start for free and scale with Balabook. Perfect for startups and small businesses looking to stay on top of their finances effortlessly.",
    },
    {
      plan: "Standard",
      price: "20/mo",
      features: ["Unlimited Invoices & Credit Notes", "Unlimited Bills & Expenses", "2 Users + Your Accountant", "User Roles", "Multi-Currency", "Audit Logs", "VAT Returns", "Migration Support", "Add an Additional User for €10 + VAT / User / Month"],
      description:
        "Ideal for growing businesses and freelancers needing advanced tools to streamline bookkeeping, manage transactions, and generate detailed reports with ease.",
    },
    {
      plan: "Coming Soon",
      price: "",
      features: [
        // "Feature 1",
        // "Feature 2",
        // "Feature 3",
        // "Feature 4",
        // "Feature 5",
      ],
      description: "Coming Soon...",
    },
  ];

  const yearlyPricing: PricingOption[] = [
    {
      plan: "Basic",
      price: "100/yr",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      description:
        "Start for free and scale with Balabook. Perfect for startups and small businesses looking to stay on top of their finances effortlessly.",
    },
    {
      plan: "Standard",
      price: "200/yr",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      description:
        "Ideal for growing businesses and freelancers needing advanced tools to streamline bookkeeping, manage transactions, and generate detailed reports with ease.",
    },
    {
      plan: "Premium",
      price: "300/yr",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
      description: "",
    },
  ];

  const handleTabClick = (tab: "monthly" | "yearly") => {
    setActiveTab(tab);
  };

  const pricingOptions =
    activeTab === "monthly" ? monthlyPricing : yearlyPricing;

  return (
    <div className="w-full mx-auto p-6 ">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 ${
            activeTab === "monthly"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "yearly"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Options */}
      <div className="flex gap-6 w-full">
        {pricingOptions.map((option) => (
          <div key={option.plan} className="w-1/3 h-full p-6 shadow-lg rounded-3xl ">
            <h3 className=" font-semibold mb-2 text-[16px]">{option.plan}</h3>
            <p className="text-4xl font-bold  mb-4 text-[#414141]">
              €{option.price}
            </p>
            <p className=" font-normal text-gray-500 mb-2 text-[16px] ">
              {option.description}
            </p>
            <ul className="text-gray-600">
              {option.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full text-sm bg-[#FCF044] mt-6">
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
