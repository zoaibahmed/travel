"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ArrowRight, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";

export default function CityDestinationsPage() {
    const { id } = useParams();
    const [city, setCity] = useState<any>(null);
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cityRes, destRes] = await Promise.all([
                    axios.get(`cities/${id}`),
                    axios.get("destinations")
                ]);
                
                setCity(cityRes.data);
                const allDestinations = Array.isArray(destRes.data) ? destRes.data : [];
                setDestinations(allDestinations.filter(d => d.city_id == id));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    return (
        <main className="bg-white min-h-screen">
            <Navbar />
            
            {/* Cinematic Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div 
                        className="absolute inset-0 ken-burns opacity-60"
                        style={{
                            backgroundImage: `url('${city?.images?.[0] || "https://images.unsplash.com/photo-1544085311-11a028465b03?w=2560&auto=format&fit=crop&q=80"}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white z-20" />
                </div>

                <div className="container-luxury relative z-10 text-center pt-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-10 block"
                    >
                        Landmarks In
                    </motion.span>
                    <h1 className="text-6xl md:text-[9.5rem] font-light text-white tracking-tighter leading-none mb-12 drop-shadow-2xl uppercase">
                        {loading ? "Loading..." : city?.name}
                    </h1>
                </div>
            </section>

            {loading ? (
                <div className="flex flex-col items-center py-40">
                    <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin mb-8" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-black/20">Preparing Landmarks...</span>
                </div>
            ) : (
                <div className="pb-40 pt-24 bg-white">
                    <div className="container-luxury">
                        <div className="flex items-end justify-between border-b border-black/10 pb-8 mb-16">
                            <div>
                                <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-black block mb-4">Curated Collection</span>
                                <h3 className="text-4xl font-light tracking-tighter uppercase text-black">Available Landmarks</h3>
                            </div>
                            <span className="text-xs font-black tracking-widest text-black/30 uppercase">{destinations.length} Found</span>
                        </div>

                        {destinations.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-black/30 uppercase tracking-widest text-xs font-black">No landmarks currently charted for this territory.</p>
                                <Link href="/destinations" className="inline-block mt-8 px-8 py-3 border border-black/10 text-black hover:border-gold hover:text-gold transition-colors text-[10px] uppercase tracking-[0.3em] font-black">
                                    Return to Directory
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                                <AnimatePresence mode="popLayout">
                                    {destinations.map((dest, dIdx) => (
                                        <motion.div 
                                            key={dest.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: dIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="group flex flex-col h-full"
                                        >
                                            <div className="aspect-[16/10] overflow-hidden rounded-sm relative mb-12 shadow-2xl">
                                                <img 
                                                    src={dest.images?.[0] || dest.image || "https://images.unsplash.com/photo-1544085311-11a028465b03"} 
                                                    alt={dest.name} 
                                                    className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                                                />
                                                <div className="absolute top-10 left-10 glass-light px-6 py-3 rounded-full">
                                                    <span className="text-[11px] font-black tracking-[0.3em] uppercase">{dest.tagline || 'Heritage'}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.5em] text-black/30 font-black">
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-4 h-4 text-gold" />
                                                        <span>{city?.name}</span>
                                                    </div>
                                                </div>
                                                
                                                <h2 className="text-4xl font-light text-black tracking-tighter group-hover:text-gold transition-colors duration-700 leading-tight uppercase">
                                                    {dest.name}
                                                </h2>
                                                
                                                <Link href={`/destinations/${dest.slug || dest.id}`} className="flex items-center gap-6 text-black font-black uppercase tracking-[0.5em] text-[11px] pt-12 group/btn border-t border-black/5 w-full">
                                                    Explore Landmark
                                                    <div className="flex-1 h-[1px] bg-black/5 group-hover/btn:bg-gold transition-colors duration-700" />
                                                    <ArrowRight className="w-5 h-5 text-gold -translate-x-4 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-700" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <Footer />
        </main>
    );
}
