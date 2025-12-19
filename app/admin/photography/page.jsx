"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPhotographyList() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photography", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photography:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <div className="p-16">Loading...</div>;

  return (
    <main className="p-16 w-full">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Photography</h1>
        <Link
          href="/admin/photography/new"
          className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
        >
          + ADD NEW
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <div key={photo.id} className="border p-4 bg-white shadow-sm">
            <div className="relative h-48 w-full mb-4 bg-gray-100 overflow-hidden">
              {photo.coverImage ? (
                <img
                  src={photo.coverImage}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <h2 className="font-serif text-xl mb-1 truncate">{photo.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              {photo.location || "No Location"}
            </p>
            
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  photo.published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {photo.published ? "Published" : "Draft"}
              </span>
              
              <Link 
                href={`/admin/photography/${photo.id}`}
                className="text-xs text-gray-500 hover:text-black underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No photography entries found.
          </div>
        )}
      </div>
    </main>
  );
}