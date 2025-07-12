import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaPhone,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/ConvergeAI_logo.png"
function Navbar() {
  const navItems = [
    { label: "Home", id: "home", icon: <FaHome /> },
    { label: "Features", id: "features", icon: <FaCogs /> },
    { label: "About", id: "about", icon: <FaInfoCircle /> },
    { label: "Contact", id: "contact", icon: <FaPhone /> },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full bg-[#DDE6ED] text-[#27374D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center h-20">
        {/* Left: Logo */}
        <div><img src={logo} alt="" className="w-40 h-40"/></div>

        {/* Center: Nav Items */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-2 hover:text-[#9DB2BF] cursor-pointer transition-all duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right: GitHub Button */}
        <a
          href="https://github.com/juniorcoder02/ConvergeAI"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#DDE6ED] text-[#27374D] px-4 cursor-pointer py-2 rounded-md text-md hover:bg-[#27374D] hover:text-[#DDE6ED] transition-all"
        >
          <FaGithub className="inline-block mr-2" />
          GitHub
        </a>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-center flex-wrap p-2 gap-4 bg-[#DDE6ED] border-t border-[#27374D]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-1 text-xs hover:text-[#9DB2BF]"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
