"use client";

export default function ApplyButton({ link, className, children, title, company, slug }) {
  const handleClick = () => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
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