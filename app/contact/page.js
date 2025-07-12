"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thanks for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form
  action="https://formspree.io/f/mldnqykb"
  method="POST"
  className="space-y-4"
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
  ></textarea>

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Send Message
  </button>
</form>

  );
}
