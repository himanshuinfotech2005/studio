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
  const [imageData, setImageData] = useState(null); 
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
        
        if (data.coverImage) {
          setImageData({
            url: data.coverImage,
            thumb: data.coverImage,
          });
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
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      
      const data = await res.json();
      
      if (data.success) {
        setImageData({
          url: data.data.url,
          deleteUrl: data.data.delete_url,
          thumb: data.data.thumb?.url || data.data.url
        });
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("ImgBB Error:", error);
      alert("Image upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
      e.target.value = null;
    }
  };

  const handleRemoveImage = async () => {
    if (!imageData) return;
    if (!confirm("Remove this image?")) return;

    if (imageData.deleteUrl) {
      try {
        await fetch("/api/delete-imgbb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deleteUrl: imageData.deleteUrl }),
        });
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
    setImageData(null);
  };

  const handleUpdate = async () => {
    if (!imageData || !title) {
      alert("Title and image are required");
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
          coverImage: imageData.url,
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
    if (!confirm("Are you sure you want to delete this entry?")) return;
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
    <main className="p-16 max-w-4xl">
      <BackButton />
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Edit Photography</h1>
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

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        rows="4"
        className="w-full border-b py-3 mb-6 focus:outline-none resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* IMAGE UPLOAD SECTION */}
      <div className="mb-8">
        <label className="block text-sm text-gray-500 mb-2">Cover Image</label>
        
        {!imageData ? (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              disabled={uploadingImage}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200
              "
            />
            {uploadingImage && <span className="ml-2 text-sm text-gray-400">Uploading...</span>}
          </div>
        ) : (
          <div className="relative inline-block border p-2 rounded bg-gray-50">
            <img 
              src={imageData.thumb} 
              alt="Preview" 
              className="h-40 w-auto object-cover rounded"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-md transition-colors"
              title="Remove Image"
            >
              ✕
            </button>
          </div>
        )}
      </div>

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
          disabled={saving || uploadingImage || !imageData}
          className="bg-black text-white px-10 py-3 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
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