"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    let timeoutId = null;
    const onScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 10);
        timeoutId = null;
      }, 100);
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-4 border-primary ${
        scrolled ? "bg-cream shadow-[0_4px_0_0_#111111]" : "bg-cream"
      }`}
    >
      <nav className="max-w-[1920px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* logo / brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-cream flex items-center justify-center border-2 border-primary group-hover:-translate-y-1 transition-transform shadow-[2px_2px_0_0_#111111]">
            <Image
              src="/assets/imgs/Students_Senate_Logo.png"
              alt="Students' Senate Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="font-display font-extrabold text-lg leading-tight text-primary uppercase tracking-tighter">
            STUDENTS&apos;<br />SENATE
          </span>
        </Link>

        {/* desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-display text-sm font-bold uppercase tracking-widest transition-all duration-200 px-3 py-2 border-2 ${
                  pathname === link.href
                    ? "bg-primary text-cream border-primary shadow-[2px_2px_0_0_#111111]"
                    : "bg-transparent text-primary border-transparent hover:border-primary hover:shadow-[2px_2px_0_0_#111111]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 border-2 border-transparent hover:border-primary transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t-4 border-primary px-4 py-6 flex flex-col gap-4 shadow-[0_4px_0_0_#111111]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display font-bold text-base uppercase tracking-widest px-4 py-3 border-2 ${
                pathname === link.href
                  ? "bg-primary text-cream border-primary shadow-[2px_2px_0_0_#111111]"
                  : "text-primary border-transparent hover:border-primary hover:shadow-[2px_2px_0_0_#111111]"
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
