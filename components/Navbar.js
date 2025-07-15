"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          FirstJobly
        </Link>

        {/* Hidden on desktop */}
        <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
          {/* You can add desktop nav here if needed */}
        </nav>

        {/* Button absolutely at top-right */}
        <button
          className="md:hidden absolute top-4 right-6 text-gray-800 z-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-right">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-800 hover:text-blue-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
