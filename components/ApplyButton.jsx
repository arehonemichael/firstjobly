"use client";
import { useRouter } from "next/navigation";

export default function ApplyButton({ link, className, children, title, company, slug }) {
  const router = useRouter();

  const handleClick = () => {
    if (!link) return;
    const params = new URLSearchParams({
      link: encodeURIComponent(link),
      ...(slug && { slug }),
    });
    router.push(`/apply?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className={className || "bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"}
    >
      {children || "Apply Now"}
    </button>
  );
}