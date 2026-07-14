"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-16 text-center border-t border-black/5 mt-32 bg-white">
      <div className="container-luxury">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-xl font-light tracking-[0.8em] uppercase text-black">
            Velora
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-[10px] uppercase tracking-[0.5em] font-bold text-black/30">
          <Link href="/tours" className="hover:text-gold transition-all duration-500">Experiences</Link>
          <Link href="/destinations" className="hover:text-gold transition-all duration-500">Destinations</Link>
          <Link href="/homestays" className="hover:text-gold transition-all duration-500">Homestays</Link>
          <Link href="/blogs" className="hover:text-gold transition-all duration-500">The Journal</Link>
          <Link href="/inquire" className="hover:text-gold transition-all duration-500">Inquire</Link>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-10 mb-8 text-[10px] uppercase tracking-[0.5em] font-bold text-black/20">
          <a href="#" className="hover:text-gold transition-all duration-500">Instagram</a>
          <a href="#" className="hover:text-gold transition-all duration-500">Perspective</a>
          <a href="#" className="hover:text-gold transition-all duration-500">Privacy</a>
        </div>

        <p className="text-black/15 text-[9px] uppercase tracking-[1em] font-bold">
          © 2026 Velora. Crafted for the Curious.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
