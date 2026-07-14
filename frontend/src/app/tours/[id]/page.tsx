"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  X
} from "lucide-react";
import axios from "@/lib/axios";
import { use } from "react";

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`tours/${id}`);
        setTour(res.data);
      } catch (error) {
        console.error("Failed to fetch tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!tour) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-light mb-4 uppercase tracking-widest text-black/20">Journey Not Found</h1>
        <button onClick={() => window.location.href = '/'} className="px-10 py-4 border border-black/10 hover:border-gold transition-all text-xs font-black uppercase tracking-[0.3em]">Return to Base</button>
    </div>
  );

  const images = tour.images || [];
  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];
  const includes = Array.isArray(tour.includes) ? tour.includes : [];
  const excludes = Array.isArray(tour.excludes) ? tour.excludes : [];
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];
  const luxuryFeatures = Array.isArray(tour.luxury_features) ? tour.luxury_features : [];

  return (
    <main className="bg-white min-h-screen text-black font-sans">
      <Navbar />

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemName={tour.title}
        itemType="tour"
        itemId={tour.id}
        price={tour.price}
      />

      {/* 🖼️ CINEMATIC HERO GALLERY */}
      <section className="pt-32 pb-20">
          <div className="container-luxury">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[85vh]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
                  >
                      <img src={tour.hero_image || images[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" alt={tour.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-12 left-12 right-12 text-white">
                          <div className="flex items-center gap-3 mb-6">
                              <span className="px-5 py-2 bg-gold/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-black">Curated Expedition</span>
                              <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 fill-gold text-gold" />
                                  <span className="text-sm font-bold">{tour.rating || "5.0"}</span>
                              </div>
                          </div>
                          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85] uppercase mb-4">{tour.title}</h1>
                          <p className="text-xl font-light tracking-widest text-white/60 uppercase max-w-xl">{tour.location}</p>
                      </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="md:col-span-2 rounded-2xl overflow-hidden relative group h-full"
                  >
                      <img src={images[1] || "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" alt="Gallery 1" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="md:col-span-2 rounded-2xl overflow-hidden relative group h-full"
                  >
                      <img src={images[2] || "https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" alt="Gallery 2" />
                  </motion.div>
              </div>
          </div>
      </section>

      {/* 📜 CONTENT SECTION */}
      <section className="pb-40">
          <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                  
                  {/* LEFT: DETAILS */}
                  <div className="lg:col-span-2 space-y-32">
                      <div>
                          <div className="flex flex-wrap gap-16 py-12 border-y border-black/5 mb-20">
                              <div className="flex items-center gap-5">
                                  <Clock className="w-6 h-6 text-gold" />
                                  <div>
                                      <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black mb-1">Duration</p>
                                      <p className="font-bold text-lg">{tour.duration} / {tour.nights || (parseInt(tour.duration) - 1)} Nights</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-5">
                                  <Users className="w-6 h-6 text-gold" />
                                  <div>
                                      <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black mb-1">Group Size</p>
                                      <p className="font-bold text-lg">Max {tour.group_size || 12} Guests</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-5">
                                  <Calendar className="w-6 h-6 text-gold" />
                                  <div>
                                      <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black mb-1">Best Season</p>
                                      <p className="font-bold text-lg">{tour.best_season || "Year-round"}</p>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-12">
                              <h2 className="text-5xl font-light tracking-tighter uppercase tracking-[0.2em] text-gold/80">The Narrative</h2>
                              <div className="prose prose-2xl font-light text-black/60 max-w-none space-y-8 leading-relaxed">
                                  <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                                      {tour.narrative || tour.description}
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* ✨ HIGHLIGHTS & LUXURY FEATURES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                          <div className="space-y-10">
                              <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Expedition Highlights</h3>
                              <ul className="space-y-6">
                                  {highlights.map((h: string, i: number) => (
                                      <li key={i} className="flex items-start gap-4 group">
                                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 group-hover:scale-150 transition-transform" />
                                          <span className="text-lg font-light tracking-wide">{h}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="space-y-10">
                              <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Luxury Signature Features</h3>
                              <ul className="space-y-6">
                                  {luxuryFeatures.map((f: string, i: number) => (
                                      <li key={i} className="flex items-start gap-4 group">
                                          <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 group-hover:bg-gold transition-colors" />
                                          <span className="text-lg font-light tracking-wide">{f}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>

                      {/* 🗺️ THE ITINERARY */}
                      <div className="space-y-16">
                          <h2 className="text-5xl font-light tracking-tighter uppercase tracking-[0.2em]">The Itinerary</h2>
                          <div className="space-y-16">
                              {itinerary.map((item: any, idx: number) => {
                                  // Find assigned room for this day
                                  const dayNumber = idx + 1;
                                  const assignedRoom = tour.homestays?.find((h: any) => h.pivot?.day === dayNumber);

                                  return (
                                      <div key={idx} className="relative pl-24 group">
                                          <div className="absolute left-0 top-0 w-16 h-16 rounded-full border border-black/5 flex items-center justify-center font-bold text-black group-hover:bg-black group-hover:text-white transition-all duration-700">
                                              {dayNumber}
                                          </div>
                                          <div className="space-y-6">
                                              <h3 className="text-3xl font-bold uppercase tracking-tight">{item.day}: {item.title}</h3>
                                              <p className="text-xl text-black/50 font-light leading-relaxed max-w-2xl">{item.desc}</p>
                                              
                                              {assignedRoom && (
                                                  <motion.div 
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    className="mt-8 p-8 bg-slate-50 border border-black/5 rounded-sm flex gap-8 items-center group/room cursor-pointer hover:bg-white hover:shadow-xl transition-all duration-700"
                                                    onClick={() => window.location.href = `/homestays/${assignedRoom.id || assignedRoom.slug}`}
                                                  >
                                                      <div className="w-32 h-20 overflow-hidden rounded-sm">
                                                          <img src={assignedRoom.images?.[0] || images[0]} className="w-full h-full object-cover group-hover/room:scale-110 transition-transform duration-1000" />
                                                      </div>
                                                      <div>
                                                          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold mb-1">Featured Accommodation</p>
                                                          <h4 className="text-xl font-bold uppercase tracking-tight">{assignedRoom.name}</h4>
                                                          <div className="flex items-center gap-4 mt-2">
                                                              <span className="text-[10px] uppercase font-black tracking-widest text-black/30">View Room</span>
                                                              <ArrowRight className="w-3 h-3 text-gold group-hover/room:translate-x-2 transition-transform" />
                                                          </div>
                                                      </div>
                                                  </motion.div>
                                              )}
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>

                      {/* 🏨 ALL ASSOCIATED STAYS (Summary) */}
                      {tour.homestays && tour.homestays.length > 0 && (
                          <div className="pt-20 space-y-12 border-t border-black/5">
                              <div>
                                  <h2 className="text-4xl font-light tracking-tight uppercase tracking-widest mb-4">Bespoke Accommodations</h2>
                                  <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.4em]">Elite Stays Included in this Journey</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                  {tour.homestays.filter((h: any) => !h.pivot?.day).map((h: any) => (
                                      <motion.div 
                                          key={h.id}
                                          whileHover={{ y: -10 }}
                                          className="group relative bg-slate-50 rounded-sm overflow-hidden border border-black/5 shadow-sm"
                                      >
                                          <div className="aspect-[16/10] overflow-hidden relative">
                                              <img src={h.images?.[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                          </div>
                                          <div className="p-10 space-y-4">
                                              <h3 className="text-2xl font-bold uppercase tracking-tight">{h.name}</h3>
                                              <button onClick={() => window.location.href = `/homestays/${h.id || h.slug}`} className="text-[9px] font-black uppercase tracking-[0.3em] hover:text-gold transition-colors flex items-center gap-3">
                                                  View Room <ArrowRight className="w-3 h-3" />
                                              </button>
                                          </div>
                                      </motion.div>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* 📋 INCLUSIONS & EXCLUSIONS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-20 border-t border-black/5">
                          <div className="space-y-10">
                              <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-black">What's Included</h3>
                              <div className="space-y-6">
                                  {includes.map((item: string, i: number) => (
                                      <div key={i} className="flex items-center gap-4">
                                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                                          <span className="text-lg font-light tracking-wide">{item}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                          <div className="space-y-10">
                              <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-black">What's Excluded</h3>
                              <div className="space-y-6">
                                  {excludes.map((item: string, i: number) => (
                                      <div key={i} className="flex items-center gap-4">
                                          <X className="w-5 h-5 text-red-500" />
                                          <span className="text-lg font-light tracking-wide opacity-50">{item}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT: BOOKING WIDGET */}
                  <div className="lg:col-span-1">
                      <div className="sticky top-32 p-12 bg-white border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm">
                          <div className="flex flex-col mb-12">
                              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-2">Investment</p>
                              <div className="flex items-baseline gap-4">
                                  <span className="text-6xl font-light tracking-tighter uppercase">{tour.currency || "PKR"} {tour.price}</span>
                              </div>
                              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold mt-4">All-inclusive Luxury Package</p>
                          </div>

                          <div className="space-y-4 mb-12">
                              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-sm">
                                  <ShieldCheck className="w-5 h-5 text-gold" />
                                  <span className="text-[10px] uppercase tracking-widest font-black">Elite Member Access</span>
                              </div>
                              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-sm">
                                  <Zap className="w-5 h-5 text-gold" />
                                  <span className="text-[10px] uppercase tracking-widest font-black">Limited Group Size</span>
                              </div>
                          </div>

                          <button 
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full bg-black text-white py-8 rounded-full text-[11px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 group hover:bg-gold transition-all duration-700 shadow-2xl mb-12"
                          >
                              {tour.booking_button_text || "Book Expedition"}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" />
                          </button>
                          
                          <div className="pt-10 border-t border-black/5 text-center">
                              <p className="text-[9px] uppercase tracking-widest font-black text-black/20 leading-loose">
                                  By initiating this booking, you agree to the <br/> Velora Luxury Terms of Service.
                              </p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
