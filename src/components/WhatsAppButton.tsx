"use client"

import { MessageCircle, ArrowRight } from "lucide-react"
import { CONFIG } from "@/config/store"

export default function WhatsAppButton() {
  const waLink = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waMessage)}`

  return (
    <>
      {/* Floating Button (Desktop) */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-50 hidden md:flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(37,211,102,0.5)] hover:scale-110 hover:-translate-y-2 transition-all duration-300 active:scale-95 group overflow-hidden"
        aria-label="Chatear por WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageCircle className="w-12 h-12 fill-white relative z-10" />
        <span className="absolute right-full mr-8 bg-white dark:bg-zinc-900 text-black dark:text-white px-8 py-4 rounded-[2rem] text-[10px] font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-border uppercase tracking-[0.3em] translate-x-10 group-hover:translate-x-0">
          ¿Necesitas ayuda? Chatea aquí
        </span>
      </a>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-3xl border-t border-border p-5 pb-safe-bottom transition-colors duration-300 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.3)]">
        <div className="flex gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 h-18 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            WhatsApp
          </a>
          <a
            href="#order-form"
            className="flex-[1.8] flex items-center justify-center gap-2 h-18 bg-primary text-black font-black rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,255,136,0.4)] active:scale-95 transition-all text-xs uppercase tracking-widest italic"
          >
            Pagar al Recibir
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  )
}
