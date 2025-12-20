"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

// Helper to extract Video ID
const getYoutubeVideoId = (url) => {
  if (!url) return null;
  
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];

  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0];
  if (url.includes("embed/")) return url.split("embed/")[1]?.split("?")[0];
  if (url.includes("/shorts/")) return url.split("/shorts/")[1]?.split("?")[0];

  return null;
};

// Optimized Video Player Component
const VideoPlayer = ({ url, title, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0${autoPlay ? "&mute=1&loop=1&playlist=" + videoId : ""}`}
          className="absolute inset-0 w-full h-full"
          // title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ pointerEvents: autoPlay ? "none" : "auto" }}
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
          
          {/* Play Button Overlay */}
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

export default function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("/api/films");
        if (!res.ok) throw new Error("Failed to fetch films");
        const data = await res.json();
        // Handle array or paginated object
        setFilms(Array.isArray(data) ? data : (data.items || []));
      } catch (error) {
        console.error("Error loading films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <main className="bg-[#F3ECE2] min-h-screen">
      <Navbar />

      {/* ================= FEATURED FILM (Static or First from DB) ================= */}
      <section className="relative w-full aspect-video bg-black">
        {/* You can make this dynamic too if you want, currently using a placeholder or the first film */}
        {films.length > 0 ? (
           <VideoPlayer url={films[0].videoUrl} title={films[0].title} autoPlay />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            Loading Featured Film...
          </div>
        )}

        {/* Overlay Text (Only show if we have data) */}
        {films.length > 0 && (
          <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-16 pointer-events-none">
            <h1 className="font-serif text-white text-3xl md:text-5xl drop-shadow-lg">
              {films[0].title}
            </h1>
          </div>
        )}
      </section>

      {/* ================= STATEMENT ================= */}
      <section className="text-center py-24 md:py-32 px-6">
        <h2 className="font-soligant text-4xl md:text-5xl max-w-4xl mx-auto">
          Unforgettable Moments, Timeless Films
        </h2>
      </section>

      {/* ================= FILMS GRID ================= */}
      <section className="px-6 md:px-16 pb-32">
        {loading ? (
          <div className="text-center text-gray-500">Loading films...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {films.map((film, index) => (
              <div key={film.id || index} className="flex flex-col">
                
                {/* Video Thumbnail */}
                <div className="aspect-video bg-black mb-5 relative shadow-lg">
                  <VideoPlayer url={film.videoUrl} title={film.title} />
                </div>

                {/* Text */}
                <div className="flex justify-between text-sm text-muted mb-2 font-medium uppercase tracking-wide">
                  <span>{film.title}</span>
                  <span>{film.location || "Destination"}</span>
                </div>

                <p className="text-sm leading-6 text-gray-600 line-clamp-3 mb-4">
                  {film.description || "A cinematic wedding story capturing raw emotions and timeless celebrations."}
                </p>

                {/* Link using ID or Slug */}
                <a
                  href={`/films/${film.slug || film.id}`}
                  className="inline-block text-xs font-bold tracking-widest underline hover:text-gray-600 transition-colors"
                >
                  WATCH FILM →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CINEMATIC QUOTE ================= */}
      <section className="relative h-[60vh] md:h-[85vh] w-full">
        <Image
          src="/images/films/banner.jpg"
          alt="Cinematic"
          fill
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h2 className="font-soligant text-white text-3xl md:text-7xl text-center max-w-4xl">
            From deeply rooted cultures and traditions to
            new age modern celebrations, we capture it all!
          </h2>
        </div>

      </section>

    </main>
  );
}
