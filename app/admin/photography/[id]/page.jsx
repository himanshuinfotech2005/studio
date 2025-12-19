"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LoadingSpinner, BackButton } from "../../components/AdminUI";

export default function AdminPhotographyEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Store array of image objects: [{ url, deleteUrl, thumb }, ...]
  const [images, setImages] = useState([]); 
  
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/photography/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        setTitle(data.title || "");
        setLocation(data.location || "");
        setDescription(data.description || "");
        setPublished(data.published || false);
        
        // Handle existing images (which are just URLs)
        if (data.images && Array.isArray(data.images)) {
          setImages(data.images.map(url => ({
            url: url,
            thumb: url,
            // No deleteUrl for existing images unless stored separately
          })));
        }
      } catch (error) {
        console.error(error);
        router.push("/admin/photography");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        
        const data = await res.json();
        if (!data.success) throw new Error(data.error?.message || "Upload failed");
        
        return {
          url: data.data.url,
          deleteUrl: data.data.delete_url,
          thumb: data.data.thumb?.url || data.data.url
        };
      });

      const newImages = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...newImages]);

    } catch (error) {
      console.error("ImgBB Error:", error);
      alert("Some images failed to upload: " + error.message);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    if (!confirm("Remove this image?")) return;
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const [movedItem] = newImages.splice(index, 1);
    newImages.splice(index + direction, 0, movedItem);
    setImages(newImages);
  };

  const handleUpdate = async () => {
    if (images.length === 0 || !title) {
      alert("Title and at least one image are required");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(`/api/photography/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          description,
          images: images.map(img => img.url), // Send array of URLs
          published,
        }),
      });
      if (!response.ok) throw new Error("Failed to update");
      alert("Updated successfully");
      router.push("/admin/photography");
    } catch (error) {
      console.error(error);
      alert("Update failed: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/photography/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      router.push("/admin/photography");
    } catch (error) {
      alert("Delete failed: " + error.message);
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="p-8 md:p-16 max-w-5xl mx-auto">
      <BackButton href="/admin/photography" />
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Edit Album</h1>
        <button 
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline font-medium"
        >
          DELETE ALBUM
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Album Title</label>
          <input
            type="text"
            placeholder="e.g. Riya & Arjun"
            className="w-full border p-3 rounded focus:outline-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* LOCATION */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Location</label>
          <input
            type="text"
            placeholder="e.g. Udaipur, Rajasthan"
            className="w-full border p-3 rounded focus:outline-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2 mb-8">
        <label className="text-sm font-bold text-gray-700">Description</label>
        <textarea
          placeholder="Tell the story of this album..."
          rows="4"
          className="w-full border p-3 rounded focus:outline-black resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* IMAGE UPLOAD SECTION */}
      <div className="mb-10">
        <label className="block text-sm font-bold text-gray-700 mb-4">
          Gallery Images ({images.length})
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
          {/* Upload Button */}
          <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-3xl text-gray-400 mb-2">+</span>
            <span className="text-xs text-gray-500 font-medium">
              {uploading ? "Uploading..." : "Add Images"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {/* Image Previews */}
          {images.map((img, index) => (
            <div key={index} className="relative group border rounded-lg overflow-hidden bg-gray-100 h-40">
              <img 
                src={img.thumb} 
                alt={`Upload ${index}`} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index > 0 && (
                  <button 
                    onClick={() => moveImage(index, -1)}
                    className="text-white hover:text-gray-200 text-lg px-1"
                    title="Move Left"
                  >
                    ←
                  </button>
                )}
                
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                  title="Remove"
                >
                  ✕
                </button>

                {index < images.length - 1 && (
                  <button 
                    onClick={() => moveImage(index, 1)}
                    className="text-white hover:text-gray-200 text-lg px-1"
                    title="Move Right"
                  >
                    →
                  </button>
                )}
              </div>
              
              {/* Index Badge */}
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          * The first image will be used as the cover thumbnail. Drag logic is simulated with arrows.
        </p>
      </div>

      {/* PUBLISH */}
      <div className="flex items-center gap-3 mb-10 p-4 bg-gray-50 rounded border">
        <input
          type="checkbox"
          id="publish"
          className="w-5 h-5 accent-black"
          checked={published}
          onChange={() => setPublished(!published)}
        />
        <label htmlFor="publish" className="font-medium cursor-pointer">
          Publish on website
        </label>
      </div>

      {/* SUBMIT */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={saving || uploading}
          className="bg-black text-white px-10 py-3 text-sm tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          {saving ? "SAVING..." : "UPDATE ALBUM"}
        </button>
        
        <button
          onClick={() => router.back()}
          className="px-6 py-3 text-sm border rounded hover:bg-gray-50"
        >
          CANCEL
        </button>
      </div>
    </main>
  );
}