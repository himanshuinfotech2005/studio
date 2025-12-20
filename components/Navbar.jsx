"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import lightLogo from "../public/light.png";
import darkLogo from "../public/images/logo/somu.png";
import { FaInstagram } from "react-icons/fa";

export default function Navbar({ white = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isTransparent = white && !scrolled;
  // Force black text when menu is open so the close button is visible on the light overlay
  const textColor = isOpen ? "text-black" : (isTransparent ? "text-white" : "text-black");
  const bgColor = isTransparent
    ? "bg-transparent backdrop-blur-0 shadow-none"
    : scrolled
      ? "bg-[#F3ECE2]/90 backdrop-blur-md shadow-sm"
      : "bg-transparent";

  const navLinks = [
    { name: "Photography", href: "/photography" },
    { name: "Films", href: "/films" },
    { name: "Editorial", href: "/editorial" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "FAQs", href: "/faqs" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${bgColor}`}>
        <div className="relative h-32 px-10 md:px-16 flex items-center pt-5">

          {/* ================= LEFT LINKS ================= */}
          <div className="hidden md:flex flex-1 items-center gap-6 justify-start -ml-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] tracking-widest font-medium transition-colors duration-300 
                  ${textColor} hover:text-gold
                  ${pathname === link.href ? "border-b border-current pb-1" : ""}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ================= CENTER LOGO ================= */}
          <div className="absolute left-1/2 top-1/2 sm:-translate-x-1/4 -translate-x-1/2 -translate-y-1/2 mt-2">
            <Link href="/" className="block pl-10 w-44 h-18 md:w-56 md:h-22">
              <Image
                src={isTransparent ? darkLogo : lightLogo}
                alt="Somu Films"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* ================= RIGHT (INSTAGRAM + CTA) ================= */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-8">

            {/* Instagram */}
            <Link
              href="https://instagram.com"
              target="_blank"
              className={`transition-colors duration-300 -ml-2 ${
                // Use isTransparent here directly since textColor is now affected by isOpen
                isTransparent ? "text-white hover:text-gold" : "text-black hover:text-gold"
              }`}
            >
              <FaInstagram className="text-xl" />
            </Link>

            {/* Get in Touch */}
            <Link
              href="/contact-us"
              className="text-xs uppercase tracking-widest font-medium
                bg-gold text-white px-6 py-3 rounded-[5px]
                transition-opacity duration-300 hover:opacity-80"
            >
              Get in Touch
            </Link>
          </div>


          {/* ================= MOBILE HAMBURGER ================= */}
          {/* Added z-50 relative to ensure button stays on top of the overlay */}
          <div className="flex md:hidden flex-1 justify-end relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${textColor}`}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`h-0.5 bg-current transition ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 bg-current transition ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU (Moved outside nav to ensure full viewport coverage) ================= */}
      <div
        className={`fixed font-soligant inset-0 bg-[#F3ECE2] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ height: '100dvh' }} // Ensure full dynamic viewport height
      >
        {[...navLinks, { name: "Get in Touch", href: "/contact-us" }].map(
          (link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-4xl font-serif text-black hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </>
  );
}
