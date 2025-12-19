"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function BlogPostPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (!res.ok) throw new Error("Blog post not found");
                const data = await res.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
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

    if (error || !blog) {
        return (
            <main className="bg-[#F3ECE2] min-h-screen">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
                    <h1 className="font-serif text-3xl">Blog Not Found</h1>
                    <Link href="/blogs" className="text-sm underline hover:text-gray-600">
                        ← Back to Blogs
                    </Link>
                </div>
            </main>
        );
    }

    // Helper to render content blocks based on type
    const renderContent = (blocks) => {
        if (!Array.isArray(blocks)) return null;

        return blocks.map((block, index) => {
            switch (block.type) {
                case "heading1":
                    return <h2 key={index} className="font-serif text-3xl md:text-4xl mt-10 mb-6 text-black">{block.content}</h2>;
                case "heading2":
                    return <h3 key={index} className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-black">{block.content}</h3>;
                case "heading3":
                    return <h4 key={index} className="font-serif text-xl md:text-2xl mt-6 mb-3 text-black">{block.content}</h4>;
                case "paragraph":
                default:
                    return <p key={index} className="text-gray-800 leading-8 mb-6 text-lg whitespace-pre-wrap">{block.content}</p>;
            }
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <main className="bg-[#F3ECE2] min-h-screen">
            <Navbar />

            <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                {/* ================= HEADER ================= */}
                <header className="text-center mb-12">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">
                        {formatDate(blog.createdAt)}
                    </p>
                    <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight text-black">
                        {blog.title}
                    </h1>
                    <p className="text-xl text-gray-600 italic max-w-2xl mx-auto leading-relaxed">
                        {blog.shortDescription}
                    </p>
                </header>

                {/* ================= MAIN IMAGE ================= */}
                {blog.images && blog.images.length > 0 && (
                    <div className="relative w-full aspect-[16/9] mb-16 overflow-hidden rounded-sm shadow-sm">
                        <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                    </div>
                )}

                {/* ================= CONTENT BLOCKS ================= */}
                <div className="prose prose-lg max-w-none font-sans text-gray-800">
                    {renderContent(blog.description)}
                </div>

                {/* ================= GALLERY (Remaining Images) ================= */}
                {blog.images && blog.images.length > 1 && (
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blog.images.slice(1).map((src, idx) => (
                            <div key={idx} className="relative aspect-[4/3] w-full group overflow-hidden">
                                <Image
                                    src={src}
                                    alt={`Gallery image ${idx + 1}`}
                                    fill
                                    className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* ================= FOOTER NAV ================= */}
                <div className="mt-20 pt-10 border-t border-black/10 text-center">
                    <Link
                        href="/blogs"
                        className="inline-block border-b border-black pb-1 text-sm tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors"
                    >
                        BACK TO ALL STORIES
                    </Link>
                </div>
            </article>
        </main>
    );
}