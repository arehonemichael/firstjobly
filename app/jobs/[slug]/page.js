import { notFound } from "next/navigation";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";

export const revalidate = 600;

/* ---------------------------
   South Africa SEO helpers
---------------------------- */
const SA_PROVINCES = [
  { name: "Gauteng", codes: ["gp", "gauteng", "johannesburg", "pretoria", "sandton"] },
  { name: "Western Cape", codes: ["wc", "western cape", "cape town"] },
  { name: "KwaZulu-Natal", codes: ["kzn", "kwazulu-natal", "durban"] },
  { name: "Eastern Cape", codes: ["ec", "eastern cape", "gqeberha", "port elizabeth"] },
  { name: "Free State", codes: ["fs", "free state", "bloemfontein"] },
  { name: "Limpopo", codes: ["lp", "limpopo", "polokwane"] },
  { name: "Mpumalanga", codes: ["mp", "mpumalanga", "nelspruit"] },
  { name: "North West", codes: ["nw", "north west"] },
  { name: "Northern Cape", codes: ["nc", "northern cape"] },
];

function extractSALocation(...texts) {
  const fullText = texts.join(" ").toLowerCase();

  const province = SA_PROVINCES.find(p =>
    p.codes.some(code => fullText.includes(code))
  );

  return {
    province: province?.name || "South Africa",
    city: province?.name || "South Africa",
  };
}

/* ---------------------------
   Shared job resolver
---------------------------- */
async function resolveJob(slug) {
  return (
    (await getJobBySlug(slug)) ??
    (slug.length >= 20 && /^[A-Za-z0-9]+$/.test(slug)
      ? await getJobById(slug)
      : null)
  );
}

/* ---------------------------
   Metadata (SEO)
---------------------------- */
export async function generateMetadata({ params }) {
  const job = await resolveJob(params.slug);
  if (!job) return { title: "Job Not Found | FirstJobly" };

  const { city, province } = extractSALocation(
    job.title,
    job.description,
    job.location
  );

  const shortDesc = (job.description || job.requirements || job.title)
    .slice(0, 155)
    .concat("...");

  return {
    title: `${job.title} in ${city}, ${province} | FirstJobly`,
    description: shortDesc,
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
  };
}

/* ---------------------------
   Page
---------------------------- */
export default async function JobDetailPage({ params }) {
  const job = await resolveJob(params.slug);
  if (!job) notFound();

  const { city, province } = extractSALocation(
    job.title,
    job.description,
    job.location
  );

  const datePosted = job.createdAt
    ? new Date(job.createdAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const validThrough = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000
  ).toISOString().split("T")[0];

  const formatRequirements = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const isList =
      lines.length > 4 ||
      lines.every(
        l =>
          l.startsWith("- ") ||
          l.startsWith("• ") ||
          l.startsWith("* ") ||
          /^\d+\.\s/.test(l)
      );

    if (isList) {
      return (
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          {lines.map((line, i) => (
            <li key={i}>
              {line.replace(/^[-•*]\s?/, "").trim()}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="whitespace-pre-line text-gray-700">
        {text}
      </div>
    );
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description:
              job.description ||
              job.requirements ||
              "No description available.",
            datePosted,
            validThrough,
            employmentType: job.title?.toLowerCase().includes("intern")
              ? "INTERN"
              : "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: job.company || "FirstJobly",
              logo: job.logo || "https://firstjobly.co.za/logo.png",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: city,
                addressRegion: province,
                addressCountry: "ZA",
              },
            },
          }),
        }}
      />

      <main className="bg-white max-w-4xl mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {job.logo && (
            <img
              src={job.logo}
              alt={`${job.company || "Company"} logo`}
              className="h-20 mb-8 object-contain"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">
            {job.title}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            {job.company} · {city}, {province}
          </p>

          {job.requirements && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                Requirements
              </h2>
              {formatRequirements(job.requirements)}
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Job Description
            </h2>
            <div className="prose max-w-none">
              {job.description}
            </div>
          </section>

          {job.link && (
            <ApplyButton
              link={job.link}
              className="px-10 py-5 text-lg font-bold"
            >
              Click here to apply
            </ApplyButton>
          )}
        </div>
      </main>
    </>
  );
}
