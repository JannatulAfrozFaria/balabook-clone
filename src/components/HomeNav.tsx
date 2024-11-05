"use client";

import Link from "next/link";

export default function HomeNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white bg-opacity-50 backdrop-blur-md shadow-md">
      <nav className="flex items-center justify-between w-full max-w-[1440px] mx-auto py-4 px-6">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/path/to/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#home" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
          <Link href="#features" className="text-gray-800 hover:text-blue-500">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-800 hover:text-blue-500">
            Pricing
          </Link>
          <Link href="#contact" className="text-gray-800 hover:text-blue-500">
            Contact
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/signin" className="text-gray-800 font-bold">
            Sign In
          </Link>
          <Link href="/get-started">
            <button className="px-4 py-2 bg-[#FCF044]  rounded-md text-black font-bold  transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
