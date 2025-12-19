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
        <div className="text-center font-serif text-4xl tracking-wide">
          IVORY
          <div className="text-xs tracking-[0.35em] mt-1">FILMS</div>
        </div>

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
    <div className="mt-1">hello@ivoryfilms.in</div>
  </div>
</div>



      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 pt-6 border-t border-line text-xs flex justify-between">
        <span>© 2025, IVORYFILMS.IN, ALL RIGHTS RESERVED.</span>
        <span>Designed By ADRX</span>
      </div>

    </footer>
  );
}
