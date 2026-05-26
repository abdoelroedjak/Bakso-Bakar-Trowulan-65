/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, Utensils, History, Sparkles } from "lucide-react";
import { LEGACY_IMAGE } from "../data";

export default function LegacyStory() {
  const highlights = [
    {
      icon: Award,
      title: "Legendary Place",
      desc: "Destinasi Wajib Malang",
    },
    {
      icon: Utensils,
      title: "Authentic Taste",
      desc: "Resep Asli Warisan Leluhur",
    },
    {
      icon: History,
      title: "Since 1999",
      desc: "Menjaga Mutu Puluhan Tahun",
    },
  ];

  return (
    <section id="story" className="py-24 md:py-32 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side Frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group border border-outline-variant/20"
          >
            <img
              alt="Penjual Bakso Bakar Trowulan 65"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={LEGACY_IMAGE}
              referrerPolicy="no-referrer"
            />
            {/* Ambient hot overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Floating visual detail frame */}
            <div className="absolute inset-0 border-[12px] border-surface-container-lowest/30 m-4 rounded-2xl pointer-events-none" />
            
            {/* Visual highlight tag */}
            <div className="absolute top-6 right-6 bg-secondary text-on-secondary px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-4 h-4 fill-on-secondary" />
              <span className="font-sans font-extrabold text-[10px] tracking-widest uppercase">
                ASLI SEJAK 1999
              </span>
            </div>
          </motion.div>

          {/* Text Content Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
              Legacy &amp; Heritage
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface leading-tight mb-6">
              Authentic Taste of Trowulan 65
            </h2>
            <p className="font-sans text-base text-on-surface-variant mb-8 leading-relaxed">
              Lebih dari sekadar kuliner keliling biasa, <strong>Bakso Bakar Trowulan 65</strong> adalah saksi bisu dan pelopor mutlak sejarah mahakarya bakso bakar di jantung kota Malang. 
            </p>
            <p className="font-sans text-base text-on-surface-variant mb-12 leading-relaxed">
              Setiap bulatan bakso dibuat dengan menggiling daging sapi segar berkeadaban mutu tinggi, diramu bersama rempah-rempah rahasia nusantara yang diwarisi turun-temurun, lalu dicelup kecap kental bumbu rempah kemudian dipanggang presisi hingga memicu jelaga tipis gurih aromatik yang meresap sempurna. Cita rasa orisinil yang abadi menggetarkan lidah Anda sejak tahun 1999.
            </p>

            {/* highlights row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-surface-container/60 p-5 rounded-2xl border border-outline-variant/20 hover:border-secondary/40 transition-colors group flex sm:flex-col items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-1">
                    <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-xs text-on-surface uppercase tracking-wider mb-1">
                      {item.title}
                    </h4>
                    <span className="font-sans text-xs text-on-surface-variant block">
                      {item.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
