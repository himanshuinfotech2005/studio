import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Navbar({ white = false }) {
  return (
    <header
      className={`w-full px-16 py-6 flex items-center ${
        white ? "text-white" : ""
      }`}
    >
      {/* LEFT MENU */}
      <nav className="flex gap-8 text-sm">
        <Link href="/photography">Photography</Link>
        <Link href="/films">Films</Link>
        <Link href="/editorial">Editorial</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/contact-us">Contact Us</Link>
        <Link href="/faqs">FAQs</Link>
      </nav>

      {/* LOGO (PURE ml / mr CONTROL) */}
      <Link href="/" className="flex items-center mt-2 ml-auto mr-[400px]">
        <Image
          src="/images/logo/somu.PNG"
          alt="Somu Films"
          width={200}
          height={80}
          priority
          className="object-contain"
        />
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <Link href="https://instagram.com" target="_blank" className="transition-colors duration-300">
          <FaInstagram className={`text-lg ${
      white
        ? "text-white hover:text-gold"
        : "text-black hover:text-gold"
    }`} />
        </Link>

        <Link
          href="/contact-us"
          className="bg-gold text-white px-5 py-2 rounded-md text-sm"
        >
          Get In Touch
        </Link>
      </div>
    </header>
  );
}
