"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { CONFIG } from "@/config/store"

const videoDetails = [
  {
    title: "Extensión Flexible",
    tag: "BRAZO"
  },
  {
    title: "Giro 180° Real",
    tag: "GIRATORIO"
  },
  {
    title: "Uso Detrás de Muebles",
    tag: "PRÁCTICO"
  }
]

export default function VideoSection() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-foreground sm:text-5xl tracking-tight mb-4 uppercase italic">
            Mira la Magia en Acción
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-medium">
            Ve cómo el FlexiPlug Pro transforma cualquier espacio difícil en segundos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CONFIG.videos.map((videoUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[9/16] bg-surface border border-border/50 card-hover"
            >
              {/* GIF-STYLE VIDEO: Muted, AutoPlay, Loop, PlaysInline, NO CONTROLS */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="w-4 h-4 text-black fill-black" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{videoDetails[index].tag}</span>
                </div>
                <h3 className="text-white text-3xl font-black tracking-tight leading-none italic">{videoDetails[index].title}</h3>
                <p className="text-white/60 text-sm mt-2 font-bold uppercase tracking-widest">#FlexiPlugPro</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
