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

  const handleChange = (e, any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const handleSubmit = async (e, any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      /* ========= 1️ SAVE TO FIREBASE (UNCHANGED) ========= */
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);

      /* ========= 2️ PREPARE WHATSAPP MESSAGE ========= */
      const adminNumber = "916207789974"; // ✅ with country code

      const message = `
📩 *New Wedding Inquiry*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}

📍 Location: ${formData.location}
📅 Date: ${formData.date || "Not mentioned"}
🗓 Days: ${formData.days}

📝 Details:
${formData.details}
      `;

      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = isMobileDevice()
        ? `whatsapp://send?phone=${adminNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`;

      /* ========= 3️ OPEN WHATSAPP ========= */
      window.open(whatsappUrl, "_blank");

      /* ========= 4️ RESET FORM ========= */
      setFormData({
        name: "",
        email: "",
        phone: "",
        details: "",
        location: "",
        date: "",
        days: "",
      });

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
          <a href="/faqs" className="underline font-semibold hover:text-gold">
            FAQ
          </a>{" "}
          section.
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
              <h3 className="text-2xl font-serif text-green-800 mb-2">
                Thank You!
              </h3>
              <p className="text-green-700">
                We have received your inquiry and will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className={inputClass}
                required
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className={inputClass}
                required
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="WhatsApp No.*"
                className={inputClass}
                required
              />

              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Wedding details*"
                rows={3}
                className={`${inputClass} resize-none`}
                required
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location*"
                className={inputClass}
                required
              />

              <div className="grid grid-cols-2 gap-12">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  placeholder="No. of Days*"
                  className={inputClass}
                  required
                />
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#C5A059] text-white px-12 py-3 rounded-md text-sm tracking-wide hover:bg-[#b08d4b] disabled:opacity-50"
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
