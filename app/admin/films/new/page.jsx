"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "../../components/AdminUI";

export default function AdminNewFilmPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !videoUrl) {
      alert("Title and Video URL are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/films", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          description,
          videoUrl,
          published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }

      alert("Film added successfully");
      router.push("/admin/films");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-16 max-w-4xl">
      <BackButton />
      <h1 className="font-serif text-4xl mb-10">Add Film</h1>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Title"
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

      {/* VIDEO URL */}
      <input
        type="url"
        placeholder="Video URL (Vimeo/YouTube)"
        className="w-full border-b py-3 mb-6 focus:outline-none"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        rows="4"
        className="w-full border-b py-3 mb-6 focus:outline-none resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-10 py-3 text-sm tracking-wide disabled:opacity-50"
      >
        {loading ? "SAVING..." : "SAVE FILM"}
      </button>
    </main>
  );
}
