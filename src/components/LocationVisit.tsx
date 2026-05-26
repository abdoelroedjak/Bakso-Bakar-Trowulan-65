/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MapPin, Clock, ExternalLink, Calendar, Map as MapIcon, Compass } from "lucide-react";
import { MAP_PREVIEW_IMAGE } from "../data";

export default function LocationVisit() {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  const googleMapsUrl = "https://maps.google.com/maps?q=Jl.%20Candi%20Trowulan%20No.65,%20Mojolangu,%20Lowokwaru,%20Malang&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-card rounded-[32px] overflow-hidden border border-outline-variant/15 grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          
          {/* Map Section */}
          <div className="min-h-[350px] lg:h-auto overflow-hidden relative group">
            {showInteractiveMap ? (
              <iframe
                title="Bakso Bakar Trowulan 65 Location Map"
                src={googleMapsUrl}
                className="w-full h-full border-0 min-h-[400px] lg:min-h-[500px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <>
                <img
                  alt="Location Map Preview"
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-103 group-hover:grayscale-0"
                  src={MAP_PREVIEW_IMAGE}
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual red/warm tone mask mapping */}
                <div className="absolute inset-0 bg-primary-container/10 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                {/* Open/Interact Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <motion-wrapper className="contents">
                    <button
                      onClick={() => setShowInteractiveMap(true)}
                      className="bg-surface text-on-surface px-6 py-3.5 rounded-full flex items-center gap-2.5 font-sans font-extrabold text-[10px] tracking-widest uppercase shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 hover:text-secondary group/btn border border-outline-variant/30 cursor-pointer"
                    >
                      <MapIcon className="w-4 h-4 text-secondary animate-pulse" /> Muat Peta Interaktif
                    </button>
                    <a
                      href="https://maps.app.goo.gl/BDimwk1S7LU8aUJL8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[11px] font-sans font-bold text-secondary/80 hover:text-secondary flex items-center gap-1 hover:underline"
                    >
                      Buka Langsung di Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion-wrapper>
                </div>
              </>
            )}

            {/* Toggle state to revert to static image helper */}
            {showInteractiveMap && (
              <button
                onClick={() => setShowInteractiveMap(false)}
                className="absolute bottom-4 right-4 bg-background/90 text-on-surface hover:text-secondary px-3.5 py-2 rounded-xl text-[10px] font-sans font-bold uppercase transition-all shadow-lg border border-outline-variant/20 z-10"
              >
                Kembali ke Gambar Statis
              </button>
            )}
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-low">
            <span className="font-sans font-bold text-secondary text-xs tracking-[0.2em] uppercase mb-3 block">
              Sambangi Cita Rasa Kami
            </span>
            <h2 className="font-display text-2xl sm:text-3.5xl md:text-4xl font-black text-on-surface mb-8 leading-tight">
              Kunjungi Kedai Kami
            </h2>

            {/* Address descriptors layout */}
            <div className="space-y-8">
              {/* Address card */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-xs text-on-surface uppercase tracking-wider mb-2">
                    Alamat Lengkap
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Jl. Candi Trowulan No.65, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142
                  </p>
                  <span className="text-[10px] text-secondary font-bold block mt-2 text-glow">
                    📍 Persis di Lokasi Pintu Masuk Perumahan Candi Trowulan
                  </span>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-xs text-on-surface uppercase tracking-wider mb-2">
                    Jam Operasional Kedai
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Senin — Minggu (Buka Setiap Hari)
                  </p>
                  <p className="font-sans text-xs text-secondary font-extrabold mt-1">
                    Pukul 10.00 — 19.00 WIB
                  </p>
                  <span className="text-[10px] text-on-surface-variant/70 italic block mt-1 leading-relaxed">
                    *Kerap ludes lebih kilas di saat jam makan siang dan hari libur akhir pekan.
                  </span>
                </div>
              </div>

              {/* Travel guidelines tips */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-xs text-on-surface uppercase tracking-wider mb-2">
                    Panduan Lokasi Parkir
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Tersedia area parkir yang memadai untuk kendaraan roda dua maupun roda empat dengan penanganan juru parkir sigap di halaman depan kedai.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Directions Trigger Action */}
            <div className="mt-12 pt-6 border-t border-outline-variant/10">
              <a
                href="https://maps.app.goo.gl/BDimwk1S7LU8aUJL8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary/10 hover:bg-secondary/20 hover:scale-[1.02] active:scale-[0.98] text-secondary font-sans font-extrabold text-[10px] tracking-widest uppercase px-6 py-3 rounded-xl transition-all"
              >
                Rute Navigasi Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
