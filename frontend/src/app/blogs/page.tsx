"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import axios from "@/lib/axios";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* 📖 VELORA JOURNAL HEADER */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
          {/* Static Fallback Image */}
          <div className="absolute inset-0 ken-burns">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2560&auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover opacity-60"
                alt="Journal Backdrop"
              />
          </div>

          {/* Background Video Layer */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-50"
          >
            <source
              src="https://videos.pexels.com/video-files/3855562/3855562-uhd_3840_2160_24fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white z-20" />

          {/* Content */}
          <div className="container-luxury relative z-30 text-center pt-48">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-10 block"
              >
                The Velora Journal
              </motion.span>
              <h1 className="text-6xl md:text-[10rem] font-light text-white tracking-tighter leading-none mb-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase">
                Travel <span className="italic font-serif text-gold">Journals</span>
              </h1>
              <p className="text-xl text-white/60 font-light tracking-[0.5em] uppercase max-w-xl mx-auto">Stories from the Heart</p>
          </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-40">
          <div className="container-luxury">
              {loading ? (
                <div className="flex flex-col items-center py-40">
                    <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin mb-8" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-black/20">Compiling Journal Entries...</span>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-40">
                    <h2 className="text-4xl font-light text-black/20 uppercase tracking-widest">The Journal is Empty</h2>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {blogs.map((blog, idx) => (
                        <motion.div 
                          key={blog.id}
                          initial={{ opacity: 0, y: 80 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="group flex flex-col h-full"
                        >
                            <div className="aspect-video overflow-hidden rounded-sm relative mb-12 bg-slate-50 shadow-2xl shadow-black/5">
                                <img 
                                  src={blog.image || "https://images.unsplash.com/photo-1595152230661-00f64a23807d"} 
                                  alt={blog.title} 
                                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                                />
                                <div className="absolute top-8 left-8 glass-light px-6 py-3 rounded-full">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">{blog.category || "Journal"}</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.6em] text-black/30 font-black">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4" />
                                        <span>{blog.author}</span>
                                    </div>
                                </div>
                                
                                <h2 className="text-4xl font-light text-black tracking-tighter group-hover:text-gold transition-colors duration-700 leading-tight uppercase">
                                    {blog.title}
                                </h2>
                                
                                <p className="text-black/50 text-xl font-light leading-relaxed tracking-wide line-clamp-3">
                                    {blog.subtitle}
                                </p>
                                
                                <div className="pt-10 flex items-center justify-between border-t border-black/5">
                                    <div className="flex items-center gap-3 text-black/20">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-[10px] uppercase tracking-[0.6em] font-black">8 MIN READ</span>
                                    </div>
                                    <Link 
                                      href={`/blogs/${blog.slug || blog.id}`}
                                      className="flex items-center gap-6 text-black font-black uppercase tracking-[0.5em] text-[11px] group/btn"
                                    >
                                        Read Story
                                        <ArrowRight className="w-5 h-5 text-gold group-hover/btn:translate-x-4 transition-transform duration-700" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
              )}
          </div>
      </section>

      {/* Unique Narrative Section with Background Video */}
      <section className="relative py-80 overflow-hidden bg-slate-50">
          <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-15"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white" />
          </div>
          <div className="container-luxury relative z-10 text-center">
              <span className="text-gold uppercase tracking-[1.5em] text-[11px] font-black mb-16 block">Philosophy</span>
              <h2 className="text-5xl md:text-[8rem] font-light text-black tracking-tighter leading-tight max-w-5xl mx-auto font-serif">
                  Exploring the world is a <span className="italic">conversation</span> with the soul.
              </h2>
          </div>
      </section>
      <Footer />
    </main>
  );
}
