"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingSpinner, BackButton } from "../components/AdminUI";

export default function AdminPhotographyList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  console.log("Rendering AdminPhotographyList with albums:", albums);
  const fetchAlbums = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      // Use a higher limit for admin view
      const params = new URLSearchParams({ limit: "12" });
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
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchAlbums(true);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-16 w-full">
      <BackButton href="/admin/dashboard" />

      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Photography</h1>
        <Link
          href="/admin/photography/new"
          className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
        >
          + ADD NEW
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {albums.map((album) => (
          <div key={album.id} className="border p-4 bg-white shadow-sm flex flex-col">
            <div className="relative h-64 w-full mb-4 bg-gray-100 overflow-hidden">
              {album.images && album.images.length > 0 ? (
                <img
                  src={album.images[0]}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <h2 className="font-serif text-xl mb-1 truncate">{album.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              {album.location || "No Location"}
            </p>
            
            <div className="flex justify-between items-center mt-4 border-t pt-4">
               <span
                className={`text-xs px-2 py-1 rounded ${
                  album.published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {album.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/photography/${album.id}`}
                className="text-xs text-gray-500 hover:text-black underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}

        {albums.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No albums found.
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pb-10">
          <button
            onClick={() => fetchAlbums(false)}
            disabled={loadingMore}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition-colors flex items-center"
          >
            {loadingMore ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4zm16 0a8 8 0 01-8 8v-8h8z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </main>
  );
}