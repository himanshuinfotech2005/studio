"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
    location: "",
    date: "",
    days: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      setFormData({
        name: "", email: "", phone: "", details: "", location: "", date: "", days: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-black/70 bg-transparent py-3 text-sm text-black placeholder:text-black/60 focus:outline-none focus:border-black";

  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>
        <Image
          src="/images/contact/hero.jpg"
          alt="Contact Somu Films"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Centered Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h1 className="font-soligant text-white text-6xl md:text-9xl tracking-wide drop-shadow-lg">
            GET QUOTE
          </h1>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="max-w-3xl mx-auto text-center py-16 px-6">
        <p className="text-sm leading-7">
          Please complete the form below and provide as many details as possible
          to help us create an accurate estimate. We aim to respond within 48 hours.
        </p>
        <p className="text-sm mt-6">
          Please review our{" "}
          <a href="/faqs" className="underline font-semibold text-black transition-colors duration-300 hover:text-gold">
            FAQ
          </a>{" "}
          section to find answers to common questions.
        </p>
      </section>

      <section className="text-center pb-12 space-y-4">
        <p className="font-serif text-lg">hello@somufilms.in</p>
        <p className="font-serif text-lg">+91 9348037248</p>
        <p className="font-serif text-lg">Surat · Mumbai · Hyderabad</p>
      </section>

      {/* ================= FORM ================= */}
      <section className="min-h-screen flex items-center pb-20">
        <div className="max-w-3xl mx-auto w-full px-6">

          {success ? (
            <div className="text-center py-20 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-2xl font-serif text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">We have received your inquiry and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                type="text" 
                placeholder="Name*" 
                className={inputClass} 
                required 
              />

              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                placeholder="Email*" 
                className={inputClass} 
                required 
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="+91 ▾  Whatsapp No.*"
                className={inputClass}
                required
              />

              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Tell us more about your wedding – event flow, venues.*"
                rows="3"
                className={`${inputClass} resize-none`}
                required
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="Location of the wedding*"
                className={inputClass}
                required
              />

              <div className="grid grid-cols-2 gap-12">
                <input 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  type="date" 
                  className={inputClass} 
                />
                <input
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  type="number"
                  placeholder="No. of Days*"
                  className={inputClass}
                  required
                />
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#C5A059] text-white px-12 py-3 rounded-md text-sm tracking-wide hover:bg-[#b08d4b] transition-colors disabled:opacity-50"
                >
                  {submitting ? "SENDING..." : "SUBMIT"}
                </button>
              </div>
            </form>
          )}

        </div>
      </section>
    </main>
  );
}
