"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

// Helper to extract Video ID
const getYoutubeVideoId = (url: string) => {
  if (!url) return null;
  
  // Handle standard watch URLs (e.g. ?v=...)
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];

  // Handle short URLs (youtu.be)
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0];
  
  // Handle embed URLs
  if (url.includes("embed/")) return url.split("embed/")[1]?.split("?")[0];

  // Handle Shorts
  if (url.includes("/shorts/")) return url.split("/shorts/")[1]?.split("?")[0];

  return null;
};

// Video Player Component
const VideoPlayer = ({ url, title }: { url: string, title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    // Fallback if URL is invalid, just show a placeholder so layout doesn't break
    return (
      <div className="relative aspect-video bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black overflow-hidden group shadow-lg">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0`}
          className="absolute inset-0 w-full h-full"
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div 
          className="absolute inset-0 w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title || "Video thumbnail"}
            fill
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            unoptimized
          />
          
          {/* Custom Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const [films, setFilms] = useState<any[]>([]);
  const [photography, setPhotography] = useState<any[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Photography
        const photoRes = await fetch("/api/photography?limit=3");
        if (photoRes.ok) {
          const data = await photoRes.json();
          setPhotography(data.items || []);
        }

        // 2. Fetch Films
        const filmRes = await fetch("/api/films");
        if (filmRes.ok) {
          const data = await filmRes.json();
          const items = Array.isArray(data) ? data : (data.items || []);
          setFilms(items.slice(0, 3)); 
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();
  }, []);

  const editorialSliderImages = [
    "/images/slider/1.jpg",
    "/images/slider/2.jpg",
    "/images/slider/3.jpg",
    "/images/slider/4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % editorialSliderImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [editorialSliderImages.length]);
        console.log("films are these", films)

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
        <h2 className="font-soligant text-4xl mb-4">
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
          relative z-20 font-soligant
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
        {/* SECTION HEADING */}
        <div className="mb-14 text-center">
          <h2 className="font-soligant text-4xl">Photography</h2>
        </div>

        {/* PHOTOGRAPHY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {photography.length > 0 ? (
            photography.map((item) => (
              <div key={item.id} className="flex flex-col group cursor-pointer">
                <a href={`/photography/${item.id}`} className="block">
                  <div className="relative w-full aspect-[3/4] mb-5 overflow-hidden bg-gray-200">
                    {item.images && item.images[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                  </div>

                  <h4 className="font-serif text-lg mb-1 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm uppercase tracking-wide">
                    {item.location}
                  </p>
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400">Loading photography...</div>
          )}
        </div>

        {/* EXPLORE BUTTON – CENTER & LAST */}
        <div className="mt-20 text-center">
          <a
            href="/photography"
            className="
            inline-block
            text-sm
            px-6 py-2
            rounded-full
            bg-gold
            text-white
            transition-all duration-300
            hover:opacity-80
          "
          >
            Explore Photography
          </a>
        </div>
      </section>

      {/* ================= FILMS + MEDIA & RECOGNITION ================= */}
      <section className="bg-[#F3ECE2] px-10 md:px-20 pt-10 pb-25">

        {/* ================= MEDIA & RECOGNITION ================= */}
        <div className="max-w-5xl mx-auto text-center mb-28">
          <h2 className="font-soligant text-[42px] md:text-[56px] mb-6">
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
        <h2 className="font-soligant text-4xl md:text-5xl text-center mb-20">
          Unforgettable Moments, Timeless Films
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {films.length > 0 ? (
            films.map((film, index) => (
              <div key={index} className="flex flex-col gap-6 group">
                {/* Video Player */}
                <VideoPlayer url={film.videoUrl} title={film.title} />
                
                {/* Metadata */}
                <div className="text-center">
                  <h4 className="font-serif text-2xl mb-2 group-hover:text-gray-600 transition-colors">
                    {film.title}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {film.category || film.location || "Wedding Film"}
                  </p>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-3 text-center text-gray-400">Loading films...</div>
          )}
        </div>

        <div className="mt-20 text-center">
          <a
            href="/films"
            className="
            inline-block
            text-sm
            px-6 py-2
            rounded-full
            bg-gold
            text-white
            transition-all duration-300
            hover:opacity-80
          "
          >
            Explore Films
          </a>
        </div>
      </section>

    </main>
  );


  
}
