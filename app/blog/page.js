import PageHeader from "../../components/PageHeader";

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Career Blog" subtitle="Tips, tricks, and guides to launch your career." />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <article className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">How to Craft a Winning CV</h2>
            <p className="text-sm text-gray-600">Get your resume noticed by top recruiters.</p>
          </article>
          <article className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Where to Find Entry-Level Jobs in South Africa</h2>
            <p className="text-sm text-gray-600">Discover the top platforms and companies hiring now.</p>
          </article>
        </div>
      </main>
    </>
  );
}
