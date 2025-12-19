"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingSpinner, BackButton } from "../components/AdminUI";

export default function AdminBlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-16 w-full">
      <BackButton href="/admin/dashboard" />

      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
        >
          + ADD NEW
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 bg-white shadow-sm flex flex-col">
            <div className="relative h-48 w-full mb-4 bg-gray-100 overflow-hidden">
              {blog.images && blog.images.length > 0 ? (
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <h2 className="font-serif text-xl mb-2 truncate">{blog.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 grow">
              {blog.shortDescription}
            </p>
            
            <div className="flex justify-between items-center mt-4 border-t pt-4">
               <span
                className={`text-xs px-2 py-1 rounded ${
                  blog.published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {blog.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/blogs/${blog.id}`}
                className="text-xs text-gray-500 hover:text-black underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            No blogs found.
          </div>
        )}
      </div>
    </main>
  );
}