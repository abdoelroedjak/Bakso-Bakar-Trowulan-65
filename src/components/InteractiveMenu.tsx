/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Flame, Sliders, Check, Sparkles } from "lucide-react";
import { MENU_ITEMS } from "../data";
import { MenuItem } from "../types";

interface InteractiveMenuProps {
  onAddToOrder: (item: MenuItem, quantity: number, spicyLevel?: number, notes?: string) => void;
}

export default function InteractiveMenu({ onAddToOrder }: InteractiveMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpicyLevels, setSelectedSpicyLevels] = useState<{ [itemId: string]: number }>({});
  const [customNotes, setCustomNotes] = useState<{ [itemId: string]: string }>({});
  const [addingItemId, setAddingItemId] = useState<string | null>(null);

  const categories = ["ALL", "BAKSO BAKAR", "BAKSO KUAH", "MINUMAN", "CEMILAN"];

  // Filter menu items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSpicyChange = (itemId: string, level: number) => {
    setSelectedSpicyLevels((prev) => ({ ...prev, [itemId]: level }));
  };

  const handleNotesChange = (itemId: string, note: string) => {
    setCustomNotes((prev) => ({ ...prev, [itemId]: note }));
  };

  const triggerAdd = (item: MenuItem) => {
    setAddingItemId(item.id);
    const level = item.spicyCustomizable ? (selectedSpicyLevels[item.id] ?? 2) : undefined;
    const note = customNotes[item.id] ?? "";
    
    // Call props to add to order
    onAddToOrder(item, 1, level, note);

    setTimeout(() => {
      setAddingItemId(null);
      // clean specific note inputs after adding
      setCustomNotes((prev) => ({ ...prev, [item.id]: "" }));
    }, 1200);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getSpicyDescription = (level: number) => {
    switch (level) {
      case 0: return "Sama Sekali Tidak Pedas";
      case 1: return "Pedes Santai (Anak-anak aman)";
      case 2: return "Pedas Sedang (Pas Mantap)";
      case 3: return "Lumayan Pedas (Bikin Berkeringat)";
      case 4: return "Pedas Gila (Bara Trowulan)";
      case 5: return "Nuklir Mercon (Awas Kepala Meledak!)";
      default: return "";
    }
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative radial ember fire light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto">
          <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
            Cita Rasa Premium
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-6">
            Our Signature Menu
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mb-8 leading-relaxed">
            Pilih menu favorit Anda dan sesuaikan sendiri tingkat kepedasan baksonya. Semua disajikan hangat dengan rasa legendaris yang tidak tergantikan.
          </p>

          {/* Interactive Search Tool Bar */}
          <div className="w-full max-w-md relative mb-8">
            <Search className="w-5 h-5 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Bakso Bakar, Bakso Kuah, Es Campur..."
              className="w-full bg-surface-container-high text-on-surface border border-outline-variant/30 pl-12 pr-4 py-3.5 rounded-2xl font-sans text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
            />
          </div>

          {/* Categories Tab selector bar */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full justify-start md:justify-center py-2 border-b border-outline-variant/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans font-extrabold text-[10px] tracking-wider uppercase whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-secondary text-on-secondary shadow-lg shadow-secondary/15"
                    : "bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {cat === "ALL" ? "Semua Menu" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const currentSpicy = selectedSpicyLevels[item.id] ?? 2;
              const note = customNotes[item.id] ?? "";
              const isAdding = addingItemId === item.id;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-3xl overflow-hidden border border-outline-variant/25 flex flex-col group hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-outline/40 ember-glow"
                >
                  {/* Image container with zoom hover */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-surface-container-low">
                    <img
                      alt={item.name}
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient mask on bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Label badge */}
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-secondary border border-secondary/20 px-3 py-1 rounded-full text-[9px] font-sans font-extrabold tracking-widest uppercase shadow">
                      {item.category}
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Price Row */}
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-display font-black text-lg text-on-surface group-hover:text-secondary transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <span className="text-secondary font-display font-black text-base whitespace-nowrap bg-secondary/5 px-2.5 py-1 rounded-xl">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Spicy level customizer IF customizable */}
                      {item.spicyCustomizable && (
                        <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/15 mb-6">
                          <div className="flex justify-between items-center mb-2.5">
                            <span className="font-sans font-bold text-[10px] uppercase text-on-surface-variant tracking-wider flex items-center gap-1.5">
                              <Flame className="w-3.5 h-3.5 text-secondary animate-pulse fill-secondary/20" /> Level Pedas
                            </span>
                            <span className="font-sans text-[10px] font-extrabold text-secondary tracking-wide bg-secondary/10 px-2 py-0.5 rounded">
                              Level {currentSpicy}
                            </span>
                          </div>

                          {/* Level customizer chooser */}
                          <div className="flex justify-between gap-1 mb-2">
                            {[0, 1, 2, 3, 4, 5].map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => handleSpicyChange(item.id, lvl)}
                                className={`w-8 h-8 rounded-full font-sans text-xs font-bold transition-all flex items-center justify-center border ${
                                  currentSpicy === lvl
                                    ? "bg-primary-container border-primary text-on-primary-container"
                                    : "bg-surface-container-highest/50 border-outline-variant/20 hover:bg-surface-container-highest text-on-surface"
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                          
                          {/* Label descriptions */}
                          <p className="text-[9px] font-sans text-on-surface-variant text-center tracking-wide block transition-all duration-300">
                            {getSpicyDescription(currentSpicy)}
                          </p>
                        </div>
                      )}

                      {/* Note custom text input */}
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        placeholder="Catatan tambahan (contoh: kecap dilebihkan, minta rawit)"
                        className="w-full bg-surface-container/60 border border-outline-variant/30 px-3 py-2 rounded-xl text-[11px] font-sans placeholder:text-on-surface-variant/30 text-on-surface focus:outline-none focus:border-secondary/40 transition-all mb-6"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={() => triggerAdd(item)}
                      disabled={isAdding}
                      className={`w-full py-3.5 rounded-xl font-sans font-extrabold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isAdding
                          ? "bg-green-600/30 text-green-400 border border-green-500/30 ring-1 ring-green-500/20"
                          : "bg-primary-container text-on-primary-container border border-primary/30 hover:bg-primary-container/80 hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Berhasil Ditambahkan
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" /> Tambah Pesanan
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty search view state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/25 mt-12 max-w-lg mx-auto p-8"
          >
            <SlidingFires />
            <span className="font-display font-black text-lg text-on-surface block mb-2">
              Menu Tidak Ditemukan
            </span>
            <p className="font-sans text-xs text-on-surface-variant">
              Maaf, kata kunci "{searchQuery}" belum terdaftar di kedai kami. Coba gunakan kategori atau cari menu bestseller lainnya!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Sparkle fire icons helper
function SlidingFires() {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <Flame className="w-6 h-6 text-on-surface-variant/40" />
      <Flame className="w-6 h-6 text-secondary animate-bounce" />
      <Flame className="w-6 h-6 text-on-surface-variant/40" />
    </div>
  );
}
