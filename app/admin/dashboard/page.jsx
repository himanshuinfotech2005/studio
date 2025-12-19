export default function AdminDashboard() {
  return (
    <main className="p-16">

      <h1 className="font-serif text-4xl mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <AdminCard title="Photography" link="/admin/photography" />
        <AdminCard title="Films" link="/admin/films" />
        <AdminCard title="Blogs" link="/admin/blogs" />
        <AdminCard title="Editorial" link="/admin/editorial" />

      </div>

    </main>
  );
}

function AdminCard({ title, link }) {
  return (
    <a
      href={link}
      className="border p-8 hover:bg-black hover:text-white transition"
    >
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="text-sm mt-2">Manage content</p>
    </a>
  );
}
