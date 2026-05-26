/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, CheckCircle, Smartphone, User, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, noteKey: string, quantity: number) => void;
  onRemoveItem: (itemId: string, noteKey: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Checkout Form Details
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [dineOption, setDineOption] = useState("Bungkus (Dibawa Pulang)");
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // official WhatsApp contact from HTML
  const waContactNumber = "6289530731217";

  const computeSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!buyerName.trim() || !buyerPhone.trim()) return;

    // Build the beautiful WhatsApp message template
    let message = `*🔥 [ORDERS/PESANAN] BAKSO BAKAR TROWULAN 65 Malang 🔥*\n\n`;
    message += `*Detail Pemesan:*\n`;
    message += `👤 Nama: ${buyerName}\n`;
    message += `📞 No. HP/WA: ${buyerPhone}\n`;
    message += `🍽️ Opsi Penyajian: *${dineOption}*\n\n`;
    message += `--- *ITEM PESANAN* ---\n`;

    cartItems.forEach((item, index) => {
      const spicyText = item.spicyLevel !== undefined ? ` (Level Pedas: ${item.spicyLevel})` : "";
      const noteText = item.notes ? ` [Catatan: ${item.notes}]` : "";
      message += `${index + 1}. *${item.menuItem.name}* x ${item.quantity} \n`;
      message += `   Harga: ${formatPrice(item.menuItem.price * item.quantity)}${spicyText}${noteText}\n`;
    });

    message += `\n-----------------------\n`;
    message += `*Total Pembayaran: ${formatPrice(computeSubtotal())}*\n\n`;
    message += `Mohon dikonfirmasi segera ya Kak, terima kasih! 🙏✨`;

    // Encode text URL parameters
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waContactNumber}?text=${encodedText}`;

    // Open WhatsApp link window safely
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Show success completion state
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      onClearCart();
      setBuyerName("");
      setBuyerPhone("");
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark opaque overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Sliding drawer sidebar container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-surface border-l border-outline-variant/30 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header portion */}
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                <h2 className="font-display font-black text-base text-on-surface">Detail Pesanan Anda</h2>
                <span className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold">
                  {cartItems.length} menu
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main content body inside drawer */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              {checkoutComplete ? (
                /* Success screen after triggering WhatsApp checkout */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-2">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-display font-black text-lg text-on-surface">Check-out Berhasil!</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Detail pesanan Anda sedang dialihkan ke WhatsApp Admin Trowulan 65. Mohon tekan tombol 'Kirim' di aplikasi Anda untuk mengirimkan detail pesanan secara resmi.
                  </p>
                  <span className="text-[10px] text-secondary font-bold font-sans animate-pulse">
                    Mengosongkan keranjang belanja Anda seketika...
                  </span>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart screen */
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/40 mb-2">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-base text-on-surface">Masih Kosong Nih!</h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Belum ada hidangan lezat yang Anda tambahkan. Yuk, pilih menu Bakso Bakar Super atau Bakso Kuah sekarang!
                  </p>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold font-sans text-secondary hover:underline flex items-center gap-1.5 mt-2"
                  >
                    Kembali Lihat Menu <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  <div className="space-y-3.5">
                    {cartItems.map((item) => {
                      // We can compose unique keys from itemId and notes/spicy levels combined
                      const keySuffix = `${item.spicyLevel ?? ""}-${item.notes ?? ""}`;
                      return (
                        <div
                          key={`${item.menuItem.id}-${keySuffix}`}
                          className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 flex gap-4 items-start"
                        >
                          {/* Image */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0">
                            <img
                              alt={item.menuItem.name}
                              src={item.menuItem.image}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Data details info column */}
                          <div className="inline-block flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-display font-black text-xs text-on-surface leading-tight truncate">
                                {item.menuItem.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.menuItem.id, keySuffix)}
                                className="text-on-surface-variant/40 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Spiciness indicator scale show details */}
                            {item.spicyLevel !== undefined && (
                              <span className="text-[9px] font-sans font-bold bg-secondary/10 text-secondary border border-secondary/20 px-1.5 py-0.5 rounded inline-block mt-1">
                                Level {item.spicyLevel} Pedas
                              </span>
                            )}

                            {/* Custom notes text block */}
                            {item.notes && (
                              <p className="text-[10px] font-sans text-on-surface-variant italic truncate mt-1">
                                Note: {item.notes}
                              </p>
                            )}

                            {/* Price times qty multiplier line */}
                            <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-outline-variant/5">
                              <span className="text-secondary font-display font-bold text-xs">
                                {formatPrice(item.menuItem.price * item.quantity)}
                              </span>

                              {/* Simple Quantity Toggler controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, keySuffix, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full bg-surface-container-highest hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold font-sans text-on-surface w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, keySuffix, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-surface-container-highest hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Checkout Form */}
                  <div className="border-t border-outline-variant/15 pt-6 mt-6">
                    <h3 className="font-display font-black text-xs text-on-surface uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-secondary" /> Data Pengiriman &amp; Pemesanan
                    </h3>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      {/* Name fields */}
                      <div>
                        <div className="flex items-center gap-1 mb-1.5 text-[10px] uppercase font-bold text-on-surface-variant tracking-wider font-sans">
                          <User className="w-3 h-3" /> Nama Lengkap Anda
                        </div>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Masukkan nama pelapor pesan"
                          className="w-full bg-surface-container-low text-on-surface border border-outline-variant/30 px-3.5 py-2.5 rounded-xl font-sans text-xs focus:outline-none focus:border-secondary/45 transition-all focus:ring-1 focus:ring-secondary/20"
                        />
                      </div>

                      {/* Phone Fields */}
                      <div>
                        <div className="flex items-center gap-1 mb-1.5 text-[10px] uppercase font-bold text-on-surface-variant tracking-wider font-sans">
                          <Smartphone className="w-3 h-3" /> No. WhatsApp Aktif
                        </div>
                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          className="w-full bg-surface-container-low text-on-surface border border-outline-variant/30 px-3.5 py-2.5 rounded-xl font-sans text-xs focus:outline-none focus:border-secondary/45 transition-all focus:ring-1 focus:ring-secondary/20"
                        />
                      </div>

                      {/* Dining Options select dropdown */}
                      <div>
                        <span className="block mb-1.5 text-[10px] uppercase font-bold text-on-surface-variant tracking-wider font-sans">
                          Metode Penyajian
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Bungkus (Dibawa Pulang)",
                            "Makan di Tempat",
                          ].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setDineOption(option)}
                              className={`px-3 py-2 border rounded-xl font-sans text-[11px] font-bold transition-all text-center ${
                                dineOption === option
                                  ? "bg-secondary/15 border-secondary text-secondary"
                                  : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:text-on-surface"
                              }`}
                            >
                              {option.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Summary Pricing calculation summary */}
                      <div className="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/20 space-y-2 mt-6">
                        <div className="flex justify-between items-center text-xs font-sans text-on-surface-variant">
                          <span>Subtotal Pesanan</span>
                          <span>{formatPrice(computeSubtotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-sans text-on-surface-variant">
                          <span>Biaya Layanan &amp; Pajak</span>
                          <span className="text-green-500 font-bold">Rp 0 (GRATIS)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-display font-black text-on-surface pt-2 border-t border-outline-variant/10">
                          <span>Total Pembayaran</span>
                          <span className="text-secondary tracking-tight">{formatPrice(computeSubtotal())}</span>
                        </div>
                      </div>

                      {/* WhatsApp trigger button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-secondary hover:bg-secondary/90 text-on-secondary hover:scale-[1.01] active:scale-[0.99] font-sans font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-6"
                      >
                        <MessageCircle className="w-4 h-4 fill-on-secondary/15" /> Kirim Pesanan via WhatsApp
                      </button>

                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Footer terms notes bar inside drawer */}
            {!checkoutComplete && cartItems.length > 0 && (
              <div className="p-4 bg-surface-container border-t border-outline-variant/15 text-center text-[10px] font-sans text-on-surface-variant/70 leading-relaxed">
                *Sistem akan otomatis merangkum pesanan Anda ke dalam format WhatsApp resmi dan mengalihkannya langsung ke Admin Kedai Trowulan 65.
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
