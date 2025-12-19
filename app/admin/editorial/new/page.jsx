"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminEditorialPage() {
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ Upload image to Storage */
      const imageRef = ref(
        storage,
        `editorial/${Date.now()}-${image.name}`
      );
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);

      /* 2️⃣ Save metadata to Firestore */
      await addDoc(collection(db, "editorial"), {
        imageUrl: imageURL,
        published,
        createdAt: serverTimestamp(),
      });

      alert("Editorial image uploaded");

      setImage(null);
      setPublished(false);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <main className="p-16 max-w-3xl">

      <h1 className="font-serif text-4xl mb-10">
        Upload Editorial Image
      </h1>

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
        {loading ? "UPLOADING..." : "UPLOAD IMAGE"}
      </button>

    </main>
  );
}
