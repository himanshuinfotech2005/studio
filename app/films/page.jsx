import Image from "next/image";
import Navbar from "@/components/Navbar";



export default function FilmsPage() {
  return (
    <main className="bg-[#F3ECE2]">
      <Navbar />

      {/* ================= FEATURED FILM ================= */}
      <section className="relative w-full aspect-video bg-black">

        {/* Replace iframe src with real Vimeo later */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://player.vimeo.com/video/000000000"
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-end px-16 pb-16">
          <h1 className="font-serif text-white text-5xl">
            Aakriti & Rohan
          </h1>
        </div>

      </section>

      {/* ================= STATEMENT ================= */}
      <section className="text-center py-32 px-6">
        <h2 className="font-serif text-4xl md:text-5xl max-w-4xl mx-auto">
          Unforgettable Moments, Timeless Films
        </h2>
      </section>

      {/* ================= FILMS GRID ================= */}
      <section className="px-6 md:px-16 pb-32">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {films.map((film, index) => (
            <div key={index}>

              {/* Video Thumbnail */}
              <div className="aspect-video bg-black mb-5 relative">
                <iframe
                  className="w-full h-full"
                  src={film.video}
                  allow="autoplay; fullscreen"
                />
              </div>

              {/* Text */}
              <div className="flex justify-between text-sm text-muted mb-2">
                <span>{film.title}</span>
                <span>{film.location}</span>
              </div>

              <p className="text-sm leading-6">
                {film.description}
              </p>

              <a
                href={`/films/${film.slug}`}
                className="inline-block mt-3 text-sm underline"
              >
                READ MORE →
              </a>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CINEMATIC QUOTE ================= */}
      <section className="relative h-[85vh] w-full">

        <Image
          src="/images/films/banner.jpg"
          alt="Cinematic"
          fill
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h2 className="font-serif text-white text-4xl md:text-5xl text-center max-w-4xl">
            From deeply rooted cultures and traditions to
            new age modern celebrations, we capture it all!
          </h2>
        </div>

      </section>

    </main>
  );
}

/* ================= DATA ================= */

const films = [
  {
    title: "Aakriti & Rohan",
    location: "Udaipur",
    slug: "aakriti-rohan",
    video: "https://player.vimeo.com/video/000000001",
    description:
      "A destination wedding film capturing elegance, emotions, and timeless celebrations."
  },
  {
    title: "Megha & Kunal",
    location: "Jaipur",
    slug: "megha-kunal",
    video: "https://player.vimeo.com/video/000000002",
    description:
      "A cinematic wedding story blending traditions with modern storytelling."
  },
  {
    title: "Riya & Aman",
    location: "Mumbai",
    slug: "riya-aman",
    video: "https://player.vimeo.com/video/000000003",
    description:
      "An intimate wedding film filled with raw emotions and vibrant moments."
  }
];
