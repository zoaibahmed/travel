"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const Hero = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  
  // Search State
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300, 800], [0, 0, 150]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (destination) query.set("dest", destination);
    if (date) query.set("date", date);
    if (guests) query.set("guests", guests);
    router.push(`/tours?${query.toString()}`);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-reveal", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2, ease: "expo.out", stagger: 0.2, delay: 0.5 }
    );
    tl.fromTo(".hero-search-bar-container",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
      "-=1.2"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Cinematic Video + Image Fallback */}
      {/* Background Cinematic Image */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] scale-110"
          style={{ 
            backgroundImage: "url('/hero-user.jpg')",
            filter: "brightness(0.9)"
          }}
        />
        {/* Soft Luxury Overlays */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
      </motion.div>

      {/* Content - Pushed down to avoid overlap */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="container-luxury relative z-10 text-center pt-40 pb-20"
      >
        <div className="hero-reveal mb-10">
            <span className="text-gold uppercase tracking-[1em] text-[10px] font-black block">The Velora of Travel</span>
        </div>
        
        <div className="hero-reveal overflow-hidden">
          <h1 className="text-6xl md:text-[10rem] font-light tracking-tighter leading-[0.8] text-black mb-16">
            Travel, <br />
            <span className="italic font-serif text-gold">Redefined.</span>
          </h1>
        </div>

        <div className="hero-reveal overflow-hidden">
          <p className="text-lg md:text-xl text-black/50 max-w-2xl mx-auto mb-24 tracking-widest font-light leading-relaxed">
            Experience the soul of Pakistan and Bangladesh <br />
            through a lens of pure, unadulterated luxury.
          </p>
        </div>

        {/* Minimalist Search Bar - Interactive */}
        <div className="hero-search-bar-container max-w-5xl mx-auto bg-white/70 backdrop-blur-3xl p-3 rounded-[3rem] border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            
            {/* Destination Selection */}
            <div className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-black/5 hover:bg-black/10 transition-all cursor-pointer group relative">
              <MapPin className="text-gold w-5 h-5" />
              <div className="text-left flex-1">
                <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-0.5">Where to?</p>
                <select 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-bold text-black w-full appearance-none cursor-pointer"
                >
                  <option value="">Select Destination</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="bangladesh">Bangladesh</option>
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-black/5 hover:bg-black/10 transition-all cursor-pointer group">
              <Calendar className="text-gold w-5 h-5" />
              <div className="text-left flex-1">
                <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-0.5">When?</p>
                <input 
                  type="month"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-bold text-black w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Guest Selection */}
            <div className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-black/5 hover:bg-black/10 transition-all cursor-pointer group">
              <Users className="text-gold w-5 h-5" />
              <div className="text-left flex-1">
                <p className="text-[9px] uppercase tracking-widest text-black/40 font-black mb-0.5">Who?</p>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-bold text-black w-full appearance-none cursor-pointer"
                >
                  <option value="">Add Guests</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3+ Passengers</option>
                </select>
              </div>
            </div>

          </div>

          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-black hover:bg-gold text-white px-12 py-6 rounded-[2.5rem] text-[10px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-black/10"
          >
            <Search className="w-4 h-4" />
            <span>Search Journey</span>
          </button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-black/20"
      >
        <span className="text-[9px] uppercase tracking-[0.6em] font-bold">Scroll to Begin</span>
        <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-black/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
