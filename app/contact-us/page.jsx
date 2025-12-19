"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactUsPage() {
  const inputClass =
    "w-full border-b border-black/70 bg-transparent py-3 text-sm text-black placeholder:text-black/60 focus:outline-none focus:border-black";

  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= HERO (SCROLLABLE) ================= */}
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
      </section>

      {/* ================= INTRO + DETAILS (SCROLLABLE) ================= */}
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
        <p className="font-serif text-lg">hello@ivoryfilms.in</p>
        <p className="font-serif text-lg">+91 9737188899</p>
        <p className="font-serif text-lg">Surat · Mumbai · Hyderabad</p>
      </section>

      {/* ================= FORM (ONE SCREEN ONLY) ================= */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto w-full px-6">

          <form className="space-y-10">

            <input type="text" placeholder="Name*" className={inputClass} />

            <input type="email" placeholder="Email*" className={inputClass} />

            <input
              type="text"
              placeholder="+91 ▾  Whatsapp No.*"
              className={inputClass}
            />

            <textarea
              placeholder="Tell us more about your wedding – event flow, venues.*"
              rows="3"
              className={`${inputClass} resize-none`}
            />

            <input
              type="text"
              placeholder="Location of the wedding*"
              className={inputClass}
            />

            <div className="grid grid-cols-2 gap-12">
              <input type="date" className={inputClass} />
              <input
                type="number"
                placeholder="No. of Days*"
                className={inputClass}
              />
            </div>

            {/* SUBMIT (VISIBLE WITHOUT SCROLL) */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-gold text-white px-12 py-3 rounded-md text-sm tracking-wide"
              >
                Submit
              </button>
            </div>

          </form>

        </div>
      </section>

    </main>
  );
}
