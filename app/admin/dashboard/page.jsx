"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading) return <div className="p-16">Loading...</div>;
  if (!user) return null;

  return (
    <main className="p-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-soligant text-4xl">
          Admin Dashboard
        </h1>
        <button 
          onClick={handleLogout}
          className="text-sm underline hover:text-gray-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <AdminCard title="Photography" link="/admin/photography" />
        <AdminCard title="Films" link="/admin/films" />
        <AdminCard title="Blogs" link="/admin/blogs" />
        <AdminCard title="Editorial" link="/admin/editorial" />
        <AdminCard title="Inquiries" link="/admin/contact" />
      </div>
    </main>
  );
}

function AdminCard({ title, link }) {
  return (
    <a
      href={link}
      className="border p-8 hover:bg-black hover:text-white transition block h-full"
    >
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="text-sm mt-2">Manage content</p>
    </a>
  );
}
