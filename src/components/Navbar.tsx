"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Import the icons
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get the current pathname

    const navLinks = [
        {
            id: 1,
            name: 'Dashboard',
            href: '/dashboard',
        },
        {
            id: 2,
            name: 'Items',
            href: '/items',
        },

    ];


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50  px-4 py-3 flex justify-between items-center text-white">


            {/* Toggle button for mobile */}
            <button onClick={toggleMenu} className="text-white focus:outline-none sm:hidden">
                {isOpen ? <Menu size={24} color="black" /> : <Menu size={24} color="black" />}
            </button>

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 left-0 h-full w-full flex transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Main white sidebar (3/4 width) */}
                <div className="w-3/4 bg-white shadow-lg text-black">
                    <div className="p-6">
                        <div className="flex gap-3 justify-start">
                            <img
                                src="https://my.balabook.com/assets/balabook_logomark_main_rgb-3cd81c5087139c4d4724f0fd9dcceadba6dedc42d835079a40db432e7d2a867c.svg"
                                alt="Logo"
                                className="max-h-[90px] max-w-[90px]"
                            />
                        </div>

                        <div className="h-[40px] w-[40px] border-4 border-[#6366F1] flex items-center justify-center rounded-full bg-gray mt-10">
                            <h1 className="text-bold text-[16px] text-[#6366F1]">NI</h1>
                        </div>
                    </div>

                    <ul className="mt-20 space-y-8 p-5 w-full">
                        {navLinks.map((item) => (
                            <li key={item.id} className="w-full">
                                <a
                                    href={item.href}
                                    className={`text-lg font-medium transition-colors  p-4 ${pathname === item.href
                                            ? " text-[#5F43FF] bg-[#F2F2F2] rounded-lg" // Active state
                                            : "bg-white text-black" // Inactive state
                                        } hover:bg-gray-200 hover:text-gray-700`}
                                    onClick={() => setIsOpen(false)} // Close the menu on item click
                                >
                                    <button className="w-[90%]  text-left">{item.name}</button>
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Blurred overlay (1/4 width) */}
                <div
                    className="w-1/4 bg-white bg-opacity-20 backdrop-blur-md"
                    onClick={() => setIsOpen(false)} // Close the menu when clicking on the overlay
                />
            </nav>

        </header>
    );
};

export default Navbar;
