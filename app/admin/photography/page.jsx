"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPhotographyPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image || !title) {
      alert("Title and image are required");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ Upload image to Firebase Storage */
      const imageRef = ref(
        storage,
        `photography/${Date.now()}-${image.name}`
      );
      await uploadBytes(imageRef, image);

      const imageURL = await getDownloadURL(imageRef);

      /* 2️⃣ Save data to Firestore */
      await addDoc(collection(db, "photography"), {
        title,
        location,
        description,
        coverImage: imageURL,
        published,
        createdAt: serverTimestamp(),
      });

      alert("Photography added successfully");

      /* Reset form */
      setTitle("");
      setLocation("");
      setDescription("");
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
        Add Photography
      </h1>

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

      {/* IMAGE */}
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
        {loading ? "UPLOADING..." : "SAVE PHOTOGRAPHY"}
      </button>

    </main>
  );
}
