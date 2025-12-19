"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LoadingSpinner, BackButton } from "../../components/AdminUI";

export default function AdminFilmEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/films/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        setTitle(data.title || "");
        setLocation(data.location || "");
        setDescription(data.description || "");
        setVideoUrl(data.videoUrl || "");
        setPublished(data.published || false);
      } catch (error) {
        console.error(error);
        alert("Error loading film details");
        router.push("/admin/films");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  const handleUpdate = async () => {
    if (!title || !videoUrl) {
      alert("Title and Video URL are required");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/films/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          description,
          videoUrl,
          published,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      alert("Updated successfully");
      router.push("/admin/films");
    } catch (error) {
      console.error(error);
      alert("Update failed: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this film? This cannot be undone.")) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/films/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      
      router.push("/admin/films");
    } catch (error) {
      alert("Delete failed: " + error.message);
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-16 max-w-4xl">
      <BackButton />
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Edit Film</h1>
        <button 
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          Delete Entry
        </button>
      </div>

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
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-black text-white px-10 py-3 text-sm tracking-wide disabled:opacity-50"
        >
          {saving ? "SAVING..." : "UPDATE"}
        </button>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 text-sm tracking-wide border hover:bg-gray-50"
        >
          CANCEL
        </button>
      </div>
    </main>
  );
}