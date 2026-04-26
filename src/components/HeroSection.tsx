"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, TrendingUp, Star, ArrowRight } from "lucide-react"
import { CONFIG } from "@/config/store"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const waLink = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waMessage)}`

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 lg:pt-48 lg:pb-32 transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                <TrendingUp className="w-4 h-4" />
                N°1 EN VENTAS · COLOMBIA 2025
              </div>
              
              <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
                Llega a cualquier enchufe con la{" "}
                <span className="text-gradient">toma giratoria extensible</span>
              </h1>
              
              <p className="mb-8 text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                El <strong className="text-foreground">{CONFIG.productName}</strong> es la solución definitiva para espacios reducidos. Se extiende de 40cm a 60cm y gira 180° para adaptarse perfectamente detrás de tus muebles.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  "Brazo extensible ajustable (40cm a 60cm)",
                  "Base giratoria de 180° para cualquier dirección",
                  "2 Salidas CA + 1 USB-C + 1 USB-A integrados",
                  "Instalación sin herramientas — no daña la pared",
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 justify-center lg:justify-start p-2 rounded-lg hover:bg-neutral-900/50 transition-colors border border-transparent hover:border-orange-500/10"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                    <span className="text-muted font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mb-10 flex-wrap">
                <div className="flex flex-col items-start">
                  <span className="text-lg text-muted line-through mb-[-4px]">{CONFIG.compareAtPriceFormatted}</span>
                  <span className="text-5xl font-black text-primary tracking-tighter">{CONFIG.productPriceFormatted}</span>
                </div>
                <div className="bg-danger/10 text-danger border border-danger/20 px-4 py-2 rounded-xl font-black text-sm animate-pulse flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  -31% HOY
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#order-form"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 text-xl font-black text-white bg-primary rounded-2xl hover:bg-primary-dark transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] active:scale-95 group border border-orange-400/20"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Pedir ahora — Pagar al Recibir
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  4.9/5 · +850 pedidos verificados en Colombia
                </span>
              </div>
            </motion.div>
          </div>

          {/* 3D Product Video */}
          <div className="relative group w-full max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/10 bg-neutral-900" style={{clipPath: 'inset(0 0 48px 0 round 1.5rem)'}}>
                <video
                  src="/videos/video3d.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
