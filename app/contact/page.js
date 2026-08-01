"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    setStatus("Thanks for your message!");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      {/* 🎯 TOP AD (same unit as blog) */}
      <div id="Firstjobly_Incontent_Lazy" className="my-6"></div>

      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have a question or feedback? Send us a message and we'll get back to you.
      </p>

      <form
        action="https://formspree.io/f/mldnqykb"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={4}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-green-600 text-sm mt-2">{status}</p>
        )}
      </form>

      {/* 🎯 BOTTOM BTF AD */}
      <div id="Firstjobly_Bottom_BTF" className="my-10"></div>
    </main>
  );
}
