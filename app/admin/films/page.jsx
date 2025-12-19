"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminFilmsList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("/api/films", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) return <div className="p-16">Loading...</div>;

  return (
    <main className="p-16 w-full">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Films</h1>
        <Link
          href="/admin/films/new"
          className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
        >
          + ADD NEW
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {films.map((film) => (
          <div key={film.id} className="border p-4 bg-white shadow-sm">
            <div className="relative h-48 w-full mb-4 bg-gray-100 overflow-hidden flex items-center justify-center">
               {/* You can add a video thumbnail generator here later */}
               <span className="text-gray-400 text-sm">Video Preview</span>
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
              <button className="text-xs text-gray-500 hover:text-black underline">
                Edit
              </button>
            </div>
          </div>
        ))}

        {films.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No films found.
          </div>
        )}
      </div>
    </main>
  );
}