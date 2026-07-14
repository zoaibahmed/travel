"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import { use } from "react";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`blogs/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-20 h-20 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 font-sans">
        <h1 className="text-4xl font-light mb-4 uppercase tracking-widest text-black/20">Journal Lost</h1>
        <p className="text-black/40 mb-8">This entry has not yet been penned.</p>
        <button onClick={() => window.location.href = '/blogs'} className="px-10 py-4 border border-black/10 hover:border-gold transition-all text-xs font-black uppercase tracking-[0.3em]">Return to Archive</button>
    </div>
  );

  const content = Array.isArray(post.content) ? post.content : [];

  return (
    <main className="bg-white min-h-screen text-black font-sans">
      <Navbar />

      {/* 📖 EDITORIAL HEADER */}
      <section className="relative pt-48 pb-24 overflow-hidden">
          <div className="container-luxury max-w-5xl">
              <Link 
                href="/blogs" 
                className="flex items-center gap-4 text-black/40 hover:text-gold transition-colors mb-12 group"
              >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black">Back to Journal</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                  <div className="flex items-center gap-6 mb-10">
                      <span className="px-5 py-2 bg-slate-50 rounded-full text-[10px] uppercase tracking-[0.3em] font-black text-gold">
                          {post.category || "Journal"}
                      </span>
                      <div className="flex items-center gap-4 text-black/30">
                          <Clock className="w-4 h-4" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-black">8 MIN READ</span>
                      </div>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-tight mb-12 uppercase">
                      {post.title}
                  </h1>
                  
                  <p className="text-2xl md:text-3xl text-black/60 font-light leading-relaxed mb-16 max-w-3xl">
                      {post.subtitle}
                  </p>

                  <div className="flex items-center justify-between border-y border-black/5 py-10">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden">
                              <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} className="w-full h-full object-cover" alt={post.author} />
                          </div>
                          <div>
                              <p className="font-bold tracking-tight text-lg">{post.author}</p>
                              <p className="text-xs uppercase tracking-widest text-black/30 font-black">{post.author_role || "Travel Curator"}</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4 text-black/20 text-[10px] uppercase tracking-widest font-black">
                          {new Date(post.created_at).toLocaleDateString()}
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* 🖼️ MAIN ARTICLE IMAGE */}
      <section className="pb-32">
          <div className="container-luxury">
              <motion.div 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="aspect-[21/9] rounded-sm overflow-hidden shadow-2xl"
              >
                  <img src={post.image || "https://images.unsplash.com/photo-1595152230661-00f64a23807d"} className="w-full h-full object-cover" alt="Hero" />
              </motion.div>
          </div>
      </section>

      {/* 🖋️ ARTICLE CONTENT */}
      <section className="pb-40">
          <div className="container-luxury max-w-4xl">
              <article className="space-y-12">
                  {content.length > 0 ? content.map((block: any, idx: number) => {
                      if (block.type === "paragraph") {
                          return (
                              <p key={idx} className="text-xl md:text-2xl font-light leading-[1.8] text-black/70">
                                  {block.text}
                              </p>
                          );
                      }
                      if (block.type === "heading") {
                          return (
                              <h2 key={idx} className="text-4xl md:text-5xl font-light tracking-tight pt-10 uppercase">
                                  {block.text}
                              </h2>
                          );
                      }
                      if (block.type === "quote") {
                          return (
                              <div key={idx} className="py-12 border-l-[6px] border-gold pl-12 my-16">
                                  <blockquote className="text-3xl md:text-4xl font-serif italic text-black/90 leading-relaxed">
                                      "{block.text}"
                                  </blockquote>
                              </div>
                          );
                      }
                      return null;
                  }) : (
                    <p className="text-xl md:text-2xl font-light leading-[1.8] text-black/70">
                        {post.description}
                    </p>
                  )}
              </article>

              <div className="mt-32 pt-20 border-t border-black/5">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex flex-wrap gap-4">
                          {["Adventure", "Culture", "Sustainability"].map(tag => (
                              <span key={tag} className="px-6 py-3 bg-slate-50 rounded-full text-[10px] uppercase tracking-widest font-black text-black/40 hover:bg-gold hover:text-white transition-all cursor-pointer">
                                  #{tag}
                              </span>
                          ))}
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-black/20">Share this story</span>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold transition-colors cursor-pointer text-xs font-black">TW</div>
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold transition-colors cursor-pointer text-xs font-black">FB</div>
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold transition-colors cursor-pointer text-xs font-black">IN</div>
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
