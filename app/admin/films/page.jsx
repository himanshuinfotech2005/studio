"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminFilmsPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !videoUrl || !thumbnail) {
      alert("Title, video URL and thumbnail are required");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ Upload thumbnail image */
      const thumbRef = ref(
        storage,
        `films/thumbnails/${Date.now()}-${thumbnail.name}`
      );
      await uploadBytes(thumbRef, thumbnail);
      const thumbURL = await getDownloadURL(thumbRef);

      /* 2️⃣ Save film data */
      await addDoc(collection(db, "films"), {
        title,
        location,
        description,
        videoUrl,
        thumbnail: thumbURL,
        published,
        createdAt: serverTimestamp(),
      });

      alert("Film added successfully");

      /* Reset */
      setTitle("");
      setLocation("");
      setDescription("");
      setVideoUrl("");
      setThumbnail(null);
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
        Add Film
      </h1>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Film Title / Couple Name"
        className="w-full border-b py-3 mb-6 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* LOCATION */}
      <input
        type="text"
        placeholder="Location"
        className="w-full border-b py-3 mb-6 focus:outline-none"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Film description"
        rows="4"
        className="w-full border-b py-3 mb-6 focus:outline-none resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* VIDEO URL */}
      <input
        type="text"
        placeholder="Vimeo / YouTube Embed URL"
        className="w-full border-b py-3 mb-6 focus:outline-none"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      {/* THUMBNAIL */}
      <input
        type="file"
        accept="image/*"
        className="mb-6"
        onChange={(e) => setThumbnail(e.target.files[0])}
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
        {loading ? "UPLOADING..." : "SAVE FILM"}
      </button>

    </main>
  );
}
