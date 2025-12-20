"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {

  const films = [
  {
    title: "Aakriti & Rohan",
    location: "Udaipur",
    slug: "aakriti-rohan",
    video: "https://player.vimeo.com/video/000000001",
  },
  {
    title: "Megha & Kunal",
    location: "Jaipur",
    slug: "megha-kunal",
    video: "https://player.vimeo.com/video/000000002",
  },
  {
    title: "Riya & Aman",
    location: "Mumbai",
    slug: "riya-aman",
    video: "https://player.vimeo.com/video/000000003",
  }
];


  const editorialSliderImages = [
  "/images/slider/1.jpg",
  "/images/slider/2.jpg",
  "/images/slider/3.jpg",
  "/images/slider/4.jpg",
];


  const [activeSlide, setActiveSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % editorialSliderImages.length);
  }, 4500);

  return () => clearInterval(interval);
}, []);

  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>

        <Image
          src="/images/home-hero.jpg"
          alt="Ivory Films"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* ================= INTRO TEXT ================= */}
      <section className="max-w-4xl mx-auto text-center py-24 px-6">
        <h2 className="font-serif text-4xl mb-4">
          We capture love stories that feel timeless
        </h2>
        <p className="text-muted leading-7">
          At Somu Films, we document weddings with an editorial approach,
          blending raw emotions, culture, and elegance into visuals that last forever.
        </p>
      </section>

      {/* ================= EDITORIAL STORY ================= */}
<section className="px-6 md:px-20 pb-24 md:pb-32">

  {/* BIG HEADING */}
  <h2 className="
    relative z-20 font-serif
    text-3xl md:text-[56px]
    leading-tight text-center
    mb-12 md:mb-20
  ">
    DECODING NEW TRENDS <br className="hidden md:block" />
    FOR AGE-OLD TRADITIONS
  </h2>

  {/* 3 COLUMN LAYOUT */}
  <div className="
    grid grid-cols-1 md:grid-cols-3
    gap-10 md:gap-12
    items-start
  ">

    {/* LEFT IMAGE */}
    <div className="
      relative z-10 w-full aspect-[3/4]
      mt-0 md:mt-20
    ">
      <Image
        src="/images/story-left.jpg"
        alt="Ivory Story Left"
        fill
        className="object-cover"
      />
    </div>

    {/* CENTER TEXT */}
    <div className="
      relative z-20
      text-sm leading-7 md:leading-8
      text-muted space-y-5 md:space-y-6
      text-center md:text-left
    ">
      <p>
        Specializing in contemporary photography and filmmaking,
        Ivory Films has been capturing the love and wedding stories
        of couples with unparalleled artistry.
      </p>

      <p>
        Each moment from your “once in a lifetime” event is meticulously
        selected and transformed into films and photographs you will
        treasure forever.
      </p>

      <p>
        Ivory Films emerged from a profound passion for photography
        and an exceptional aptitude for orchestrating grand events.
        Since 2013, we have adeptly captured the essence of numerous
        weddings and pre-wedding celebrations.
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="
      relative z-10 w-full aspect-[3/4]
      mt-0 md:-mt-28
    ">
      <Image
        src="/images/story-right.jpg"
        alt="Ivory Story Right"
        fill
        className="object-cover"
      />
    </div>

  </div>
</section>


      {/* ================= BIG HERO SLIDER ================= */}
<section className="relative w-full h-[90vh] overflow-hidden">

  {/* SLIDES */}
  {editorialSliderImages.map((src, index) => (
    <div
      key={src}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        index === activeSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={src}
        alt="Ivory Films Editorial"
        fill
        priority={index === 0}
        className="object-cover"
      />
    </div>
  ))}

  {/* SOFT DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/25 z-10" />

  {/* DOT INDICATORS */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    {editorialSliderImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveSlide(index)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          index === activeSlide
            ? "bg-white scale-125"
            : "bg-white/40 hover:bg-white/70"
        }`}
      />
    ))}
  </div>

</section>


      {/* ================= PHOTOGRAPHY SECTION ================= */}
      <section className="px-16 py-28">
        <div className="flex justify-between items-center mb-14">
          <h2 className="font-serif text-4xl">Photography</h2>
          <a href="/photography" className="text-sm underline">
            Explore Photography →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col">
              <div className="relative w-full aspect-[3/4] mb-5 overflow-hidden">
                <Image
                  src={`/images/photo-${item}.jpg`}
                  alt="Photography"
                  fill
                  className="object-cover"
                />
              </div>

              <h4 className="font-serif text-lg mb-1">
                Luxury Wedding
              </h4>
              <p className="text-muted text-sm">
                Jaipur, India
              </p>
            </div>
          ))}
        </div>
      </section>

     {/* ================= FILMS + MEDIA & RECOGNITION ================= */}
<section className="bg-[#F3ECE2] px-10 md:px-20 pt-10 pb-25">

  {/* ================= MEDIA & RECOGNITION ================= */}
  <div className="max-w-5xl mx-auto text-center mb-28">
    <h2 className="font-serif text-[42px] md:text-[56px] mb-6">
      Media and Recognitions
    </h2>

    <p className="text-sm leading-7 text-muted max-w-4xl mx-auto mb-6">
      We are honored to be featured on leading media pages and top wedding
      platforms, highlighting our commitment to excellence and dedication
      to making your special day truly extraordinary.
    </p>

    <p className="text-sm leading-7 text-muted max-w-4xl mx-auto">
      At Somu Films, we celebrate the unconventional, the adventurous,
      and the modern couples who dare to stand apart. We believe that
      the paramount role of a wedding photographer is to encapsulate the
      very essence of the wedding’s ambiance and the distinct personalities
      of the couple.
    </p>
  </div>

  {/* LOGO GRID */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-20 items-center justify-items-center mb-40">

  {[
    "/images/media/toi.svg",
    "/images/media/ht.svg",
    "/images/media/economic-times.svg",
    "/images/media/indian-express.svg",
    "/images/media/india-today.svg",
    "/images/media/filmfare.svg",
    "/images/media/ndtv.svg",
    "/images/media/india-tv.png",
    "/images/media/weddingsutra.svg",
    "/images/media/wedmegood.svg",
    "/images/media/weddingwire.svg",
    "/images/media/weddingplz.svg",
  ].map((src, i) => (
    <img
      key={i}
      src={src}
      alt="Media Logo"
      className="max-h-[60px] w-auto object-contain opacity-90"
    />
  ))}

</div>

  {/* ================= FILMS ================= */}
  <h2 className="font-serif text-4xl md:text-5xl text-center mb-20">
    Unforgettable Moments, Timeless Films
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

    {films.map((film, index) => (
      <div
        key={index}
        className="relative aspect-video bg-black overflow-hidden group"
      >

        {/* VIMEO VIDEO */}
        <iframe
          src={film.video}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* OPTIONAL DARK HOVER OVERLAY (luxury feel) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

      </div>
    ))}

  </div>
</section>


    </main>
  );


  
}
