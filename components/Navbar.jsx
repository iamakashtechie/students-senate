"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Notifications", href: "/notifications" },
  { name: "About Us", href: "/about" },
  { name: "Admin", href: "/admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-secondary shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo / brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="text-cream text-xs font-display font-bold">
              SS
            </span>
          </div>
          <span
            className={`font-display font-bold text-sm leading-tight transition-colors ${
              scrolled ? "text-primary" : "text-primary"
            }`}
          >
            STUDENTS&apos;
            <br />
            SENATE
          </span>
        </Link>

        {/* desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                }`}
              >
                {link.name}
                {/* underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-200 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-secondary px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body font-medium text-sm ${
                pathname === link.href ? "text-accent" : "text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
