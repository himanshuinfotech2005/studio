"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (email,password) => {
    try {
      console.log("email, password",);
      const fun =  await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      console.log("Login error", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3ECE2]">

      <div className="bg-white p-10 w-full max-w-md shadow">

        <h1 className="font-serif text-3xl text-center mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border-b py-3 mb-6 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border-b py-3 mb-8 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={()=>login(email, password)}
          className="w-full bg-black text-white py-3 text-sm tracking-wide"
        >
          LOGIN
        </button>

      </div>

    </div>
  );
}
