import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function BlogsPage() {
  return (
    <main className="bg-[#F3ECE2]">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="text-center max-w-4xl mx-auto py-24 px-6">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">
          Blogs
        </h1>
        <p className="text-muted leading-7">
          Thoughts, stories, and experiences from weddings we’ve captured —
          inspirations, behind-the-scenes moments, and editorial narratives.
        </p>
      </section>

      {/* ================= FEATURED BLOG ================= */}
      <section className="px-6 md:px-28 pb-32">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

    {/* IMAGE — MUCH BIGGER */}
    <div className="relative w-full aspect-[18/10] overflow-hidden">
      <Image
        src="/images/blogs/featured.jpg"
        alt="Featured Blog"
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* TEXT — BIGGER & AIRY */}
    <div className="max-w-lg">

      <p className="text-xs tracking-widest text-muted mb-4 uppercase">
        10 Aug, 2025
      </p>

      <h2 className="font-serif text-[48px] leading-[1.15] mb-6">
        The Ivory Experience Luxury Wedding Photography in India
      </h2>

      <p className="text-[15px] text-muted leading-7 mb-7">
        At Ivory Films, we believe your wedding story is more than a
        timeline of events — it’s a tapestry of emotions, traditions,
        and fleeting moments that deserve to be preserved with heart
        and artistry.
      </p>

      <a
        href="/blogs/the-ivory-experience"
        className="text-sm font-medium hover:text-gold transition-colors"
      >
        READ MORE →
      </a>
    </div>

  </div>

</section>

      {/* ================= BLOG LIST ================= */}
      <section className="px-6 md:px-24 pb-32">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {blogs.map((blog, index) => (
            <div key={index} className="flex flex-col">

              {/* IMAGE */}
              <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs text-muted mb-2 uppercase">
                {blog.date}
              </p>

              <h3 className="font-serif text-xl leading-snug mb-3">
                {blog.title}
              </h3>

              <p className="text-sm text-muted leading-6 mb-4">
                {blog.excerpt}
              </p>

              <a
                href={`/blogs/${blog.slug}`}
                className="text-sm font-medium hover:text-gold transition-colors mt-auto"
              >
                READ MORE →
              </a>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

/* ================= DATA ================= */

const blogs = [
  {
    title: "A Sunset Wedding Ceremony by the Sea",
    slug: "sunset-wedding-ceremony-sea",
    date: "28 Jul, 2024",
    image: "/images/blogs/1.jpg",
    excerpt:
      "An intimate seaside wedding with golden-hour vows and breathtaking views."
  },
  {
    title: "Inside a Traditional Gujarati Wedding",
    slug: "traditional-gujarati-wedding",
    date: "14 Jun, 2024",
    image: "/images/blogs/2.jpg",
    excerpt:
      "Exploring rituals, colors, and emotions of a beautiful Gujarati wedding."
  },
  {
    title: "How We Craft Cinematic Wedding Films",
    slug: "crafting-cinematic-wedding-films",
    date: "02 May, 2024",
    image: "/images/blogs/3.jpg",
    excerpt:
      "A behind-the-scenes look at our filmmaking process and storytelling approach."
  }
];
