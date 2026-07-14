"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CountryCards from "@/components/CountryCards";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "@/lib/axios";

gsap.registerPlugin(ScrollTrigger);

// ─── Preloader ─────────────────────────────────────────────────────────
const Preloader = () => (
    <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
        <div className="text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                className="text-2xl font-light tracking-[1em] uppercase text-black">
                Velora
            </motion.span>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }}
                className="h-px bg-gold mt-8 mx-auto" />
        </div>
    </motion.div>
);

// ─── Main Page ─────────────────────────────────────────────────────────
export default function Home() {
    const [loading, setLoading] = useState(true);
    const [isVideoSectionInView, setIsVideoSectionInView] = useState(false);

    // Parallax for Unveiling section
    const unveilingRef = useRef<HTMLElement>(null);
    const { scrollYProgress: unveilingP } = useScroll({ target: unveilingRef, offset: ["start end", "end start"] });
    const videoY = useTransform(unveilingP, [0, 1], ["0%", "20%"]);

    // Track cinematic video section for navbar transparency
    const videoSectionRef = useRef<HTMLElement>(null);

    const [tours, setTours] = useState<any[]>([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get("tours");
                setTours(Array.isArray(res.data) ? res.data.slice(0, 3) : []); 
            } catch (error) {
                console.error("Failed to fetch tours:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTours();
        
        // Performance: Use a single observer for all videos
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.05 } // Lower threshold for earlier activation
        );

        document.querySelectorAll("video").forEach(v => {
            v.playbackRate = 0.8; 
            videoObserver.observe(v);
        });

        // Track cinematic video section for navbar transparency
        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsVideoSectionInView(entry.isIntersecting);
            },
            { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
        );

        if (videoSectionRef.current) {
            sectionObserver.observe(videoSectionRef.current);
        }

        return () => {
            videoObserver.disconnect();
            sectionObserver.disconnect();
        };
    }, []);

    return (
        <main className="bg-white min-h-screen">
            <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
            <Navbar forceTransparent={isVideoSectionInView} />
            <Hero />

            {/* ── MANIFESTO (RE-IMAGINED) ── Editorial Layout */}
            <section className="relative py-60 bg-white overflow-hidden">
                <div className="container-luxury relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                        {/* Content side */}
                        <div className="lg:col-span-7 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-12 h-px bg-gold" />
                                    <span className="text-gold uppercase tracking-[1em] text-[10px] font-black">Our Philosophy</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-light text-black tracking-tighter leading-[0.95] mb-12 font-serif">
                                    Beyond Travel. <br />
                                    <span className="italic text-gold">Pure Intention.</span>
                                </h2>
                                <p className="text-black/60 text-2xl font-light leading-relaxed max-w-2xl tracking-wide">
                                    Luxury is not a destination, but a state of presence. Every journey we design is a silent dialogue between the soul and the landscape.
                                </p>
                            </motion.div>

                            {/* Floating Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-black/5">
                                {[
                                    { n: "48+", l: "Destinations" },
                                    { n: "1,200+", l: "Journeys" },
                                    { n: "98%", l: "Retention" },
                                    { n: "24/7", l: "Concierge" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="text-4xl font-black text-black tracking-tighter mb-2">{stat.n}</div>
                                        <div className="text-[9px] uppercase tracking-[0.4em] font-black text-black/30">{stat.l}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Visual side - Floating Image Card */}
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="aspect-[4/5] rounded-sm overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] relative z-10"
                            >
                                <div
                                    className="absolute inset-0 ken-burns"
                                    style={{
                                        backgroundImage: "url('/philosophy-mughal.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </motion.div>
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UNVEILING THE UNSEEN ── */}
            <section ref={unveilingRef} className="relative flex items-center justify-center overflow-hidden bg-[#0d1117]" style={{ height: "140vh" }}>
                <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0d1117]" />
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('/unveiling-tea.png')" }}
                    />
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
                </motion.div>
                <div className="container-luxury relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 2 }}>
                        <span className="text-gold uppercase tracking-[1.8em] text-[11px] font-black mb-12 block">A Journey of the Soul</span>
                        <h2 className="text-6xl md:text-[11rem] font-light text-white tracking-tighter font-serif italic leading-none drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
                            Unveiling <br />The Unseen
                        </h2>
                        <div className="w-px h-40 bg-gradient-to-b from-gold to-transparent mx-auto mt-20" />
                    </motion.div>
                </div>
            </section>

            {/* ── EXPERIENCE CARDS ── */}
            <CountryCards />

            {/* ── CINEMATIC FULL-BLEED VIDEO SECTION (ENHANCED) ── */}
            <section ref={videoSectionRef} className="relative w-full overflow-hidden will-change-transform" style={{ height: "120vh" }}>
                {/* Fallback Ken Burns Image */}
                <div
                    className="absolute inset-0 ken-burns"
                    style={{
                        backgroundImage: "url('/hero-user.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* 🎬 USER'S LOCAL VIDEO */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10"
                >
                    <source src="/videos/main-cinematic.mp4" type="video/mp4" />
                </video>

                {/* Bottom smooth fade transition to avoid 'half video' look */}
                <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-white to-transparent z-[15] pointer-events-none" />
            </section>

            {/* ── CURATED COLLECTIONS ── */}
            <section className="relative py-60 px-8 overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url('/collections-sunny.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 z-[1] bg-white/45" />

                <div className="container-luxury relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                        <div>
                            <span className="text-gold uppercase tracking-[0.7em] text-[10px] font-black mb-8 block">Exclusive Journeys</span>
                            <h2 className="luxury-heading text-6xl md:text-[7.5rem] font-light text-black tracking-tighter leading-[0.9]">Curated <br />Collections</h2>
                        </div>
                        <button className="flex items-center gap-10 text-black/40 hover:text-gold transition-all duration-1000 text-[12px] uppercase tracking-[0.6em] font-black group">
                            View Catalog
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-700">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {tours.map((tour, idx) => {
                            const tourImage = tour.images?.[0] || tour.image || "https://images.unsplash.com/photo-1544085311-11a028465b03";
                            const tourLocation = tour.city?.name || tour.location || "Global Expedition";
                            
                            return (
                                <motion.div key={tour.id}
                                    initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: idx * 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/tours/${tour.slug || tour.id}`}>
                                        <div
                                            className="aspect-[4/5] overflow-hidden mb-12 relative rounded-sm shadow-2xl shadow-black/10"
                                            style={{ backgroundImage: `url('${tourImage}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f8fafc" }}
                                        >
                                            <img src={tourImage} alt={tour.title} className="w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110" loading="lazy" />
                                            <div className="absolute top-10 right-10 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full text-[11px] font-black tracking-[0.3em] text-black opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000">
                                                 ${tour.price}
                                             </div>
                                            <button 
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    try {
                                                        await axios.post('saved-escapes', { item_type: 'tour', item_id: tour.id });
                                                        alert("Journey saved to your escapes.");
                                                    } catch(err: any) {
                                                        if(err.response?.status === 401) window.location.href = "/login";
                                                        else alert("Already saved or failed to save.");
                                                    }
                                                }}
                                                className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-700 z-20 group/heart"
                                            >
                                                <Heart className="w-6 h-6 group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-colors" />
                                            </button>
                                        </div>
                                        <p className="text-[11px] uppercase tracking-[0.8em] text-gold font-black mb-4">{tourLocation}</p>
                                        <h3 className="text-4xl font-light text-black tracking-tight group-hover:tracking-[0.2em] transition-all duration-1000 uppercase">{tour.title}</h3>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
