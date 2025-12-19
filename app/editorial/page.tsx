"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef, useCallback } from "react";

interface EditorialItem {
  id: string;
  imageUrl: string;
}

export default function EditorialPage() {
  const [images, setImages] = useState<EditorialItem[]>([]);
  const [loading, setLoading] = useState(true); // Initial load
  const [loadingMore, setLoadingMore] = useState(false); // Pagination load
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Ref for the intersection observer target
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchImages = useCallback(async (isInitial = false) => {
    if (!hasMore && !isInitial) return;

    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({ limit: "9" });
      if (!isInitial && lastId) params.append("lastId", lastId);

      const res = await fetch(`/api/editorial?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();

      if (isInitial) {
        setImages(data.items);
      } else {
        setImages(prev => [...prev, ...data.items]);
      }

      setLastId(data.lastId);
      setHasMore(data.hasMore);

    } catch (error) {
      console.error("Error fetching editorial images:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lastId, hasMore]);

  // Initial Fetch
  useEffect(() => {
    fetchImages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchImages(false);
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
  }, [hasMore, loading, loadingMore, fetchImages]);

  return (
    <main className="bg-[#F3ECE2] min-h-screen">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="text-center max-w-4xl mx-auto py-32 px-6">
        <h1 className="font-serif text-5xl md:text-6xl mb-8">
          Capturing the madness and chaos,
          <br /> we call weddings
        </h1>

        <p className="text-muted leading-7">
          A curated editorial showcase of weddings we’ve documented —
          raw emotions, fleeting glances, and beautifully imperfect moments,
          presented as visual stories.
        </p>
      </section>

      {/* ================= EDITORIAL GRID ================= */}
      <section className="px-6 md:px-16 pb-32">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {images.map((item) => (
            <div key={item.id} className="mb-6 break-inside-avoid">
              <Image
                src={item.imageUrl}
                alt="Ivory Films Editorial"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Loading States */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No editorial images found.
          </div>
        )}

        {/* Invisible target for intersection observer */}
        <div ref={observerTarget} className="h-10 w-full flex justify-center items-center mt-8">
          {loadingMore && (
             <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
          )}
        </div>
        
        {/* {!hasMore && images.length > 0 && (
          <div className="text-center text-gray-500 py-10">
            No more images to display.
          </div>
        )} */}
      </section>

    </main>
  );
}
