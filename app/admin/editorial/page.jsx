"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner, BackButton } from "../components/AdminUI";

export default function AdminEditorialPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Pagination State
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  // Fetch Images
  useEffect(() => {
    fetchImages(true);
  }, []);

  const fetchImages = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      // Use a higher limit for admin view (e.g., 20)
      const params = new URLSearchParams({ limit: "20" });
      if (!isInitial && lastId) params.append("lastId", lastId);

      const res = await fetch(`/api/editorial?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      
      if (isInitial) {
        setImages(data.items);
      } else {
        setImages(prev => [...prev, ...data.items]);
      }
      
      setLastId(data.lastId);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 1. Upload to ImgBB
      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
      });
      const imgData = await imgRes.json();
      
      if (!imgData.success) throw new Error("ImgBB Upload failed");

      // 2. Save to DB
      const dbRes = await fetch("/api/editorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imgData.data.url,
          deleteUrl: imgData.data.delete_url
        })
      });

      if (!dbRes.ok) throw new Error("DB Save failed");

      // 3. Refresh List (Reset to initial state to see new image at top)
      fetchImages(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      e.target.value = null; // Reset input
    }
  };

  // Handle Delete
  const confirmDelete = (img) => {
    setImageToDelete(img);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;
    
    try {
      // Delete from DB
      await fetch(`/api/editorial/${imageToDelete.id}`, { method: "DELETE" });
      
      // Update UI locally
      setImages(images.filter(i => i.id !== imageToDelete.id));
      setDeleteModalOpen(false);
      setImageToDelete(null);
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <main className="p-16 w-full relative min-h-screen">
       <BackButton href="/admin/dashboard" />

       {/* Header */}
       <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Editorial Gallery</h1>
        <label className={`bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? "UPLOADING..." : "+ UPLOAD IMAGE"}
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload} 
            disabled={uploading} 
          />
        </label>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {images.map(img => (
              <div key={img.id} className="relative group aspect-[3/4] bg-gray-100">
                <img src={img.imageUrl} alt="Editorial" className="w-full h-full object-cover" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={() => confirmDelete(img)}
                    className="bg-white text-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {images.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400">
                No editorial images found.
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pb-10">
              <button
                onClick={() => fetchImages(false)}
                disabled={loadingMore}
                className="px-6 py-2 border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 max-w-sm w-full shadow-2xl text-center">
            <h3 className="font-serif text-2xl mb-4">Delete Image?</h3>
            <p className="text-gray-500 mb-8 text-sm">
              Are you sure you want to remove this image from the editorial gallery? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="px-6 py-2 border text-sm hover:bg-gray-50 transition"
              >
                CANCEL
              </button>
              <button 
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition"
              >
                DELETE IMAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
