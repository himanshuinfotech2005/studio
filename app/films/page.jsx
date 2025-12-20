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
  
  // Use sddefault (640x480) as it's more reliable than maxresdefault
  const [imgSrc, setImgSrc] = useState(
    videoId ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg` : ""
  );

  useEffect(() => {
    if (videoId) {
      setImgSrc(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
    }
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
        Video unavailable
      </div>
    );
  }

  // Construct YouTube Embed URL
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    showinfo: "0",
    // If autoPlay (Featured), hide controls. If not (Grid), show controls (1).
    controls: autoPlay ? "0" : "1", 
  });

  if (autoPlay) {
    params.append("mute", "1");
    params.append("loop", "1");
    params.append("playlist", videoId); // Required for loop to work
  }

  const iframeSrc = `${baseUrl}?${params.toString()}`;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      {isPlaying ? (
        <iframe
          src={iframeSrc}
          className="absolute inset-0 w-full h-full"
          title={title || "YouTube video player"}
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
            src={imgSrc}
            alt={title || "Video thumbnail"}
            fill
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            unoptimized
            onError={() => {
              // Fallback to hqdefault if sddefault fails
              if (imgSrc.includes("sddefault")) {
                setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
              }
            }}
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
  let otherFilms = [];
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("/api/films");
        if (!res.ok) throw new Error("Failed to fetch films");
        const data = await res.json();
        setFilms(Array.isArray(data) ? data : (data.items || []));
        otherFilms = Array.isArray(data) ? data.slice(1) : (data.items || []).slice(1);
      } catch (error) {
        console.error("Error loading films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <main className="bg-[#F3ECE2] min-h-screen pt-32">
      <Navbar />

      {/* ================= FEATURED FILM (Static or First from DB) ================= */}
      <section className="w-full px-6 md:px-16 mb-10">
        {/* Changed max-w-6xl to max-w-5xl to reduce overall size (and height) */}
        <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black shadow-2xl">
          {films.length > 0 ? (
             // Ensure we check both 'video' and 'videoUrl' properties
             <VideoPlayer url={films[0].video || films[0].videoUrl} title={films[0].title} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              Loading Featured Film...
            </div>
          )}

          {/* Overlay Text (Only show if we have data) */}
          {films.length > 0 && (
            <div className="absolute inset-0 flex items-end px-6 md:px-10 pb-10 pointer-events-none">
              <h1 className="font-serif text-white text-2xl md:text-4xl drop-shadow-lg">
                {films[0].title}
              </h1>
            </div>
          )}
        </div>
      </section>

      {/* ================= STATEMENT ================= */}
      <section className="text-center py-16 md:py-24 px-6">
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
            {/* Slice the array here in the render, not in useEffect to avoid state issues */}
            {films.slice(1).map((film, index) => (
              <div key={film.id || index} className="flex flex-col">
                
                {/* Video Thumbnail */}
                <div className="aspect-video bg-black mb-5 relative shadow-lg">
                  {/* Ensure we check both 'video' and 'videoUrl' properties */}
                  <VideoPlayer url={film.video || film.videoUrl} title={film.title} />
                </div>

                {/* Text */}
                <div className="flex justify-between text-sm text-muted mb-2 font-medium uppercase tracking-wide">
                  <span>{film.title}</span>
                  <span>{film.location || "Destination"}</span>
                </div>

                <p className="text-sm leading-6 text-gray-600 line-clamp-3 mb-4">
                  {film.description || "A cinematic wedding story capturing raw emotions and timeless celebrations."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
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
