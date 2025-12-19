"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function FAQPage() {
  return (
    <main className="bg-[#F3ECE2]">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="max-w-4xl mx-auto text-center py-32 px-6">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          We’re here to answer
          <br /> all your questions
        </h1>

        <p className="text-muted leading-7">
          If you don’t find what you’re looking for,
          feel free to reach out to us at{" "}
          <a
            href="mailto:hello@ivoryfilms.in"
            className="underline"
          >
            hello@ivoryfilms.in
          </a>
        </p>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-40">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </section>

    </main>
  );
}

/* ================= FAQ ITEM ================= */

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-line py-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start text-left"
      >
        <h3 className="font-serif text-xl pr-6">
          {faq.question}
        </h3>
        <span className="text-2xl font-light">
          {open ? "–" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-4 text-muted text-sm leading-7">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

/* ================= DATA ================= */

const faqs = [
  {
    question: "Do you travel for weddings?",
    answer: (
      <>
        Yes, absolutely. We love travelling and are happy to document
        weddings across India and internationally. Travel and accommodation
        are billed separately.
      </>
    ),
  },
  {
    question: "How far in advance should we book you?",
    answer: (
      <>
        We recommend booking us at least 6–8 months in advance,
        especially for peak wedding season dates.
      </>
    ),
  },
  {
    question: "What do your photography deliverables include?",
    answer: (
      <>
        <strong>PHOTOS</strong>
        <br />
        High-resolution edited images, delivered via a private online gallery.
        Turnaround time is approximately 8–10 weeks.
      </>
    ),
  },
  {
    question: "What films do you deliver?",
    answer: (
      <>
        <strong>FILMS</strong>
        <br />
        You’ll receive a cinematic wedding film along with shorter edits
        like teasers and highlights. Delivery timeline is 10–12 weeks.
      </>
    ),
  },
  {
    question: "How does payment work?",
    answer: (
      <>
        A booking amount is required to secure your date.
        The remaining balance is payable before the wedding.
      </>
    ),
  },
];
