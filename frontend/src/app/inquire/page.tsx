"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Send, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import axios from "@/lib/axios";

export default function InquirePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("inquiries", formData);
      setStatus("success");
      setFormData({ name: "", email: "", destination: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Cinematic Header with Video */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
              <div 
                className="absolute inset-0 ken-burns"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2560&auto=format&fit=crop&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-30 relative z-10"
              >
                <source
                  src="https://videos.pexels.com/video-files/2064500/2064500-uhd_3840_2160_30fps.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-20" />
          </div>

          <div className="container-luxury relative z-10 text-center pt-48">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-10 block"
              >
                Begin Your Journey
              </motion.span>
              <h1 className="text-6xl md:text-[9.5rem] font-light text-black tracking-tighter leading-none mb-12">
                Reserved <span className="italic font-serif text-gold">Inquiry</span>
              </h1>
              <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent mx-auto" />
          </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-40 relative">
          <div className="container-luxury">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
                  {/* Left Side: Contact Info */}
                  <div className="space-y-16">
                      <div>
                          <h2 className="text-5xl font-light text-black tracking-tight mb-8">Let's craft your <br /><span className="italic font-serif text-gold">masterpiece.</span></h2>
                          <p className="text-black/40 text-xl font-light leading-relaxed tracking-wide">
                              Our travel designers are ready to curate every detail of your escape. Reach out to begin the conversation.
                          </p>
                      </div>

                      <div className="space-y-12">
                          <div className="flex items-start gap-8">
                              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-black/5">
                                  <MapPin className="w-6 h-6 text-gold" />
                              </div>
                              <div>
                                  <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30 mb-2">Concierge Office</p>
                                  <p className="text-lg font-bold tracking-widest">Lahore, Pakistan | Dhaka, BD</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-8">
                              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-black/5">
                                  <MessageSquare className="w-6 h-6 text-gold" />
                              </div>
                              <div>
                                  <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30 mb-2">Private Access</p>
                                  <p className="text-lg font-bold tracking-widest">concierge@velora.luxury</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="bg-white p-12 md:p-20 rounded-sm shadow-[0_100px_200px_-50px_rgba(0,0,0,0.05)] border border-black/5 relative overflow-hidden">
                      <AnimatePresence>
                          {status === "success" && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center text-center p-12"
                              >
                                  <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8">
                                      <CheckCircle className="w-12 h-12" />
                                  </div>
                                  <h3 className="text-3xl font-light mb-4">Inquiry Received</h3>
                                  <p className="text-black/50 font-light leading-relaxed mb-8">
                                      Your request has been forwarded to our concierge team. A confirmation has been sent to your email, along with credentials to track your journey.
                                  </p>
                                  <button onClick={() => setStatus("idle")} className="text-[10px] uppercase tracking-[0.4em] font-black text-gold hover:text-black transition-colors">
                                      Submit Another
                                  </button>
                              </motion.div>
                          )}
                      </AnimatePresence>

                      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                          <div className="space-y-4">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Full Name</label>
                              <input 
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                type="text" 
                                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-gold transition-colors text-xl font-light" 
                                placeholder="Alexander Sterling" 
                              />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-10">
                              <div className="space-y-4">
                                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Email</label>
                                  <input 
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    type="email" 
                                    className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-gold transition-colors text-xl font-light" 
                                    placeholder="email@address.com" 
                                  />
                              </div>
                              <div className="space-y-4">
                                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Destination</label>
                                  <input 
                                    value={formData.destination}
                                    onChange={e => setFormData({...formData, destination: e.target.value})}
                                    type="text" 
                                    className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-gold transition-colors text-xl font-light" 
                                    placeholder="Hunza Valley" 
                                  />
                              </div>
                          </div>

                          <div className="space-y-4">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">How can we assist you?</label>
                              <textarea 
                                required
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-gold transition-colors text-xl font-light min-h-[150px] resize-none" 
                                placeholder="Describe your vision..."
                              ></textarea>
                          </div>

                          <button 
                            disabled={status === "loading"}
                            className="w-full py-8 bg-black disabled:bg-black/50 hover:bg-gold text-white uppercase tracking-[0.5em] font-black text-[12px] flex items-center justify-center gap-6 transition-all duration-700 shadow-2xl shadow-black/20 group"
                          >
                              {status === "loading" ? "Transmitting..." : "Submit Inquiry"}
                              <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                          </button>
                          
                          {status === "error" && (
                              <p className="text-red-500 text-[10px] uppercase tracking-widest font-black text-center mt-4">Failed to submit. Please try again.</p>
                          )}
                      </form>
                  </div>
              </div>
          </div>
      </section>
      <Footer />
    </main>
  );
}
