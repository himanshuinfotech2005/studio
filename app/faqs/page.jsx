"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function FAQPage() {
  return (
    <main className="bg-[#F3ECE2] pt-32">

      {/* NAVBAR */}
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="max-w-5xl mx-auto text-center py-20 px-6">
  <h1 className="font-serif text-5xl md:text-6xl mb-4">
    We’re here to answer all your questions
  </h1>

        <p className="text-black/70 leading-7">
          If you don’t find what you’re looking for,
          feel free to reach out to us at{" "}
          <a
            href="mailto:hello@ivoryfilms.in"
            className="underline hover:text-gold transition-colors"
          >
            hello@somufilms.in
          </a>
        </p>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-6xl mx-auto px-10 pb-40">
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
    <div className="border-b border-black/70 py-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        {/* QUESTION */}
        <h3 className="font-serif text-[20px] md:text-[21px] leading-snug pr-10">
          {faq.question}
        </h3>

        {/* PLUS ICON */}
        <span className="text-2xl font-light">
          {open ? "–" : "+"}
        </span>
      </button>

      {/* ANSWER */}
      {open && (
        <div className="mt-5 text-sm leading-7 text-black/70 max-w-4xl">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

/* ================= DATA ================= */

const faqs = [
  {
    question: "Where are you based and how far can you travel?",
    answer: (
      <>
        We are based in India and love travelling for weddings.
        We are available for events across India and internationally.
        Travel and accommodation are billed separately.
      </>
    ),
  },
  {
    question: "How can we book you?",
    answer: (
      <>
        To book us, please fill out the contact form on our website.
        Once we receive your details, we’ll connect with you to discuss
        availability and next steps.
      </>
    ),
  },
  {
    question: "What are your deliverables?",
    answer: (
      <>
        <strong>PHOTOGRAPHY</strong>
        <br />
        High-resolution edited images delivered via a private online gallery.
        Turnaround time is approximately 8–10 weeks.
        <br /><br />
        <strong>FILMS</strong>
        <br />
        Cinematic wedding films along with shorter edits such as teasers
        and highlights. Delivery timeline is 10–12 weeks.
      </>
    ),
  },
  {
    question: "How much do you charge and what are the payment terms?",
    answer: (
      <>
        Our pricing depends on the scope and scale of the wedding.
        A booking amount is required to secure your date,
        with the remaining balance payable before the event.
      </>
    ),
  },
  {
    question: "What are the delivery timelines?",
    answer: (
      <>
        Photography is typically delivered within 8–10 weeks,
        while films are delivered within 10–12 weeks after the wedding.
      </>
    ),
  },
  {
    question: "How do you guys work?",
    answer: (
      <>
        We believe in documenting weddings organically.
        Our approach is unobtrusive, focusing on real moments,
        emotions, and storytelling rather than staged shots.
      </>
    ),
  },
];
