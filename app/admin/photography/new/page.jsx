"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "../../components/AdminUI";

export default function AdminPhotographyPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Store array of ImgBB response objects: [{ url, deleteUrl, thumb }, ...]
  const [images, setImages] = useState([]); 
  
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const router = useRouter();

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      // Upload images sequentially or in parallel
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
      e.target.value = null; // Reset input
    }
  };

  const handleRemoveImage = async (indexToRemove) => {
    const imageToRemove = images[indexToRemove];
    if (!confirm("Remove this image?")) return;

    try {
      // Optional: Call your backend to delete from ImgBB if needed
      // await fetch("/api/delete-imgbb", { ... });

      setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSave = async () => {
    if (images.length === 0 || !title || !location || !description) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        location,
        description,
        images: images.map(img => img.url), // Send array of URLs
        published,
      };

      const response = await fetch("/api/photography", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }

      alert("Photography album added successfully");
      router.push("/admin/photography"); 
    } catch (error) {
      console.error(error);
      alert("Save failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Move image up/down in the list
  const moveImage = (index, direction) => {
    const newImages = [...images];
    const [movedItem] = newImages.splice(index, 1);
    newImages.splice(index + direction, 0, movedItem);
    setImages(newImages);
  };

  return (
    <main className="p-8 md:p-16 max-w-5xl mx-auto">
      <BackButton href="/admin/photography" />
      <h1 className="font-soligant text-4xl mb-10">Add New Album</h1>

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
              multiple // Allow multiple selection
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
          Publish immediately
        </label>
      </div>

      {/* SUBMIT */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={loading || uploading}
          className="bg-black text-white px-10 py-3 text-sm tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          {loading ? "SAVING..." : "CREATE ALBUM"}
        </button>
        
        <button
          onClick={() => router.back()}
          className="px-6 py-3 text-sm border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
