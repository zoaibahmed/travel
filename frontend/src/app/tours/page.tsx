"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "@/lib/axios";

export default function ToursPage() {
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [cRes, cityRes] = await Promise.all([
                    axios.get("countries"),
                    axios.get("cities"),
                ]);
                
                setCountries(Array.isArray(cRes.data) ? cRes.data : []);
                setCities(Array.isArray(cityRes.data) ? cityRes.data : []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    return (
        <main className="bg-white min-h-screen">
            <Navbar />
            
            {/* Cinematic Header */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div 
                        className="absolute inset-0 ken-burns opacity-60"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&auto=format&fit=crop&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white z-20" />
                </div>

                <div className="container-luxury relative z-10 text-center pt-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-10 block"
                    >
                        The Grand Directory
                    </motion.span>
                    <h1 className="text-6xl md:text-[9.5rem] font-light text-black tracking-tighter leading-none mb-12 drop-shadow-xl uppercase">
                        Select <span className="italic font-serif text-gold">Territory</span>
                    </h1>
                    <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent mx-auto" />
                </div>
            </section>

            {loading ? (
                <div className="flex flex-col items-center py-40">
                    <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin mb-8" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-black/20">Charting Territories...</span>
                </div>
            ) : (
                <div className="pb-40">
                    {countries.map((country, idx) => {
                        const countryCities = cities.filter(c => c.country_id === country.id);
                        if (countryCities.length === 0) return null;
                        
                        return (
                            <section key={country.id} className="pt-32 border-b border-black/5 last:border-0 pb-16">
                                <div className="container-luxury mb-16">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase text-black mb-6">
                                            {country.name}
                                        </h2>
                                        <p className="text-black/40 font-light tracking-widest uppercase text-[10px] max-w-xl">
                                            Select a territory to unveil its exclusive expeditions.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Horizontal Scrollable Cities */}
                                <div className="w-full overflow-x-auto hide-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                                    <div className="flex gap-8 px-12 md:px-24 min-w-max">
                                        {countryCities.map((city) => {
                                            return (
                                                <Link 
                                                    href={`/tours/city/${city.id}`}
                                                    key={city.id}
                                                    className="relative w-[350px] h-[450px] rounded-sm overflow-hidden block transition-all duration-700 group ring-4 ring-transparent hover:ring-gold hover:ring-offset-8 scale-95 hover:scale-100"
                                                >
                                                    <img 
                                                        src={city.images?.[0] || "https://images.unsplash.com/photo-1544085311-11a028465b03"} 
                                                        className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                                                        alt={city.name}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                                                    <div className="absolute bottom-10 left-10 text-white z-10 transition-transform duration-700 group-hover:-translate-y-4">
                                                        <span className="text-[9px] text-gold uppercase tracking-[0.4em] font-black block mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Explore</span>
                                                        <h3 className="text-3xl font-light tracking-tight">{city.name}</h3>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
            
            <Footer />
        </main>
    );
}
