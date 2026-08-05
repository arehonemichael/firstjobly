"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 ${
        scrolled
          ? "border-gray-100 bg-white/95 shadow-sm backdrop-blur"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold text-pink-600 transition hover:text-pink-700"
          aria-label="FirstJobly home"
        >
          First<span className="text-gray-900">Jobly.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 font-medium text-gray-700 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 transition ${
                  active
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.name}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-pink-600 transition-transform ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="z-50 rounded-lg p-2 text-gray-800 transition hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-gray-100 bg-white transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-72 border-t shadow-sm" : "max-h-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-left font-medium transition ${
                  active
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-pink-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
