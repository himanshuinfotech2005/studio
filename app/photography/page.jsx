"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";

/* ================= HERO SLIDER IMAGES ================= */
const heroImages = [
  "/images/photography/hero-1.jpg",
  "/images/photography/hero-2.jpg",
  "/images/photography/hero-3.jpg",
];

export default function PhotographyPage() {
  const [active, setActive] = useState(0);
  
  // Data State
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerTarget = useRef(null);

  // Hero Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Fetch Logic
  const fetchAlbums = useCallback(async (isInitial = false) => {
    if (!hasMore && !isInitial) return;

    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({ limit: "6" });
      if (!isInitial && lastId) params.append("lastId", lastId);

      const res = await fetch(`/api/photography?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();

      if (isInitial) {
        setAlbums(data.items);
      } else {
        setAlbums(prev => [...prev, ...data.items]);
      }

      setLastId(data.lastId);
      setHasMore(data.hasMore);

    } catch (error) {
      console.error("Error fetching photography:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lastId, hasMore]);

  // Initial Load
  useEffect(() => {
    fetchAlbums(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchAlbums(false);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadingMore, fetchAlbums]);

  return (
    <main className="bg-[#F3ECE2] min-h-screen">

      {/* ================= 1. BIG HERO SLIDER ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>

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

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] w-10 transition-colors duration-500 ${
                i === active ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. ALBUM GRID ================= */}
      <section className="px-6 md:px-16 py-32">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-20">
            {albums.map((album) => (
              <Link href={`/photography/${album.id}`} key={album.id} className="group flex flex-col h-full">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-200">
                  {album.images && album.images.length > 0 ? (
                    <Image
                      src={album.images[0]}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                </div>

                {/* TITLE + LOCATION */}
                <div className="flex justify-between items-baseline mb-3 border-b border-black/10 pb-3">
                  <h3 className="font-serif text-2xl group-hover:text-gray-600 transition-colors line-clamp-1">
                    {album.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {album.location}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm leading-7 text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {album.description}
                </p>

                {/* READ MORE */}
                <span className="mt-auto text-xs font-bold tracking-widest uppercase border-b border-transparent group-hover:border-black transition-all w-fit">
                  View Album
                </span>
              </Link>
            ))}
          </div>
        )}

        {!loading && albums.length === 0 && (
          <div className="text-center text-gray-400 py-20">No photography albums found.</div>
        )}

        {/* Loading Trigger */}
        <div ref={observerTarget} className="h-10 w-full flex justify-center items-center mt-12">
          {loadingMore && (
             <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
          )}
        </div>
        
        {!hasMore && albums.length > 0 && (
          <div className="text-center text-gray-500 py-10">
            <span className="text-sm">You have seen all albums.</span>
          </div>
        )}
      </section>
    </main>
  );
}
