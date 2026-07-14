"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Wind, 
  ArrowRight,
  Calendar,
  Users,
  UtensilsCrossed
} from "lucide-react";
import axios from "@/lib/axios";
import { use } from "react";

export default function HomestayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [stay, setStay] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const res = await axios.get(`homestays/${id}`);
        setStay(res.data);
      } catch (error) {
        console.error("Failed to fetch homestay:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStay();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!stay) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-light mb-4 uppercase tracking-widest text-black/20">Sanctuary Not Found</h1>
        <button onClick={() => window.location.href = '/homestays'} className="px-10 py-4 border border-black/10 hover:border-gold transition-all text-xs font-black uppercase tracking-[0.3em]">Return to Collection</button>
    </div>
  );

  const images = Array.isArray(stay.images) ? stay.images : [stay.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"];
  const amenities = [
    { name: "High-speed Wifi", icon: <Wifi className="w-5 h-5" /> },
    { name: "Gourmet Breakfast", icon: <Coffee className="w-5 h-5" /> },
    { name: "24/7 Security", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Climate Control", icon: <Wind className="w-5 h-5" /> },
    { name: "Private Chef", icon: <UtensilsCrossed className="w-5 h-5" /> },
  ];

  return (
    <main className="bg-white min-h-screen text-black font-sans">
      <Navbar />

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemName={stay.name}
        itemType="homestay"
        itemId={stay.id}
        price={stay.price_per_night}
      />

      {/* 🖼️ CINEMATIC HERO GALLERY */}
      <section className="pt-32 pb-20">
          <div className="container-luxury">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[70vh]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
                  >
                      <img src={images[0]} className="w-full h-full object-cover" alt={stay.name} />
                  </motion.div>
                  <motion.div className="md:col-span-2 rounded-2xl overflow-hidden relative group">
                      <img src={images[1] || images[0]} className="w-full h-full object-cover" alt="Gallery 1" />
                  </motion.div>
                  <motion.div className="md:col-span-2 rounded-2xl overflow-hidden relative group">
                      <img src={images[2] || images[0]} className="w-full h-full object-cover" alt="Gallery 2" />
                  </motion.div>
              </div>
          </div>
      </section>

      {/* 📜 CONTENT SECTION */}
      <section className="pb-40">
          <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                  <div className="lg:col-span-2 space-y-16">
                      <div>
                          <div className="flex items-center gap-4 text-gold mb-6">
                              <MapPin className="w-5 h-5" />
                              <span className="text-xs uppercase tracking-[0.5em] font-black">{stay.location || stay.destination?.name}</span>
                          </div>
                          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none mb-10 uppercase">{stay.name}</h1>
                          
                          <div className="flex flex-wrap gap-12 py-10 border-y border-black/5">
                              <div className="flex items-center gap-4">
                                  <Star className="w-5 h-5 text-gold fill-gold" />
                                  <div>
                                      <p className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Rating</p>
                                      <p className="font-bold">{stay.rating || "4.9"}</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="space-y-8">
                          <h2 className="text-3xl font-serif italic text-gold">The Experience</h2>
                          <p className="text-xl text-black/60 font-light leading-relaxed max-w-3xl">{stay.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                           <div className="space-y-8">
                                <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-black/40">Amenities</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {amenities.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6 group">
                                            <div className="w-10 h-10 rounded-sm border border-black/5 flex items-center justify-center group-hover:border-gold transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-medium tracking-wide">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                      </div>
                  </div>

                  <div className="lg:col-span-1">
                      <div className="sticky top-32 p-10 bg-white border border-black/5 shadow-2xl rounded-sm">
                          <div className="flex items-baseline justify-between mb-10">
                              <div>
                                  <span className="text-4xl font-light">${stay.price_per_night}</span>
                                  <span className="text-[10px] uppercase tracking-widest text-black/30 font-black ml-3">/ night</span>
                              </div>
                          </div>

                          <button 
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 group hover:bg-gold transition-all duration-700 shadow-xl"
                          >
                              Request Booking
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
