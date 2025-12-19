"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAlbum = async () => {
      try {
        const res = await fetch(`/api/photography/${id}`);
        if (!res.ok) throw new Error("Album not found");
        const data = await res.json();
        setAlbum(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-[#F3ECE2] min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
        </div>
      </main>
    );
  }

  if (error || !album) {
    return (
      <main className="bg-[#F3ECE2] min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
          <h1 className="font-serif text-3xl">Album Not Found</h1>
          <Link href="/photography" className="text-sm underline hover:text-gray-600">
            ← Back to Photography
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F3ECE2] min-h-screen">
      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="pt-32 pb-16 px-6 md:px-16 max-w-6xl mx-auto text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">
          {album.location}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
          {album.title}
        </h1>
        <p className="text-gray-600 leading-8 max-w-2xl mx-auto whitespace-pre-wrap">
          {album.description}
        </p>
      </section>

      {/* ================= IMAGES GRID ================= */}
      <section className="px-4 md:px-8 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
          {album.images && album.images.map((src, index) => (
            <div key={index} className="relative w-full break-inside-avoid">
              <Image
                src={src}
                alt={`${album.title} - Image ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= NAVIGATION ================= */}
      <section className="pb-20 text-center">
        <Link 
          href="/photography"
          className="inline-block border-b border-black pb-1 text-sm tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors"
        >
          BACK TO ALL ALBUMS
        </Link>
      </section>
    </main>
  );
}