/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, MessageCircle, Star, Flame, Map } from "lucide-react";
import { HERO_BACKGROUND } from "../data";

interface HeroProps {
  onOrderViaWA: () => void;
}

export default function Hero({ onOrderViaWA }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden pt-24 pb-12">
      {/* Background Image & Immersive Overlay Blur */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Bakso Bakar Trowulan 65"
          className="w-full h-full object-cover select-none scale-105"
          src={HERO_BACKGROUND}
          referrerPolicy="no-referrer"
        />
        {/* Cinematic fire-inspired dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-primary-container/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
      </div>

      {/* Floating Spark particles / fire theme styling */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-color-dodge opacity-40">
        <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-secondary opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-primary-container opacity-35 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-20 max-w-4xl flex flex-col items-center mt-6">
        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2.5 mb-8"
        >
          <span className="bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(253,187,57,0.15)]">
            <Star className="w-3.5 h-3.5 fill-secondary" /> Favorite Customer
          </span>
          <span className="bg-primary-container/40 text-primary border border-primary-container/50 px-4 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-primary" /> Legendary Taste
          </span>
          <span className="bg-surface-container-highest/60 text-on-surface border border-outline-variant/30 px-4 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-secondary" /> Tidak Pernah Pindah
          </span>
        </motion.div>

        {/* Main Heading styled with space & tracking */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6"
        >
          Bakso Bakar <span className="text-secondary text-glow font-black inline-block">Legendaris</span> di Malang
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mb-12 leading-relaxed"
        >
          Cita rasa istimewa yang tetap dicari penikmat kuliner sejati dari generasi ke generasi. Dimasak langsung di atas bara api kering batok kelapa pilihan, tetap di lokasi bersejarah yang sama sejak tahun 1999.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* Lihat Lokasi button scrolling to map */}
          <button
            onClick={() => scrollToSection("#location")}
            className="bg-secondary text-on-secondary font-sans font-extrabold uppercase text-xs tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(253,187,57,0.25)] hover:shadow-[0_4px_25px_rgba(253,187,57,0.4)] cursor-pointer"
          >
            <Map className="w-4 h-4" /> Lihat Lokasi Kedai
          </button>

          {/* WhatsApp order link or trigger */}
          <button
            onClick={onOrderViaWA}
            className="border-2 border-secondary text-secondary bg-secondary/5 font-sans font-extrabold uppercase text-xs tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 hover:bg-secondary/15 active:scale-95 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-secondary/25" /> Order via WhatsApp
          </button>
        </motion.div>
      </div>

      {/* Decorative Bounce scroll down pointer/arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 z-20">
        <button
          onClick={() => scrollToSection("#story")}
          className="text-on-surface-variant hover:text-secondary transition-colors focus:outline-none"
        >
          <span className="text-xs uppercase tracking-widest font-bold font-sans block mb-1">Cari Tahu</span>
          <svg
            className="w-5 h-5 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
