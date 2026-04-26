"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Timer, AlertTriangle } from "lucide-react"
import { CONFIG } from "@/config/store"

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 33
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 px-4 bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary/5 dark:bg-primary/5 border-2 border-primary rounded-[3rem] p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20" />
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-2 bg-primary text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <AlertTriangle className="w-4 h-4" />
              Oferta por tiempo limitado
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              ¡Esta oferta termina en:
            </h2>
            
            <div className="flex justify-center gap-4 sm:gap-8 my-4">
              {[
                { label: "Horas", value: timeLeft.hours },
                { label: "Minutos", value: timeLeft.minutes },
                { label: "Segundos", value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface border border-primary/30 flex items-center justify-center text-3xl sm:text-5xl font-black text-primary shadow-xl shadow-primary/10">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-muted uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl text-muted line-through font-medium">{CONFIG.compareAtPriceFormatted}</span>
              <span className="text-5xl sm:text-7xl font-black text-primary tracking-tighter">{CONFIG.productPriceFormatted}</span>
            </div>

            <div className="flex items-center gap-3 text-danger font-black text-sm sm:text-lg uppercase italic tracking-tight animate-bounce">
              <Flame className="w-6 h-6 fill-danger" />
              Solo quedan 7 unidades disponibles
            </div>

            <button 
              onClick={() => document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full max-w-lg py-6 bg-primary text-white text-2xl font-black rounded-[1.5rem] shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:bg-primary-dark transition-all active:scale-95 uppercase tracking-tight italic border border-orange-400/20"
            >
              🚀 Quiero el mío — Pago Contra Entrega
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
