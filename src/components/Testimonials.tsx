/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, Plus, FileText, Check, Sparkles } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (name: string, rating: number, text: string) => void;
}

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    onAddTestimonial(name, rating, text);
    
    // reset form fields
    setName("");
    setRating(5);
    setText("");
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormOpen(false);
    }, 2000);
  };

  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative fire glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
              Suara Pelanggan Setia
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-on-surface mb-4 leading-tight">
              Testimoni Rasa
            </h2>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Dengar langsung cerita kepuasan kuliner dari para pecinta bakso bakar legendaris Trowulan 65 Malang.
            </p>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="bg-secondary text-on-secondary hover:bg-secondary/90 font-sans font-extrabold text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-secondary/15 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Tulis Ulasan Anda
          </button>
        </div>

        {/* Testimonial Write Form dropdown container */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-16 max-w-2xl mx-auto bg-surface-container rounded-3xl border border-outline-variant/30 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <h3 className="font-display font-black text-lg text-on-surface mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" /> Bagikan Pengalaman Kuliner Anda
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-8 text-center bg-green-900/10 text-green-400 border border-green-500/20 rounded-2xl flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2 text-green-400">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="font-display font-black text-base text-on-surface">Ulasan Berhasil Dikirim!</span>
                    <p className="font-sans text-xs text-on-surface-variant">Terima kasih atas masukan berharga Anda bersama keluarga besar Trowulan 65.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider font-sans">
                        Nama Lengkap / Inisial
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full bg-surface-container-high text-on-surface border border-outline-variant/30 px-4 py-3 rounded-xl font-sans text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/35 transition-all"
                      />
                    </div>

                    {/* Star scale choosing */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider font-sans">
                        Rating Penilaian
                      </label>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 text-secondary transition-transform hover:scale-115"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating ? "fill-secondary text-secondary" : "text-outline-variant/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review text input */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider font-sans">
                        Isi Ulasan Cerita Anda
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ceritakan rasanya setelah menikmati olesan bumbu bakar kami..."
                        className="w-full bg-surface-container-high text-on-surface border border-outline-variant/30 px-4 py-3 rounded-xl font-sans text-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/35 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Bar elements */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setFormOpen(false)}
                        className="px-5 py-3 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-sans uppercase tracking-widest"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-secondary text-on-secondary font-sans font-extrabold text-[10px] tracking-widest uppercase rounded-xl hover:scale-102 active:scale-98 shadow-md hover:shadow-lg transition-all"
                      >
                        Kirim Ulasan
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Columns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {testimonials.map((review) => (
              <motion.div
                layout
                key={review.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container p-8 rounded-3xl border border-outline-variant/25 flex flex-col justify-between relative group hover:border-secondary/30 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Quote decoration */}
                  <div className="mb-6 text-secondary/35">
                    <Quote className="w-8 h-8 transform rotate-180" />
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Stars and details */}
                <div className="pt-5 border-t border-outline-variant/15 flex justify-between items-center bg-surface-container">
                  <div>
                    {/* Stars row */}
                    <div className="flex gap-1 mb-1.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < review.rating ? "fill-secondary text-secondary" : "text-outline-variant/25"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Name block */}
                    <span className="font-display font-bold text-sm text-on-surface block">
                      {review.name}
                    </span>
                  </div>

                  {/* Stamp indicator dates */}
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant/55 block">
                      {review.date}
                    </span>
                    {review.isCustom && (
                      <span className="text-[8px] bg-secondary/10 self-end text-secondary border border-secondary/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide inline-block mt-1">
                        Ulasan Anda
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
