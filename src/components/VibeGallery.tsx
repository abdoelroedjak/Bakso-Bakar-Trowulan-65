/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X, Camera, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "../data";

export default function VibeGallery() {
  const [activeItem, setActiveItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
            Galeri Suara Arang
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-6">
            Our Vibes
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Rasakan kehangatan interaksi dapur dan kepulan asap wangi rempah panggangan kami melalui kepingan momen autentik dari kedai Trowulan 65.
          </p>
        </div>

        {/* Dynamic Mobile/Desktop Layout Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => setActiveItem(item)}
              className={`cursor-pointer overflow-hidden rounded-3xl relative group border border-outline-variant/10 shadow-lg ${
                item.cols === 2 ? "col-span-2" : ""
              } ${item.rows === 2 ? "row-span-2 aspect-square" : "aspect-square"}`}
            >
              <img
                alt={item.title}
                src={item.image}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                <ZoomIn className="w-8 h-8 text-secondary mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                <h4 className="font-display font-black text-sm text-on-surface transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h4>
                <span className="font-sans text-[10px] tracking-wide text-on-surface-variant transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  Klik untuk Zoom Detail
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Zoom Modal on Click */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-surface-container-highest text-on-surface hover:text-secondary hover:bg-surface-container transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-card border border-outline-variant/30 flex flex-col md:flex-row shadow-2xl"
              >
                {/* Responsive details popup */}
                <div className="w-full md:w-2/3 max-h-[70vh] md:max-h-none overflow-hidden bg-surface-container-lowest flex items-center justify-center">
                  <img
                    alt={activeItem.title}
                    src={activeItem.image}
                    className="w-full h-full object-cover max-h-[50vh] md:max-h-[80vh]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Popup Sidebar descriptors */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-surface-container">
                  <div>
                    <div className="flex items-center gap-2 text-secondary mb-4">
                      <Camera className="w-4 h-4" />
                      <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest block">
                        KILAS DAPUR AUTENTIK
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl text-on-surface mb-3 leading-tight">
                      {activeItem.title}
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      Saksi bisu proses panggangan yang dijaga apik mutunya. Setiap gigitan bakso bakar menyerap aroma arang kelapa kering murni ini untuk menciptakan aroma asap khas penanda kenikmatan sejati.
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <Sparkles className="w-3.5 h-3.5 text-secondary" />
                      <span>Trowulan 65 Malang</span>
                    </div>
                    <button
                      onClick={() => setActiveItem(null)}
                      className="text-xs font-bold text-secondary hover:underline"
                    >
                      Tutup Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
