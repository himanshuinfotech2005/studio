"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "../../components/AdminUI";

export default function AdminNewBlogPage() {
  const router = useRouter();
  
  // Form State
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [published, setPublished] = useState(false);
  
  // Content Blocks State
  const [blocks, setBlocks] = useState([{ type: "paragraph", content: "" }]);
  
  // Images State (Array of URLs)
  const [images, setImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Image Logic ---
  const handleImageUpload = async (e) => {
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
        setImages([...images, data.data.url]);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
      e.target.value = null;
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // --- Block Logic ---
  const addBlock = (type) => {
    setBlocks([...blocks, { type, content: "" }]);
  };

  const updateBlock = (index, content) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  // --- Submit Logic ---
  const handleSubmit = async () => {
    if (!title || !shortDescription || blocks.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDescription,
          description: blocks,
          images,
          published,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to save");
      }

      alert("Blog created successfully");
      router.push("/admin/blogs");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-16 max-w-4xl">
      <BackButton />
      <h1 className="font-soligant text-4xl mb-10">Add New Blog</h1>

      {/* Basic Info */}
      <div className="space-y-6 mb-10">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border-b py-3 text-xl focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short Description (for card preview)"
          className="w-full border-b py-3 focus:outline-none resize-none"
          rows="2"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>

      {/* Image Gallery */}
      <div className="mb-10">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-4">Gallery Images</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative w-32 h-32 bg-gray-100 rounded overflow-hidden">
              <img src={url} alt="upload" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <span className="text-2xl text-gray-400">+</span>
            <span className="text-xs text-gray-500 mt-1">
              {uploadingImage ? "Uploading..." : "Add Image"}
            </span>
            <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
          </label>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="mb-10">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-4">Content Blocks</h3>
        <div className="space-y-4 mb-6">
          {blocks.map((block, idx) => (
            <div key={idx} className="flex gap-4 items-start group">
              <div className="grow">
                {block.type === "paragraph" && (
                  <textarea
                    className="w-full p-3 border rounded focus:outline-black"
                    rows="4"
                    placeholder="Paragraph content..."
                    value={block.content}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                  />
                )}
                {block.type === "heading1" && (
                  <input
                    type="text"
                    className="w-full p-3 border-b-2 border-black font-serif text-2xl focus:outline-none"
                    placeholder="Heading 1"
                    value={block.content}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                  />
                )}
                {block.type === "heading2" && (
                  <input
                    type="text"
                    className="w-full p-3 border-b border-gray-400 font-serif text-xl focus:outline-none"
                    placeholder="Heading 2"
                    value={block.content}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                  />
                )}
                {block.type === "heading3" && (
                  <input
                    type="text"
                    className="w-full p-3 border-b border-gray-200 font-bold text-lg focus:outline-none"
                    placeholder="Heading 3"
                    value={block.content}
                    onChange={(e) => updateBlock(idx, e.target.value)}
                  />
                )}
                <span className="text-xs text-gray-400 uppercase mt-1 block">{block.type}</span>
              </div>
              <button
                onClick={() => removeBlock(idx)}
                className="text-gray-300 hover:text-red-500 pt-3"
                title="Remove block"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={() => addBlock("paragraph")} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">+ Paragraph</button>
          <button onClick={() => addBlock("heading1")} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">+ H1</button>
          <button onClick={() => addBlock("heading2")} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">+ H2</button>
          <button onClick={() => addBlock("heading3")} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">+ H3</button>
        </div>
      </div>

      {/* Publish & Submit */}
      <div className="flex items-center gap-3 mb-10">
        <input
          type="checkbox"
          checked={published}
          onChange={() => setPublished(!published)}
        />
        <label>Publish on website</label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-10 py-3 text-sm tracking-wide disabled:opacity-50"
      >
        {loading ? "SAVING..." : "SAVE BLOG"}
      </button>
    </main>
  );
}