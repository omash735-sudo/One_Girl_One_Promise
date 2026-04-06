"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["About", "Mission", "Programs", "Impact", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-purple-950/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            OG
          </div>
          <div>
            <div className="text-white font-display font-bold text-lg leading-none">OGOP</div>
            <div className="text-yellow-300 text-xs">Yes, I Can Become</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link text-sm">{l}</a>
          ))}
          <a href="#contact" className="btn-primary text-sm py-2 px-5">Donate Now</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-purple-950/98 backdrop-blur-md px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white py-2 border-b border-purple-800/40"
              onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#contact" className="btn-primary text-center mt-2" onClick={() => setOpen(false)}>Donate Now</a>
        </div>
      )}
    </nav>
  );
}
