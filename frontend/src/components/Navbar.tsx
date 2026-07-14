"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

interface NavbarProps {
  forceTransparent?: boolean;
}

const Navbar = ({ forceTransparent = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Determine actual visual state
  const isTransparent = forceTransparent || !scrolled;
  const isOpaque = !isTransparent;

  useEffect(() => {
    const handleScroll = () => {
      // Only go opaque after scrolling past ~80% of viewport height (past the hero)
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experiences", href: "/tours" },
    { name: "Destinations", href: "/destinations" },
    { name: "Homestays", href: "/homestays" },
    { name: "The Journal", href: "/blogs" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isOpaque
            ? "py-3 bg-white/90 backdrop-blur-2xl border-b border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.04)]"
            : "py-8 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className={`w-8 h-8 border rounded-sm flex items-center justify-center transition-all duration-500 ${
                isOpaque ? "border-gold/30 group-hover:border-gold" : "border-white/30 group-hover:border-gold"
              }`}
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-gold font-serif text-sm font-bold">V</span>
            </motion.div>
            <span className={`text-[15px] font-light tracking-[0.4em] uppercase transition-colors duration-500 ${
              isOpaque ? "text-black" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            }`}>
              Velora
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[10px] uppercase tracking-[0.5em] font-bold transition-all duration-500 group/link hover:text-gold ${
                  isOpaque ? "text-black/40" : "text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button className={`w-9 h-9 rounded-full border flex items-center justify-center hover:text-gold hover:border-gold transition-all duration-500 ${
              isOpaque ? "border-black/5 text-black/30" : "border-white/20 text-white/70"
            }`}>
              <Search className="w-4 h-4" />
            </button>

            <div className={`h-5 w-px ${isOpaque ? "bg-black/5" : "bg-white/15"}`} />

            <Link
              href="/login"
              className={`text-[10px] uppercase tracking-[0.4em] font-bold hover:text-gold transition-all duration-500 ${
                isOpaque ? "text-black/50" : "text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              }`}
            >
              Reserved Access
            </Link>

            <Link
              href="/inquire"
              className={`relative overflow-hidden px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 group/btn hover:shadow-xl ${
                isOpaque
                  ? "bg-black text-white hover:shadow-black/20"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black"
              }`}
            >
              <span className="relative z-10">Inquire</span>
              {isOpaque && (
                <div className="absolute inset-0 bg-gold scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
              isOpaque ? "border-black/5 text-black" : "border-white/20 text-white"
            }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full p-12">
              <div className="flex justify-between items-center mb-20">
                <span className="text-xl font-light tracking-[0.4em] uppercase">Velora</span>
                <button onClick={() => setMobileMenu(false)} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2 flex-1 justify-center">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenu(false)}
                      className="block text-6xl font-serif font-light text-black hover:text-gold transition-colors duration-500 py-4 border-b border-black/5"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col gap-4 mt-16"
              >
                <Link href="/login" onClick={() => setMobileMenu(false)} className="text-center py-5 rounded-full border border-black/10 font-bold uppercase tracking-[0.4em] text-xs hover:border-gold hover:text-gold transition-all">
                  Reserved Access
                </Link>
                <Link href="/inquire" onClick={() => setMobileMenu(false)} className="text-center py-5 rounded-full bg-black text-white font-bold uppercase tracking-[0.4em] text-xs hover:bg-gold transition-all">
                  Begin Inquiry
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
