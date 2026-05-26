/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu as MenuIcon, X, Award, Flame, MapPin } from "lucide-react";
import { USER_AVATAR, APP_LOGO } from "../data";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Legacy", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#location" },
  ];

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-outline-variant/30 py-3 shadow-lg"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveHash("#");
          }}
          className="flex items-center gap-2 group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center border border-primary/30 transition-transform group-hover:scale-110 duration-300">
            <img
              src={APP_LOGO}
              alt="Bakso Bakar Trowulan 65 Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display text-2xl font-black text-primary tracking-tight block">
              Trowulan <span className="text-secondary">65</span>
            </span>
            <span className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase block -mt-1">
              Kuliner Legenda Malang
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className={`font-sans font-bold uppercase text-xs tracking-widest transition-all relative py-1 ${
                activeHash === link.href
                  ? "text-secondary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.label}
              {activeHash === link.href && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          {/* Cart Icon button with animation */}
          <button
            onClick={onCartOpen}
            className="relative p-2.5 rounded-full hover:bg-surface-container-highest transition-all text-secondary duration-300 group"
            id="shopping-bag-btn"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container border border-primary/40 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-sans shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Profile User avatar */}
          <div className="hidden sm:block w-9 h-9 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src={USER_AVATAR}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-surface-container border-b border-outline-variant/30 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`font-sans font-bold uppercase text-sm tracking-widest block py-2 border-b border-outline-variant/10 ${
                    activeHash === link.href
                      ? "text-secondary pl-2 border-l-2 border-l-secondary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <img
                  alt="User profile"
                  className="w-8 h-8 rounded-full border border-outline-variant/40"
                  src={USER_AVATAR}
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-bold text-on-surface-variant">Pelanggan Setia</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
