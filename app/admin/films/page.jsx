"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoadingSpinner, BackButton } from "../components/AdminUI";

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

// Mini Video Player for Admin
const VideoPreview = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
        Invalid Video URL
      </div>
    );
  }

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        className="w-full h-full"
        title={title || "Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div 
      className="relative w-full h-full bg-black cursor-pointer group"
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={title || "Video thumbnail"}
        fill
        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        unoptimized
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
           <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default function AdminFilmsList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchFilms = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      // Pass admin=true to see drafts
      const params = new URLSearchParams({ limit: "12", admin: "true" });
      if (!isInitial && lastId) params.append("lastId", lastId);

      const res = await fetch(`/api/films?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      
      // Handle response structure { items, lastId, hasMore }
      const newItems = Array.isArray(data) ? data : (data.items || []);
      
      if (isInitial) {
        setFilms(newItems);
      } else {
        setFilms(prev => [...prev, ...newItems]);
      }

      if (!Array.isArray(data)) {
          setLastId(data.lastId);
          setHasMore(data.hasMore);
      } else {
          setHasMore(false); 
      }

    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFilms(true);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-16 w-full">
      <BackButton href="/admin/dashboard" />

      <div className="flex justify-between items-center mb-10">
        <h1 className="font-soligant text-4xl">Films</h1>
        <Link
          href="/admin/films/new"
          className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
        >
          + ADD NEW
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {films.map((film) => (
          <div key={film.id} className="border p-4 bg-white shadow-sm">
            {/* Video Preview Component */}
            <div className="relative h-48 w-full mb-4 bg-gray-100 overflow-hidden">
               <VideoPreview url={film.video || film.videoUrl} title={film.title} />
            </div>
            
            <h2 className="font-serif text-xl mb-1 truncate">{film.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              {film.location || "No Location"}
            </p>
            
            <div className="flex justify-between items-center mt-4 border-t pt-4">
               <span
                className={`text-xs px-2 py-1 rounded ${
                  film.published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {film.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/films/${film.id}`}
                className="text-xs text-gray-500 hover:text-black underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}

        {films.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No films found.
          </div>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pb-10">
          <button
            onClick={() => fetchFilms(false)}
            disabled={loadingMore}
            className="px-6 py-2 border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
}