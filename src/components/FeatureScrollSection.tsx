"use client"

import { motion } from "framer-motion"
import { Zap, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Vista Frontal Premium",
    desc: "Diseño minimalista que se integra perfectamente en cualquier pared sin ocupar espacio innecesario.",
    image: "/images/imagen-frontal.jpeg",
  },
  {
    title: "Giro de 180 Grados",
    desc: "Ajusta la dirección de tus conexiones con total libertad. El brazo giratorio llega donde otros no pueden.",
    image: "/images/180-grados.jpeg",
  },
  {
    title: "Máxima Rotación",
    desc: "Su sistema de articulación permite configuraciones infinitas para adaptarse detrás de cualquier mueble.",
    image: "/images/rotacion.jpeg",
  },
  {
    title: "Carga Inteligente",
    desc: "Equipado con puertos USB-A y USB-C de carga rápida para todos tus dispositivos modernos.",
    image: "/images/lado-usb-y-tipo-c.jpeg",
  }
]

export default function FeatureScrollSection() {
  return (
    <section className="py-32 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6 uppercase italic">
            Funciones <span className="text-primary">Top</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-medium">
            Descubre por qué el FlexiPlug Pro es la solución favorita en todo Colombia.
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex-1 text-center md:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
                  <Zap className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Característica 0{i+1}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight uppercase italic tracking-tighter">
                  {feature.title}
                </h3>
                <p className="text-muted text-xl mb-8 leading-relaxed font-medium">
                  {feature.desc}
                </p>
                <ul className="space-y-4">
                  {["Calidad Premium", "Garantía Total", "Envío Gratis"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-bold text-foreground uppercase tracking-wider text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image Content */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? 5 : -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex-1 relative group"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/30 transition-colors" />
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-surface shadow-2xl aspect-square bg-surface">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
