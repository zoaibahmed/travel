"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  ArrowRight, 
  Compass, 
  Palmtree, 
  Mountain, 
  Wind,
  Star,
  Clock
} from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import { use } from "react";

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await axios.get(`destinations/${id}`);
        setDestination(res.data);
      } catch (error) {
        console.error("Failed to fetch destination:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!destination) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-light mb-4 uppercase tracking-widest text-black/20">Discovery Failed</h1>
        <p className="text-black/40 mb-8">This destination has not yet been charted.</p>
        <button onClick={() => window.location.href = '/destinations'} className="px-10 py-4 border border-black/10 hover:border-gold transition-all text-xs font-black uppercase tracking-[0.3em]">Return to Atlas</button>
    </div>
  );

  const images = Array.isArray(destination.images) ? destination.images : [];
  const tours = destination.tours || [];
  const homestays = destination.homestays || [];

  return (
    <main className="bg-white min-h-screen text-black font-sans">
      <Navbar />

      {/* 🏔️ IMMERSIVE HERO SECTION */}
      <section className="relative h-[100vh] flex items-center overflow-hidden bg-black">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
              <img 
                src={images[0] || "https://images.unsplash.com/photo-1544085311-11a028465b03?w=2560&auto=format&fit=crop&q=80"} 
                className="w-full h-full object-cover opacity-60" 
                alt={destination.name}
              />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white z-10" />

          <div className="container-luxury relative z-20 pt-40">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                  <span className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-10 block">Discovery Spotlight</span>
                  <h1 className="text-7xl md:text-[12rem] font-light text-white tracking-tighter leading-[0.8] mb-12 uppercase">
                      {destination.name.split(' ').length > 1 ? (
                        <>
                          {destination.name.split(' ')[0]} <br />
                          <span className="italic font-serif text-gold">{destination.name.split(' ').slice(1).join(' ')}</span>
                        </>
                      ) : (
                        <span className="italic font-serif text-gold">{destination.name}</span>
                      )}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 font-light tracking-[0.3em] uppercase">{destination.tagline}</p>
              </motion.div>
          </div>
      </section>

      {/* 📊 STATS & INFO */}
      <section className="py-40">
          <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  <div className="space-y-12">
                      <h2 className="text-5xl font-light tracking-tighter leading-tight font-serif italic text-gold">The Essence of {destination.name}</h2>
                      <p className="text-2xl text-black/60 font-light leading-relaxed">
                          {destination.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                          {[
                            { label: "Peak Season", value: "May - Oct", icon: <Compass className="w-5 h-5" /> },
                            { label: "Atmosphere", value: "Serene", icon: <Wind className="w-5 h-5" /> },
                            { label: "Highlight", value: destination.highlight || "Nature", icon: <Mountain className="w-5 h-5" /> },
                          ].map((stat, idx) => (
                              <div key={idx} className="space-y-4">
                                  <div className="text-gold">{stat.icon}</div>
                                  <p className="text-[10px] uppercase tracking-widest font-black text-black/30">{stat.label}</p>
                                  <p className="text-lg font-bold">{stat.value}</p>
                              </div>
                          ))}
                      </div>
                  </div>
                  
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                      <img src={images[1] || images[0] || "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=1200"} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" alt="Landscape" />
                      <div className="absolute inset-0 border-[40px] border-white/10 m-8 rounded-xl" />
                  </div>
              </div>
          </div>
      </section>

      {/* 🎒 FEATURED TOURS */}
      {tours.length > 0 && (
        <section className="py-40 bg-slate-50 overflow-hidden">
            <div className="container-luxury">
                <div className="flex items-end justify-between mb-24">
                    <div>
                        <span className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-6 block">Exclusive Journeys</span>
                        <h2 className="text-6xl font-light tracking-tighter">Curated Expeditions</h2>
                    </div>
                    <Link href="/tours" className="flex items-center gap-6 text-black font-black uppercase tracking-[0.5em] text-[11px] group pb-2 border-b border-black/5 hover:border-gold transition-all">
                        All Experiences
                        <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-4 transition-transform duration-700" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {tours.map((tour: any) => (
                        <motion.div 
                          key={tour.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                            <div className="aspect-[16/10] rounded-sm overflow-hidden mb-10 relative shadow-2xl">
                                <img src={tour.images?.[0] || tour.image} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt={tour.title} />
                                <div className="absolute top-8 left-8 glass-light px-6 py-3 rounded-full flex items-center gap-3">
                                    <Star className="w-4 h-4 text-gold fill-gold" />
                                    <span className="text-[10px] font-black tracking-widest">{tour.rating || "5.0"}</span>
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-light tracking-tight group-hover:text-gold transition-colors duration-500 uppercase">{tour.title}</h3>
                                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-black/30">
                                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>{tour.duration}</span></div>
                                        <div className="w-1 h-1 rounded-full bg-gold" />
                                        <span>From ${tour.price}</span>
                                    </div>
                                </div>
                                <Link href={`/tours/${tour.slug || tour.id}`} className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* 🏡 ELITE HOMESTAYS */}
      {homestays.length > 0 && (
        <section className="py-40">
            <div className="container-luxury">
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-6">Authentic Living</span>
                    <h2 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-none mb-10">Private <span className="italic font-serif text-gold">Sanctuaries</span></h2>
                    <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {homestays.map((stay: any) => (
                        <Link href={`/homestays/${stay.slug || stay.id}`} key={stay.id} className="group">
                            <div className="aspect-square rounded-full overflow-hidden mb-10 relative border-[20px] border-slate-50 group-hover:border-gold transition-all duration-1000">
                                <img src={stay.images?.[0] || stay.image} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-125" alt={stay.name} />
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-light tracking-tight uppercase">{stay.name}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/40">${stay.price_per_night} / Night</p>
                            </div>
                        </Link>
                    ))}
                    
                    {/* Explore More Card */}
                    <Link href="/homestays" className="group flex flex-col items-center justify-center p-20 border border-dashed border-black/10 rounded-full aspect-square hover:border-gold transition-all">
                        <Palmtree className="w-12 h-12 text-gold mb-6 group-hover:scale-125 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Explore More</span>
                    </Link>
                </div>
            </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
