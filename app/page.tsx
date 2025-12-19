import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">
         {/* NAVBAR OVER HERO */}
                <div className="absolute top-0 left-0 z-50 w-full">
                  <Navbar white/>
                </div>

        <Image
          src="/images/home-hero.jpg"
          alt="Ivory Films"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Logo Center */}
        
      </section>

      {/* ================= INTRO TEXT ================= */}
      <section className="max-w-4xl mx-auto text-center py-28 px-6">
        <h2 className="font-serif text-4xl mb-6">
          We capture love stories that feel timeless
        </h2>
        <p className="text-muted leading-7">
          At Ivory Films, we document weddings with an editorial approach,
          blending raw emotions, culture, and elegance into visuals that last forever.
        </p>
      </section>

      {/* ================= STORY BLOCK ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 px-16 py-28 items-center">

        <Image
          src="/images/story-1.jpg"
          alt="Story"
          width={700}
          height={900}
          className="w-full object-cover"
        />

        <div>
          <h3 className="font-serif text-3xl mb-6">
            Every wedding has a story
          </h3>
          <p className="text-muted leading-7">
            From intimate moments to grand celebrations,
            we focus on authenticity and emotion,
            ensuring each frame feels personal and cinematic.
          </p>
        </div>

      </section>

      {/* ================= PHOTOGRAPHY SECTION ================= */}
      <section className="px-16 py-28">

        <div className="flex justify-between items-center mb-14">
          <h2 className="font-serif text-4xl">Photography</h2>
          <a href="/photography" className="text-sm underline">
            Explore Photography →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <Image
                src={`/images/photo-${item}.jpg`}
                alt="Photography"
                width={500}
                height={700}
                className="mb-4"
              />
              <h4 className="font-serif text-lg">Luxury Wedding</h4>
              <p className="text-muted text-sm">Jaipur, India</p>
            </div>
          ))}
        </div>

      </section>

      {/* ================= FILMS SECTION ================= */}
      <section className="px-16 py-28 bg-[#EFE7DB]">

        <div className="flex justify-between items-center mb-14">
          <h2 className="font-serif text-4xl">Films</h2>
          <a href="/films" className="text-sm underline">
            Explore Films →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div className="aspect-video bg-black mb-4" />
              <h4 className="font-serif text-lg">Wedding Film</h4>
              <p className="text-muted text-sm">Udaipur, India</p>
            </div>
          ))}
        </div>

      </section>

      {/* ================= RECOGNITION ================= */}
      <section className="py-28 text-center">
        <p className="mb-8 text-muted">As featured in</p>

        <div className="flex justify-center gap-10 opacity-70">
          <Image src="/images/logo1.png" alt="" width={120} height={60} />
          <Image src="/images/logo2.png" alt="" width={120} height={60} />
          <Image src="/images/logo3.png" alt="" width={120} height={60} />
        </div>
      </section>

    </main>
  );
}
