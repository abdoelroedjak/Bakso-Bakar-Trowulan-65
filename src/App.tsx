/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, MessageCircle, Star, Sparkles, MapPin, Instagram, Youtube, Heart, CornerRightDown, Phone, Mail } from "lucide-react";
import { DEFAULT_TESTIMONIALS, APP_LOGO } from "./data";
import { CartItem, MenuItem, Testimonial } from "./types";

// Import custom sections
import Header from "./components/Header";
import Hero from "./components/Hero";
import LegacyStory from "./components/LegacyStory";
import InteractiveMenu from "./components/InteractiveMenu";
import VibeGallery from "./components/VibeGallery";
import LocationVisit from "./components/LocationVisit";
import Testimonials from "./components/Testimonials";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  // Shopping Cart & Drawer state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Testimonial local states
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Load testimonials & cart from localStorage representation on mount
  useEffect(() => {
    const cachedTestimonials = localStorage.getItem("trowulan_testimonials");
    if (cachedTestimonials) {
      try {
        setTestimonials(JSON.parse(cachedTestimonials));
      } catch (err) {
        setTestimonials(DEFAULT_TESTIMONIALS);
      }
    } else {
      setTestimonials(DEFAULT_TESTIMONIALS);
    }

    const cachedCart = localStorage.getItem("trowulan_cart");
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (err) {}
    }
  }, []);

  // Update cart cache on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("trowulan_cart", JSON.stringify(newCart));
  };

  // Add Item to Order Cart
  const handleAddToOrder = (item: MenuItem, quantity: number, spicyLevel?: number, notes?: string) => {
    const existingIndex = cart.findIndex(
      (cartItem) =>
        cartItem.menuItem.id === item.id &&
        cartItem.spicyLevel === spicyLevel &&
        cartItem.notes === notes
    );

    if (existingIndex > -1) {
      // increase quantity
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      // add fresh SKU
      const newItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity,
        spicyLevel,
        notes,
      };
      saveCart([...cart, newItem]);
    }
  };

  // Update Cart quantities
  const handleUpdateQuantity = (itemId: string, noteKey: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId, noteKey);
      return;
    }

    const updated = cart.map((item) => {
      const matchSuffix = `${item.spicyLevel ?? ""}-${item.notes ?? ""}`;
      if (item.menuItem.id === itemId && matchSuffix === noteKey) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCart(updated);
  };

  // Remove Item from Cart
  const handleRemoveItem = (itemId: string, noteKey: string) => {
    const updated = cart.filter((item) => {
      const matchSuffix = `${item.spicyLevel ?? ""}-${item.notes ?? ""}`;
      const isMatch = item.menuItem.id === itemId && matchSuffix === noteKey;
      return !isMatch;
    });
    saveCart(updated);
  };

  // Clear Cart items
  const handleClearCart = () => {
    saveCart([]);
  };

  // Handle adding user testimonials
  const handleAddTestimonial = (name: string, rating: number, text: string) => {
    const newTestimonial: Testimonial = {
      id: `custom-review-${Date.now()}`,
      name,
      rating,
      text,
      date: "Hari Ini",
      isCustom: true,
    };
    const updatedList = [newTestimonial, ...testimonials];
    setTestimonials(updatedList);
    localStorage.setItem("trowulan_testimonials", JSON.stringify(updatedList));
  };

  // Trigger quick WhatsApp chat inquiry
  const handleTriggerWA = () => {
    const textMessage = "Halo Bakso Bakar Trowulan 65! Saya tertarik melihat rincian menu dan ingin menanyakan promo menarik hari ini.";
    const encodedTxt = encodeURIComponent(textMessage);
    window.open(`https://wa.me/6289530731217?text=${encodedTxt}`, "_blank", "noopener,noreferrer");
  };

  const handleScrollToId = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between selection:bg-secondary/30 selection:text-secondary">
      
      {/* Dynamic sticky Navigation Menu Bar */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Main Sections Body */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <Hero onOrderViaWA={handleTriggerWA} />

        {/* LEGACY HISTORY NARRATIVE */}
        <LegacyStory />

        {/* INTERACTIVE DIGITAL MENU */}
        <InteractiveMenu onAddToOrder={handleAddToOrder} />

        {/* SECTION 4: SOCIAL PROOF METRICS (High credibility statistics) */}
        <section className="py-16 bg-surface-container-high overflow-hidden border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-around gap-12 text-center">
            
            {/* Metric 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[200px]"
            >
              <h3 className="font-display font-black text-4xl text-secondary mb-2 text-glow">
                10K+
              </h3>
              <span className="font-sans font-extrabold text-[10px] tracking-widest text-on-surface-variant uppercase">
                Happy Customers
              </span>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[200px]"
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display font-black text-4xl text-secondary mb-2 text-glow flex items-center justify-center gap-1.5">
                4.9 <Star className="w-5 h-5 fill-secondary text-secondary -mt-1" />
              </h3>
              <span className="font-sans font-extrabold text-[10px] tracking-widest text-on-surface-variant uppercase">
                Google Rating
              </span>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[200px]"
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-display font-black text-4xl text-secondary mb-2 text-glow">
                #1
              </h3>
              <span className="font-sans font-extrabold text-[10px] tracking-widest text-on-surface-variant uppercase">
                Culinary Spot in Malang
              </span>
            </motion.div>

          </div>
        </section>

        {/* BENTO VIBE INTERACTIVE GALLERY */}
        <VibeGallery />

        {/* GOOGLE MAPS VISIT & ADRESSES */}
        <LocationVisit />

        {/* CUSTOMER REVIEWS & FEEDBACK FORM */}
        <Testimonials
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        {/* SECTION 7: SOCIAL MEDIA CONNECT WITH US */}
        <section className="py-24 bg-surface-container-low text-center border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto px-6">
            <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
              Grup Komunitas Kami
            </span>
            <h2 className="font-display text-2xl sm:text-3.5xl font-black text-on-surface mb-12 leading-tight">
              Connect With Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Instagram CTA Card */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 rounded-3xl border border-outline-variant/20 hover:border-secondary/35 group hover:-translate-y-1 transition-all flex flex-col items-center justify-center block shadow"
              >
                <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                  <Instagram className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-base text-on-surface mb-1">
                  Instagram
                </h4>
                <p className="font-sans text-xs text-on-surface-variant">
                  Join 5K+ followers for daily updates &amp; story kuliner
                </p>
              </a>

              {/* TikTok/Youtube CTA Card */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 rounded-3xl border border-outline-variant/20 hover:border-secondary/35 group hover:-translate-y-1 transition-all flex flex-col items-center justify-center block shadow"
              >
                <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-base text-on-surface mb-1">
                  TikTok &amp; Shorts
                </h4>
                <p className="font-sans text-xs text-on-surface-variant">
                  See the fire in action! Rangkuman visual proses pesanan dibakar.
                </p>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER PORTION */}
      <footer className="bg-surface-container-lowest text-on-surface border-t border-outline-variant/20 pt-20 pb-32 md:pb-12 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          
          {/* Brand header title with Logo */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container-high transition-transform hover:scale-110 duration-300">
              <img
                src={APP_LOGO}
                alt="Bakso Bakar Trowulan 65"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-black text-2xl text-primary tracking-tight block">
              Trowulan <span className="text-secondary">65</span>
            </span>
          </div>
          <p className="font-sans text-xs text-on-surface-variant mb-8 max-w-md">
            Cita Rasa Orisinil Warisan Legenda Nusantara. Melayani kuliner bakso bakar khas Malang seutuhnya sejak 1999 dengan dedikasi bumbu rempah prima.
          </p>

          {/* Quick links footer */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a
              href="#menu"
              onClick={(e) => { e.preventDefault(); handleScrollToId("#menu"); }}
              className="font-sans text-[10px] font-bold tracking-widest uppercase hover:text-secondary transition-colors text-on-surface-variant"
            >
              The Secret Recipe
            </a>
            <a
              href="#location"
              onClick={(e) => { e.preventDefault(); handleScrollToId("#location"); }}
              className="font-sans text-[10px] font-bold tracking-widest uppercase hover:text-secondary transition-colors text-on-surface-variant"
            >
              Find a Stall
            </a>
            <a
              href="mailto:trowulanbaksobakar@gmail.com"
              className="font-sans text-[10px] font-bold tracking-widest uppercase hover:text-secondary transition-colors text-on-surface-variant"
            >
              Franchise Cooperation
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-sans text-[10px] font-bold tracking-widest uppercase hover:text-secondary transition-colors text-on-surface-variant"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans text-on-surface-variant/80 pb-6 mb-6 border-b border-outline-variant/10 w-full">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-secondary" />
              <span>trowulanbaksobakar@gmail.com</span>
            </div>
            <span className="hidden sm:inline text-outline-variant/20">|</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>+62 895-3073-1217</span>
            </div>
          </div>

          {/* Legal copyrights */}
          <span className="font-sans text-[10px] text-on-surface-variant/50 flex items-center gap-1">
            &copy; 2026 Bakso Bakar Trowulan 65. Heritage Since 1999. Crafted for food connoisseurs with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline-block" /> in Malang.
          </span>
        </div>
      </footer>

      {/* MOBILE ONLY: FLOATING BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-surface-container-highest/90 backdrop-blur-2xl border-t border-outline-variant/30 flex justify-around py-3 px-4 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
        
        {/* Home option */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-95 transition-transform"
        >
          <Flame className="w-5 h-5" />
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider block mt-1">Home</span>
        </button>

        {/* Legend option */}
        <button
          onClick={() => handleScrollToId("#story")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-95 transition-transform"
        >
          <Star className="w-5 h-5" />
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider block mt-1">Legend</span>
        </button>

        {/* Menu Option */}
        <button
          onClick={() => handleScrollToId("#menu")}
          className="flex flex-col items-center justify-center text-secondary bg-primary-container/20 px-4 py-1.5 rounded-xl border border-secondary/20 active:scale-95 transition-transform"
        >
          <Sparkles className="w-5 h-5 text-secondary" />
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider block mt-1">Menu</span>
        </button>

        {/* Location Option */}
        <button
          onClick={() => handleScrollToId("#location")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-95 transition-transform"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider block mt-1">Location</span>
        </button>

      </nav>

      {/* FLOATING ACTION WHATSAPP TRIGGER ENQUIRY BUBBLE */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTriggerWA}
        className="fixed bottom-24 md:bottom-8 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl z-40 flex items-center justify-center hover:bg-[#20ba5a] transition-colors shadow-[#25D366]/20 group"
        aria-label="Hubungi WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-sans text-xs font-bold pl-0 group-hover:pl-2 tracking-wide uppercase whitespace-nowrap">
          Tanya Admin WA
        </span>
      </motion.button>

      {/* PERSISTENT CART SIDEBAR SYSTEM */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
