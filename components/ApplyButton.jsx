"use client";

export default function ApplyButton({ link }) {
  const handleClick = () => {
    const newWindow = window.open(link, "_blank");

    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      alert("Unable to open the application link. Please check your popup blocker or try again.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Apply Now
    </button>
  );
}
