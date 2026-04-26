"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Zap, Sun, Moon, MessageCircle, ShoppingCart } from "lucide-react"
import { CONFIG } from "@/config/store"

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const clickTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Forzar modo oscuro siempre en el nuevo diseño
    document.documentElement.classList.add('dark')
  }, [])

  const handleLogoClick = () => {
    // Redirigir siempre al inicio visualmente
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Lógica secreta
    setClickCount(prev => prev + 1)
    
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
    }
    
    clickTimeout.current = setTimeout(() => {
      setClickCount(0)
    }, 1500) // Resetear si pasa más de 1.5s entre clics

    if (clickCount + 1 >= 4) {
      setClickCount(0)
      router.push('/admin/login')
    }
  }

  const waLink = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waMessage)}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer select-none" onClick={handleLogoClick}>
          <div className="w-14 h-14 overflow-hidden rounded-xl flex items-center justify-center bg-transparent group-hover:rotate-6 transition-transform duration-300">
            <img src="/images/Logo Ecomify.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="hidden sm:block text-2xl font-black tracking-tighter uppercase italic text-foreground group-hover:text-primary transition-colors">
            {CONFIG.storeName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark mode button removed as design is now forced dark premium */}
          
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-secondary/10 uppercase tracking-widest text-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp
          </a>

          <a
            href="#order-form"
            className="flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3.5 bg-primary text-white font-black rounded-xl sm:rounded-2xl hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] uppercase tracking-widest text-[10px] sm:text-xs italic border border-orange-400/20 text-center"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>Comprar<br className="sm:hidden" /> ahora</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
