"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import lightLogo from "../public/light.png";
import darkLogo from "../public/images/logo/somu.png";
export default function Navbar({ white = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Determine text color based on state
  const isTransparent = white && !scrolled;
  const textColorClass = isTransparent ? "text-white" : "text-black";
  const bgColorClass = isTransparent ? "bg-transparent" : "bg-[#F3ECE2]/95 backdrop-blur-sm shadow-sm";

  // Left side links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Photography", href: "/photography" },
    { name: "Films", href: "/films" },
    { name: "Editorial", href: "/editorial" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className={`fixed p-2 top-0 left-0 w-full z-50 transition-all duration-300 ${bgColorClass}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between relative">
        
        {/* --- DESKTOP LEFT: NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-start">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-medium hover:opacity-60 transition-opacity ${textColorClass} ${
                pathname === link.href ? "border-b border-current pb-1" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- CENTER: LOGO (BIGGER) --- */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <Link href="/" className="relative block w-40 h-16 md:w-56 md:h-24">
             <Image
              src={isTransparent ? darkLogo : lightLogo} 
              alt="Somu Films"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* --- DESKTOP RIGHT: GET IN TOUCH --- */}
        <div className="hidden md:flex items-center justify-end flex-1">
          <Link
            href="/contact-us"
            className={`text-xs uppercase tracking-widest font-medium border border-current px-6 py-2 rounded-full hover:opacity-60 transition-opacity ${textColorClass}`}
          >
            Get in Touch
          </Link>
        </div>

        {/* --- MOBILE: HAMBURGER (RIGHT) --- */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`z-50 p-2 focus:outline-none ${textColorClass}`}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div
          className={`fixed inset-0 bg-[#F3ECE2] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Combine links + Contact for mobile menu */}
          {[...navLinks, { name: "Get in Touch", href: "/contact-us" }].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl font-serif text-black hover:text-gray-600 transition-colors ${
                pathname === link.href ? "italic" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
