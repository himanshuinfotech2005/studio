import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function BlogsPage() {
  return (
    <main className="bg-[#F3ECE2]">
      <Navbar />

      {/* ================= INTRO ================= */}
      <section className="text-center max-w-4xl mx-auto py-32 px-6">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          Blogs
        </h1>
        <p className="text-muted leading-7">
          Thoughts, stories, and experiences from weddings we’ve captured —
          inspirations, behind-the-scenes moments, and editorial narratives.
        </p>
      </section>

      {/* ================= FEATURED BLOG ================= */}
      <section className="px-6 md:px-16 pb-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <Image
            src="/images/blogs/featured.jpg"
            alt="Featured Blog"
            width={900}
            height={600}
            className="w-full object-cover"
          />

          <div>
            <p className="text-sm text-muted mb-2">
              August 12, 2024
            </p>

            <h2 className="font-serif text-4xl mb-6 leading-tight">
              A Royal Destination Wedding in Udaipur
            </h2>

            <p className="text-muted leading-7 mb-6">
              A glimpse into a majestic wedding celebration set against
              the grandeur of Udaipur — blending heritage, elegance,
              and heartfelt emotions.
            </p>

            <a
              href="/blogs/royal-destination-wedding-udaipur"
              className="text-sm underline"
            >
              READ MORE →
            </a>
          </div>

        </div>

      </section>

      {/* ================= BLOG LIST ================= */}
<section className="px-6 md:px-16 pb-32">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

    {blogs.map((blog, index) => (
      <div
        key={index}
        className="flex flex-col h-full"
      >

        {/* IMAGE – fixed ratio */}
        <div className="relative w-full aspect-[4/3] mb-5 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-sm text-muted mb-2">
          {blog.date}
        </p>

        <h3 className="font-serif text-xl mb-3 leading-snug">
          {blog.title}
        </h3>

        <p className="text-sm text-muted leading-6 mb-6">
          {blog.excerpt}
        </p>

        {/* push to bottom */}
        <a
          href={`/blogs/${blog.slug}`}
          className="text-sm underline mt-auto"
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
    date: "July 28, 2024",
    image: "/images/blogs/1.jpg",
    excerpt:
      "An intimate seaside wedding with golden-hour vows and breathtaking views."
  },
  {
    title: "Inside a Traditional Gujarati Wedding",
    slug: "traditional-gujarati-wedding",
    date: "June 14, 2024",
    image: "/images/blogs/2.jpg",
    excerpt:
      "Exploring rituals, colors, and emotions of a beautiful Gujarati wedding."
  },
  {
    title: "How We Craft Cinematic Wedding Films",
    slug: "crafting-cinematic-wedding-films",
    date: "May 2, 2024",
    image: "/images/blogs/3.jpg",
    excerpt:
      "A behind-the-scenes look at our filmmaking process and storytelling approach."
  }
];
