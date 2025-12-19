"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

/* ================= HERO SLIDER IMAGES ================= */
const heroImages = [
  "/images/photography/hero-1.jpg",
  "/images/photography/hero-2.jpg",
  "/images/photography/hero-3.jpg",
];

export default function PhotographyPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= 1. BIG HERO SLIDER ================= */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* NAVBAR OVER HERO */}
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>

        {/* HERO IMAGES */}
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Ivory Films Photography"
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* WHITE DASH INDICATORS */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] w-10 ${
                i === active ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. EDITORIAL CARDS ================= */}
      <section className="px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {editorial.map((item, i) => (
            <div
              key={i}
              className="flex flex-col h-full"
            >

              {/* IMAGE — SAME SIZE */}
              <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* TITLE + LOCATION */}
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-serif text-xl">
                  {item.title}
                </h3>
                <span className="text-sm text-muted">
                  {item.place}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm leading-7 text-muted mb-4 flex-grow">
                {item.desc}
              </p>

              {/* READ MORE */}
              <span className="text-sm font-medium mt-auto">
                READ MORE →
              </span>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}

/* ================= EDITORIAL DATA ================= */
const editorial = [
  {
    title: "Yashvi X Karan",
    place: "Surat",
    image: "/images/photography/1.jpg",
    desc:
      "Yashvi and Karan’s wedding was a serene and intimate affair, steeped in tradition yet infused with personal touches...",
  },
  {
    title: "Nancy X Nevil",
    place: "Bali",
    image: "/images/photography/2.jpg",
    desc:
      "Capturing the magic of love against Bali’s stunning backdrop, Nancy & Nevil’s celebration felt effortless and timeless...",
  },
  {
    title: "Sabrina and Ricky",
    place: "Bali",
    image: "/images/photography/3.jpg",
    desc:
      "Somebody who betters you, somebody who inspires and encourages you in love and in life — that’s sacred...",
  },
];
