"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerTarget = useRef(null);

  // --- Fetch Logic ---
  const fetchBlogs = useCallback(async (isInitial = false) => {
    if (!hasMore && !isInitial) return;

    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      // Fetch 7 items initially (1 featured + 6 grid), then 6 for subsequent loads
      const limit = isInitial ? "7" : "6";
      const params = new URLSearchParams({ limit });
      if (!isInitial && lastId) params.append("lastId", lastId);

      const res = await fetch(`/api/blogs?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();

      if (isInitial) {
        setBlogs(data.items);
      } else {
        setBlogs(prev => [...prev, ...data.items]);
      }

      setLastId(data.lastId);
      setHasMore(data.hasMore);

    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lastId, hasMore]);

  // Initial Load
  useEffect(() => {
    fetchBlogs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchBlogs(false);
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
  }, [hasMore, loading, loadingMore, fetchBlogs]);

  // --- Derived State ---
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const blogList = blogs.length > 1 ? blogs.slice(1) : [];

  // Helper for Date Formatting
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <main className="bg-[#F3ECE2] min-h-screen">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="text-center max-w-4xl mx-auto py-24 px-6 pt-50">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">
          Blogs
        </h1>
        <p className="text-muted leading-7">
          Thoughts, stories, and experiences from weddings we’ve captured —
          inspirations, behind-the-scenes moments, and editorial narratives.
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <>
          {/* ================= FEATURED BLOG ================= */}
          {featuredBlog && (
            <section className="px-6 md:px-28 pb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                
                {/* IMAGE */}
                <Link href={`/blogs/${featuredBlog.id}`} className="relative w-full aspect-[16/10] overflow-hidden group block">
                  {featuredBlog.images && featuredBlog.images.length > 0 ? (
                    <Image
                      src={featuredBlog.images[0]}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </Link>

                {/* TEXT */}
                <div className="max-w-lg">
                  <p className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
                    {formatDate(featuredBlog.createdAt)}
                  </p>

                  <h2 className="font-soligant text-3xl md:text-[40px] leading-[1.15] mb-6">
                    <Link href={`/blogs/${featuredBlog.id}`} className="hover:underline decoration-1 underline-offset-4">
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="text-[15px] text-gray-600 leading-7 mb-7 line-clamp-3">
                    {featuredBlog.shortDescription}
                  </p>

                  <Link
                    href={`/blogs/${featuredBlog.id}`}
                    className="text-sm font-medium hover:text-gray-600 transition-colors"
                  >
                    READ MORE →
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* ================= BLOG LIST ================= */}
          <section className="px-6 md:px-24 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
              {blogList.map((blog) => (
                <div key={blog.id} className="flex flex-col group">
                  
                  {/* IMAGE */}
                  <Link href={`/blogs/${blog.id}`} className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-200 block">
                    {blog.images && blog.images.length > 0 ? (
                      <Image
                        src={blog.images[0]}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                  </Link>

                  <p className="text-xs text-gray-500 mb-2 uppercase">
                    {formatDate(blog.createdAt)}
                  </p>

                  <h3 className="font-serif text-xl leading-snug mb-3 group-hover:underline decoration-1 underline-offset-4">
                    <Link href={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-gray-600 leading-6 mb-4 line-clamp-3">
                    {blog.shortDescription}
                  </p>

                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-sm font-medium hover:text-gray-600 transition-colors mt-auto inline-block"
                  >
                    READ MORE →
                  </Link>
                </div>
              ))}
            </div>

            {/* Loading Trigger */}
            <div ref={observerTarget} className="w-full flex justify-center items-center">
              {loadingMore && (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
