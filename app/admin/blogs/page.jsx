"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminBlogsPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !excerpt || !content || !image) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ Upload image */
      const imageRef = ref(
        storage,
        `blogs/${Date.now()}-${image.name}`
      );
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);

      /* 2️⃣ Save blog */
      await addDoc(collection(db, "blogs"), {
        title,
        slug: slugify(title),
        excerpt,
        content,
        featuredImage: imageURL,
        published,
        createdAt: serverTimestamp(),
      });

      alert("Blog published successfully");

      /* Reset */
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
      setPublished(false);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <main className="p-16 max-w-4xl">

      <h1 className="font-serif text-4xl mb-10">
        Add Blog
      </h1>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full border-b py-3 mb-6 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* EXCERPT */}
      <textarea
        placeholder="Short excerpt (for listing page)"
        rows="3"
        className="w-full border-b py-3 mb-6 focus:outline-none resize-none"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      {/* CONTENT */}
      <textarea
        placeholder="Full blog content (HTML supported)"
        rows="8"
        className="w-full border-b py-3 mb-6 focus:outline-none resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* FEATURED IMAGE */}
      <input
        type="file"
        accept="image/*"
        className="mb-6"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* PUBLISH */}
      <div className="flex items-center gap-3 mb-10">
        <input
          type="checkbox"
          checked={published}
          onChange={() => setPublished(!published)}
        />
        <label>Publish on website</label>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-black text-white px-10 py-3 text-sm tracking-wide"
      >
        {loading ? "PUBLISHING..." : "SAVE BLOG"}
      </button>

    </main>
  );
}
