import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line px-20 py-12 text-sm">

      {/* TOP SECTION */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <span>Contact Us</span>

          {/* vertical gold line */}
          <span className="h-20 w-px bg-gold"></span>
        </div>

        {/* CENTER LOGO */}
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
<div className="flex items-center gap-14">

  {/* taller vertical gold line */}
  <span className="h-20 w-px bg-gold"></span>

  <div className="text-center">
    <Link
      href="https://instagram.com"
      target="_blank"
      className="inline-block transition-colors duration-300 hover:text-gold"
    >
      <FaInstagram className="text-lg mb-6 mx-auto" />
    </Link>

    <div className="mb-4">+91 9737188899</div>
    <div className="mt-1">hello@somufilms.in</div>
  </div>
</div>



      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 pt-6 border-t border-line text-xs flex justify-between">
        <span>© 2025, SOMUFILMS.IN, ALL RIGHTS RESERVED.</span>
        
      </div>

    </footer>
  );
}
