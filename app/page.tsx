import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[#F3ECE2]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">
        <div className="absolute top-0 left-0 z-50 w-full">
          <Navbar white />
        </div>

        <Image
          src="/images/home-hero.jpg"
          alt="Ivory Films"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* ================= INTRO TEXT ================= */}
      <section className="max-w-4xl mx-auto text-center py-24 px-6">
        <h2 className="font-serif text-4xl mb-4">
          We capture love stories that feel timeless
        </h2>
        <p className="text-muted leading-7">
          At Ivory Films, we document weddings with an editorial approach,
          blending raw emotions, culture, and elegance into visuals that last forever.
        </p>
      </section>

      {/* ================= EDITORIAL STORY (SCREENSHOT STYLE) ================= */}
      <section className="px-10 md:px-20 pb-32">

        {/* BIG HEADING */}
        <h2 className="font-serif text-[42px] md:text-[56px] leading-tight text-center mb-20">
          DECODING NEW TRENDS <br />
          FOR AGE-OLD TRADITIONS
        </h2>

        {/* 3 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">

          {/* LEFT IMAGE */}
          <div className="relative w-full aspect-[3/4] mt-12">
            <Image
              src="/images/story-left.jpg"
              alt="Ivory Story Left"
              fill
              className="object-cover"
            />
          </div>

          {/* CENTER TEXT */}
          <div className="text-sm leading-8 text-muted space-y-6">
            <p>
              Specializing in contemporary photography and filmmaking,
              Ivory Films has been capturing the love and wedding stories
              of couples with unparalleled artistry.
            </p>

            <p>
              Each moment from your “once in a lifetime” event is meticulously
              selected and transformed into films and photographs you will
              treasure forever.
            </p>

            <p>
              Ivory Films emerged from a profound passion for photography
              and an exceptional aptitude for orchestrating grand events.
              Since 2013, we have adeptly captured the essence of numerous
              weddings and pre-wedding celebrations.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full aspect-3/4 mb-12">
            <Image
              src="/images/story-right.jpg"
              alt="Ivory Story Right"
              fill
              className="object-cover"
            />
          </div>

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
      <div key={item} className="flex flex-col">

        {/* IMAGE – FIXED SIZE */}
        <div className="relative w-full aspect-[3/4] mb-5 overflow-hidden">
          <Image
            src={`/images/photo-${item}.jpg`}
            alt="Photography"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT – SAME ALIGNMENT */}
        <h4 className="font-serif text-lg mb-1">
          Luxury Wedding
        </h4>
        <p className="text-muted text-sm">
          Jaipur, India
        </p>

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
      <section className="py-24 text-center">
        <p className="mb-8 text-muted">As featured in</p>

        <div className="flex justify-center gap-12 opacity-70">
          <Image src="/images/logo1.png" alt="" width={120} height={60} />
          <Image src="/images/logo2.png" alt="" width={120} height={60} />
          <Image src="/images/logo3.png" alt="" width={120} height={60} />
        </div>
      </section>

    </main>
  );
}
