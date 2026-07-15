"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CountryCards = () => {
  const experiences = [
    {
      id: "pakistan",
      title: "Pakistan",
      subtitle: "The Peaks of Velora",
      description: "From the silk road to the Karakoram summits. Experience the majesty of ancient civilizations and high-altitude luxury.",
      image: "/pakistan-hero.png",
      video: "/pakistan-bg.mp4",
      link: "/destinations/pakistan",
    },
    {
      id: "bangladesh",
      title: "Bangladesh",
      subtitle: "The Emerald Legacy",
      description: "Unveil the mysteries of the world's largest mangrove forest and the pristine tea gardens of the delta.",
      image: "/bangladesh-hero.png",
      video: "/bangladesh-bg.mp4",
      link: "/destinations/bangladesh",
    },
  ];

  return (
    <section className="py-60 bg-white overflow-hidden">
      <div className="container-luxury">
        <div className="flex flex-col items-center text-center mb-32">
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold uppercase tracking-[0.5em] text-[10px] font-black mb-8"
            >
                Choose Your Legacy
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-9xl font-light text-black mb-12 tracking-tighter"
            >
                Elite <span className="italic font-serif text-gold">Experiences</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: idx * 0.3, 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative h-[850px] overflow-hidden cursor-pointer"
            >
              {/* Background Video/Image Container */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-slate-200">
                {exp.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                    poster={exp.image}
                    src={exp.video}
                  />
                ) : (
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                    loading="eager"
                  />
                )}
                {/* Refined Overlays */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-20 flex flex-col justify-end z-10">
                <motion.span 
                    className="text-gold uppercase tracking-[0.4em] text-[11px] font-black mb-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700"
                >
                    {exp.subtitle}
                </motion.span>
                <h3 className="text-6xl md:text-8xl font-light text-black mb-8 tracking-tighter translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    {exp.title}
                </h3>
                <p className="text-black/60 max-w-sm mb-16 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 delay-100 font-light leading-relaxed text-lg">
                    {exp.description}
                </p>

                <Link href={exp.link} className="flex items-center gap-6 text-black uppercase tracking-[0.4em] text-[10px] font-black group/link">
                    Explore Legacy
                    <div className="w-16 h-[1px] bg-black/10 group-hover/link:w-24 group-hover/link:bg-gold transition-all duration-700" />
                    <ArrowRight className="w-5 h-5 text-gold opacity-0 group-hover/link:opacity-100 -translate-x-6 group-hover/link:translate-x-0 transition-all duration-700" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryCards;
