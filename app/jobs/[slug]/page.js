import { notFound } from "next/navigation";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";

export const revalidate = 600;

// Mapping provinces to their standard names and abbreviations for SEO
const SA_PROVINCES = [
  { name: "Gauteng", codes: ["GP", "Gauteng"] },
  { name: "Western Cape", codes: ["WC", "Western Cape", "Cape Town"] },
  { name: "KwaZulu-Natal", codes: ["KZN", "KwaZulu-Natal", "Natal", "Durban"] },
  { name: "Eastern Cape", codes: ["EC", "Eastern Cape", "Gqeberha"] },
  { name: "Free State", codes: ["FS", "Free State"] },
  { name: "Limpopo", codes: ["LP", "Limpopo"] },
  { name: "Mpumalanga", codes: ["MP", "Mpumalanga"] },
  { name: "North West", codes: ["NW", "North West"] },
  { name: "Northern Cape", codes: ["NC", "Northern Cape"] }
];

function extractSALocation(title = "", description = "") {
  const fullText = `${title} ${description}`.toLowerCase();
  
  // 1. Detect Province
  const matchedProvince = SA_PROVINCES.find(p => 
    p.codes.some(code => fullText.includes(code.toLowerCase()))
  );

  // 2. Detect Major City (Top traffic drivers)
  const cities = ["Sandton", "Johannesburg", "Pretoria", "Cape Town", "Durban", "Port Elizabeth", "Bloemfontein", "Polokwane", "Nelspruit"];
  const matchedCity = cities.find(city => fullText.includes(city.toLowerCase()));

  return {
    province: matchedProvince ? matchedProvince.name : "South Africa",
    city: matchedCity || (matchedProvince ? matchedProvince.name : "South Africa")
  };
}

export async function generateMetadata({ params }) {
  const job = (await getJobBySlug(params.slug)) ?? 
              (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug) ? await getJobById(params.slug) : null);

  if (!job) return { title: "Job Not Found | FirstJobly" };

  const { city, province } = extractSALocation(job.title, job.description);

  return {
    title: `${job.title} in ${city}, ${province} | FirstJobly`,
    description: (job.description || job.title).slice(0, 155) + "...",
  };
}

export default async function JobDetailPage({ params }) {
  const job = (await getJobBySlug(params.slug)) ?? 
              (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug) ? await getJobById(params.slug) : null);

  if (!job) notFound();

  const { city, province } = extractSALocation(job.title, job.description);
  const datePosted = job.createdAt ? new Date(job.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description || job.requirements,
            "datePosted": datePosted,
            "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            "employmentType": job.title?.toLowerCase().includes("intern") ? "INTERN" : "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": job.company || "FirstJobly",
              "logo": job.logo || "https://firstjobly.co.za/logo.png"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": city,
                "addressRegion": province, // <--- This is the key for Provincial SEO
                "addressCountry": "ZA"
              }
            }
          })
        }}
      />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-500 mb-6">{job.company} • {city}, {province}</p>
        
        <div className="prose mb-8">
          {job.description}
        </div>

        {job.link && <ApplyButton link={job.link}>Apply Now</ApplyButton>}
      </main>
    </>
  );
}