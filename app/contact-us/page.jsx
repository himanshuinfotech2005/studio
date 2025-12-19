"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactUsPage() {
  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* NAVBAR OVER HERO (WHITE) */}
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>

        {/* HERO IMAGE */}
        <Image
          src="/images/contact/hero.jpg"
          alt="Contact Ivory Films"
          fill
          priority
          className="object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* ================= INTRO TEXT ================= */}
      <section className="max-w-3xl mx-auto text-center py-20 px-6">
        <p className="text-sm leading-7 text-black">
          Please complete the form below and provide as many details as possible
          to help us create an accurate estimate. We aim to respond within 48 hours.
          If you do not hear from us or if it is an urgent inquiry, please call us
          at the number below.
        </p>

        <p className="text-sm mt-6">
          Please review our{" "}
          <a href="/faqs" className="underline">
            FAQ
          </a>{" "}
          section to find answers to some frequently asked questions.
        </p>
      </section>

      {/* ================= CONTACT DETAILS ================= */}
      <section className="text-center pb-32 space-y-6">
        <p className="font-serif text-lg">
          hello@ivoryfilms.in
        </p>

        <p className="font-serif text-lg">
          +91 9737188899
        </p>

        <p className="font-serif text-lg">
          Surat · Mumbai · Hyderabad
        </p>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-40">
        <form className="space-y-16">

          <input
            type="text"
            placeholder="Name*"
            className="w-full border-b border-black bg-transparent py-4 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email*"
            className="w-full border-b border-black bg-transparent py-4 focus:outline-none"
          />

          <input
            type="text"
            placeholder="+91 ▾  Whatsapp No.*"
            className="w-full border-b border-black bg-transparent py-4 focus:outline-none"
          />

          <textarea
            placeholder="Tell us more about your wedding – event flow, venues.*"
            rows="4"
            className="w-full border-b border-black bg-transparent py-4 focus:outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Location of the wedding*"
            className="w-full border-b border-black bg-transparent py-4 focus:outline-none"
          />

          {/* DATE + DAYS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <input
              type="date"
              className="border-b border-black bg-transparent py-4 focus:outline-none"
            />

            <input
              type="number"
              placeholder="No. of Days*"
              className="border-b border-black bg-transparent py-4 focus:outline-none"
            />
          </div>

          {/* SUBMIT */}
          <div className="text-center pt-12">
            <button
              type="submit"
              className="bg-gold text-white px-12 py-3 rounded-md text-sm tracking-wide"
            >
              Submit
            </button>
          </div>

        </form>
      </section>

    </main>
  );
}
