import Image from "next/image";
import Link from "next/link";
import { FaInstagram , FaMapMarkerAlt} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-[#F3ECE2] px-6 md:px-20 py-12 text-sm text-black">

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">

        {/* LEFT (Desktop: Left aligned, Mobile: Center) */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 order-2 md:order-1">
          <span className="uppercase tracking-widest font-medium">Contact Us</span>

          {/* Vertical gold line (Hidden on mobile) */}
          <span className="hidden md:block h-12 w-px bg-yellow-600/50"></span>
        </div>

        {/* CENTER LOGO (Desktop: Center, Mobile: Top) */}
        <div className="order-1 md:order-2 flex-1 flex justify-center">
          <Link href="/" className="relative w-40 h-16 md:w-48 md:h-20">
            <Image
              src="/light.png"
              alt="Somu Films"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* RIGHT (Desktop: Right aligned, Mobile: Center) */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 order-3">

          {/* Vertical gold line (Hidden on mobile) */}
          <span className="hidden md:block h-12 w-px bg-yellow-600/50"></span>

          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
            <Link
              href="https://www.instagram.com/somu.films?igsh=MW55bG55bWRiMW1vYw=="
              target="_blank"
              className="inline-block transition-colors duration-300 hover:text-yellow-600"
            >
              <FaInstagram className="text-xl" />
            </Link>

            <div className="flex flex-col md:items-end gap-1">
              <a href="tel:+919348037248" className="hover:text-gray-600 transition-colors">+91 9348037248</a>
              <a href="mailto:hello@somufilms.in" className="hover:text-gray-600 transition-colors">hello@somufilms.in</a>
               {/* LOCATION */}
  <a
    href="https://maps.app.goo.gl/QrpscN4xVNQVDPKT6?g_st=aw"
    target="_blank"
    className="flex items-center gap-2.5 text-sm md:text-base text-gray-600 hover:text-yellow-600 transition-colors mt-1"
  >
    <FaMapMarkerAlt className="text-lg md:text-xl" />
    Odisha, India
  </a>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 pt-6 border-t border-gray-300 text-[10px] md:text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-wider">
        <span>© 2025, SOMUFILMS.IN, ALL RIGHTS RESERVED.</span>
        
      </div>

    </footer>
  );
}
