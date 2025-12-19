import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function EditorialPage() {
  return (
    <main className="bg-[#F3ECE2]">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="text-center max-w-4xl mx-auto py-32 px-6">
        <h1 className="font-serif text-5xl md:text-6xl mb-8">
          Capturing the madness and chaos,
          <br /> we call weddings
        </h1>

        <p className="text-muted leading-7">
          A curated editorial showcase of weddings we’ve documented —
          raw emotions, fleeting glances, and beautifully imperfect moments,
          presented as visual stories.
        </p>
      </section>

      {/* ================= EDITORIAL GRID ================= */}
      <section className="px-6 md:px-16 pb-32">

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">

          {editorialImages.map((src, index) => (
            <div key={index} className="mb-6 break-inside-avoid">
              <Image
                src={src}
                alt="Ivory Films Editorial"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

/* ================= DATA ================= */

const editorialImages = [
  "/images/editorial/1.jpg",
  "/images/editorial/2.jpg",
  "/images/editorial/3.jpg",
  "/images/editorial/4.jpg",
  "/images/editorial/5.jpg",
  "/images/editorial/6.jpg",
  "/images/editorial/7.jpg",
  "/images/editorial/8.jpg",
  "/images/editorial/9.jpg",
  "/images/editorial/10.jpg",
  "/images/editorial/11.jpg",
  "/images/editorial/12.jpg",
  "/images/editorial/13.jpg",
  "/images/editorial/14.jpg",
  "/images/editorial/15.jpg",
];
