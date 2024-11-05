// MobileNavbar.tsx
import React from "react";

const MobileNavbar = ({ isOpen, onToggle }) => {
    const navLinks = [
        { name: "Dashboard", href: "/dashboard/" },
        { name: "Item", href: "/dashboard/item" },
      ];
  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-black/90 transition-all duration-300 ${
        isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
      }`}
    >
      <nav className="p-5">
        <ul className="nav-ul">
          {navLinks.map((item, i) => (
            <li key={i} className="nav-li">
              <a
                className="nav-li_a text-neutral-400 hover:text-white transition-colors"
                href={item.href}
                onClick={onToggle} // Close the menu when an item is clicked
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbar;
